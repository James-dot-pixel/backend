const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Configurer le stockage pour multer
const storage = multer.memoryStorage();

// Exporter le middleware pour gérer un seul fichier image
module.exports.upload = multer({ storage: storage }).single("image");

// Optimiser l'image en WebP et la sauvegarder
module.exports.optimizeImage = async (req, res, next) => {
  if (!req.file) {
    // Continuez sans optimiser l'image si aucun fichier n'est téléchargé
    return next();
  }

  // Générer un nom de fichier unique
  const uniqueFilename = `${Date.now()}-${
    req.file.originalname.split(".")[0]
  }.webp`;
  const filePath = path.join(__dirname, "../images", uniqueFilename); // Modifier le chemin ici

  try {
    // Créer le dossier "images" s'il n'existe pas
    if (!fs.existsSync(path.join(__dirname, "../images"))) {
      fs.mkdirSync(path.join(__dirname, "../images"));
    }

    await sharp(req.file.buffer)
      .toFormat("webp", { quality: 80 })
      .toFile(filePath);

    req.file.filename = uniqueFilename;
    req.file.path = filePath;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to compress image" });
  }
};
