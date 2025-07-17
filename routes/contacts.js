const validation = require('../middleware/validate');
const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// Define routes for contacts
// Get all contacts
router.get('/', contactsController.getAll);

// Get contact by ID
router.get('/:id', validation.validateIdParam(), contactsController.getById);

// Create a new contact
router.post('/', validation.saveContact, contactsController.createContact);

// Update a contact by ID
router.put('/:id', validation.saveContact, contactsController.updateContact);

// Delete a contact by ID
router.delete('/:id', validation.validateIdParam(), contactsController.deleteContact);

module.exports = router;
