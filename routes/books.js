const express = require("express");
const router = express.Router();

const booksCtrl = require("../controllers/books");

// Route pour poster un livre
router.post("/", async (req, res) => {
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
});

// Route pour récupérer tous les livres
router.get("/", booksCtrl.getBooks);

// Route pour récupérer un seul livre
router.get("/:id", async (req, res) => {
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
});

module.exports = router;
