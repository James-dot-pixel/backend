const multer = require("multer");

// Mapper les types MIME des images aux extensions de fichiers
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Configurer le stockage pour multer
const storage = multer.diskStorage({
  // Indiquer le dossier de destination des fichiers uploadés
  destination: (req, file, callback) => {
    callback(null, "images");
  },

  // Indiquer le nom du fichier stocké sur le disque
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// Exporter du middleware pour gérer un seul fichier image
module.exports = multer({ storage: storage }).single("image");
