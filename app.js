const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const booksRoutes = require("./routes/books");

const username = encodeURIComponent(process.env.username);
const password = encodeURIComponent(process.env.password);
const cluster = process.env.cluster;

// Connexion à MongoDB
const mongoURI = `mongodb+srv://${username}:${password}@${cluster}.6g0cl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

// Importer les routes pour les livres
app.use("/api/books", booksRoutes);

module.exports = app;
