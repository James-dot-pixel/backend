const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const booksCtrl = require("../controllers/books");

// Route pour récupérer tous les livres
router.get("/", booksCtrl.getBooks);

// Route pour récupérer un seul livre
router.get("/:id", booksCtrl.getOneBook);

// Route pour poster un livre
router.post("/", auth, multer, booksCtrl.postOneBook);

// Route pour mettre à jour un livre
router.put("/:id", auth, multer, booksCtrl.updateBook);

module.exports = router;
