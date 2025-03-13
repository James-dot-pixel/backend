const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// Importer le contrôleur des utilisateurs
const userCtrl = require("../controllers/users");

//Définir une route POST pour l'inscription d'un utilisateur
router.post("/signup", userCtrl.signup);

//Définir une route POST pour la connexion d'un utilisateur
router.post("/login", userCtrl.login);

module.exports = router;
