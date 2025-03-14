const express = require("express");
const router = express.Router();

const booksCtrl = require("../controllers/books");

// Route pour récupérer tous les livres
router.get("/", booksCtrl.getBooks);

// Route pour poster un livre
router.post("/", booksCtrl.postOneBook);

// Route pour récupérer un seul livre
router.get("/:id", booksCtrl.getOneBook);

module.exports = router;
