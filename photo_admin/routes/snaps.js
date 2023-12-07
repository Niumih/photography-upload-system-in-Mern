const express = require('express');
const router = express.Router();
const Snaps = require('../models/snaps');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./client/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Get all snaps
router.get("/", (req, res) => {
  Snaps.find()
    .then(snaps => res.json(snaps))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Add a new snap
router.post('/add', upload.single("snapImage"), (req, res) => {
  const newSnap = new Snaps({
    title: req.body.title,
    description: req.body.description,
    photographer: req.body.photographer,
    snapImage: req.file.originalname,
    date: req.body.date
  
  });

  newSnap.save()
    .then(() => res.json("New snap uploaded successfully!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Find snap by id
router.get('/:id', (req, res) => {
  Snaps.findById(req.params.id)
    .then(snap => {
      if (!snap) {
        return res.status(404).json('Snap not found');
      }
      res.json(snap);
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Find snap by id and update
router.put('/update/:id', upload.single("snapImage"), (req, res) => {
  Snaps.findById(req.params.id)
    .then(snap => {
      snap.title = req.body.title;
      snap.description = req.body.description;
      snap.photographer = req.body.photographer;
      snap.snapImage = req.file.originalname;
      snap.date = req.body.date; 
      
      snap.save()
        .then(() => res.json("The snap is updated successfully!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Find snap by id and delete
router.delete('/:id', (req, res) => {
  Snaps.findByIdAndDelete(req.params.id)
    .then(() => res.json("Snap is deleted!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
