const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book");

// Connexion à MongoDB
const mongoURI =
  "mongodb+srv://jamdefosse:2PEPE9237THJwNNP@cluster0.6g0cl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connexion à MongoDB réussie");
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB :", err);
  });

// Initialisation de l'application Express
const app = express();

// Permettre l'accès au body de la requête
app.use(express.json());

// Configurer les en-têtes CORS de la réponse
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

// Route pour poster un livre
app.post("/api/books", async (req, res) => {
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
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour récupérer un livre
app.get("/api/books/:id", async (req, res) => {
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

module.exports = app;
