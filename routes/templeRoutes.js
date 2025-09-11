const express = require('express');
const router = express.Router();
const Temple = require('../models/templeModel');  // <-- Capital T here!

// GET all temples
router.get('/', async (req, res) => {
  try {
    const temples = await Temple.find();   // Capital T here too
    res.json(temples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET temple by custom temple_id
router.get('/byTempleId/:templeId', async (req, res) => {
  try {
    const templeId = parseInt(req.params.templeId, 10);
    if (isNaN(templeId)) {
      return res.status(400).json({ message: 'templeId must be a number' });
    }
    const temple = await Temple.findOne({ temple_id: templeId });
    if (!temple) return res.status(404).json({ message: 'Temple not found' });
    res.json(temple);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET temple by MongoDB _id
router.get('/:id', async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: 'Temple not found' });
    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
