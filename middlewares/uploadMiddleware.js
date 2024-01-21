const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationFolder;

    if (file.mimetype.startsWith("image/")) {
      destinationFolder = "uploads/images";
    } else if (file.mimetype.startsWith("application/pdf")) {
      destinationFolder = "uploads/documents";
    } else if (file.mimetype.startsWith("video/")) {
      destinationFolder = "uploads/videos";
    } else {
      destinationFolder = "uploads/other";
    }

    cb(null, destinationFolder);
  },

  filename: (req, file, cb) => {
    const randomSuffix = Math.floor(Math.random() * 1000);
    const sanitizedOriginalName = file.originalname.replace(/\s/g, "");
    const filename = `${Date.now()}_${randomSuffix}_${sanitizedOriginalName}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
