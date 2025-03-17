const Book = require("../models/Book");

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
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;
    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    await book.save();
    res.status(201).json({ message: "Objet enregistré !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Mettre à jour un livre
exports.updateBook = async (req, res) => {
  try {
    const bookObject = req.file
      ? {
          ...JSON.parse(req.body.book),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    delete bookObject._id;
    delete bookObject.userId;

    const book = await Book.findById(req.params.id);

    if (book.userId !== req.auth.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { ...bookObject, _id: req.params.id },
      { new: true }
    );

    res.status(200).json({ message: "Livre mis à jour!", book: updatedBook });
  } catch (error) {
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
    res.status(400).json({ error });
  }
};
