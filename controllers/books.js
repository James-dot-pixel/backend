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
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;
    console.log(bookObject);
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
