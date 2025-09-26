const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/authenticate'); 


// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// GET a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: 'Invalid contact ID' });
  }
});

// POST: Create new contact
router.post('/', isAuthenticated, async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    //  Check for existing contact with same email
    const existing = await Contact.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'A contact with this email already exists' });
    }

    const contact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    const savedContact = await contact.save();

    res.status(201).json({ id: savedContact._id });
  } catch (err) {
    console.error('❌ Error saving new contact:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// PUT: Replace entire contact by ID
router.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required for update' });
  }

  try {
    // ✅ Optional: check if email is used by another contact
    const existing = await Contact.findOne({ email, _id: { $ne: id } });
    if (existing) {
      return res.status(409).json({ message: 'Another contact with this email already exists' });
    }

    const result = await Contact.replaceOne(
      { _id: id },
      { firstName, lastName, email, favoriteColor, birthday }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Contact not found or no changes made' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(`❌ Error updating contact ${id}:`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// DELETE contact by ID
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  try {
    const result = await Contact.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(`❌ Error deleting contact ${id}:`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
