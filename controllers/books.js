const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.postOneBook = async (req, res) => {
  try {
    delete req.body._id;
    const book = new Book({
      ...req.body,
    });
    await book.save();
    res.status(201).json({ message: "Objet enregistré !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getOneBook = async (req, res) => {
  try {
    const thing = await Thing.findOne({ _id: req.params.id });
    if (thing) {
      res.status(200).json(thing);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
