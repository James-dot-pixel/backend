const Book = require("../models/Book");
const fs = require("fs");

// Récupérer tous les livres
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Poster un livre
exports.postOneBook = async (req, res) => {
  try {
    const bookObject = req.file ? JSON.parse(req.body.book) : req.body;
    delete bookObject._id;
    delete bookObject.userId;
    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : null,
    });
    await book.save();
    res.status(201).json({ message: "Objet enregistré !" });
  } catch (error) {
    console.error("Error posting book:", error);
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un livre
exports.updateOneBook = async (req, res) => {
  try {
    let bookObject;

    if (req.file) {
      bookObject = JSON.parse(req.body.book);
      bookObject.imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    } else {
      bookObject = req.body;
    }

    delete bookObject._id;
    delete bookObject.userId;

    const book = await Book.findOne({ _id: req.params.id });

    if (book.userId !== req.auth.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.id },
      { ...bookObject, _id: req.params.id },
      { new: true }
    );

    res.status(200).json({ message: "Livre mis à jour!", book: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(400).json({ error: error.message });
  }
};

// Récupérer un seul livre
exports.getOneBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error getting book:", error);
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un livre
exports.deleteOneBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });

    if (book.userId !== req.auth.userId) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const filename = book.imageUrl.split("/images/")[1];
    await fs.promises.unlink(`images/${filename}`);
    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Livre supprimé !" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: error.message });
  }
};
