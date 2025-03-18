const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { upload, optimizeImage } = require("../middleware/multer-config");
const booksCtrl = require("../controllers/books");

// Route pour récupérer tous les livres
router.get("/", booksCtrl.getBooks);

// Route pour récupérer un seul livre
router.get("/:id", booksCtrl.getOneBook);

// Route pour poster un livre
router.post("/", auth, upload, optimizeImage, booksCtrl.postOneBook);

// Route pour mettre à jour un livre
router.put("/:id", auth, upload, optimizeImage, booksCtrl.updateOneBook);

// Route pour supprimer un livre
router.delete("/:id", auth, booksCtrl.deleteOneBook);

module.exports = router;
