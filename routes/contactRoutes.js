const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all contacts with formatted birthday
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();

    // Format all birthdays before sending response
    const formattedContacts = contacts.map(contact => {
      const obj = contact.toObject();
      if (obj.birthday) {
        obj.birthday = obj.birthday.toISOString().split('T')[0];
      }
      return obj;
    });

    res.json(formattedContacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});



// GET a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: 'Invalid contact ID' });
  }
});
module.exports = router;
