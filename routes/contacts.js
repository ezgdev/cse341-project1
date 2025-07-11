const express = require('express');
const router = express.Router();

const conctactsController = require('../controllers/contacts');

// Define routes for contacts
// Get all contacts
router.get('/', conctactsController.getAll);

// Get contact by ID
router.get('/:id', conctactsController.getById);

// Create a new contact
router.post('/', conctactsController.createContact);

// Update a contact by ID
router.put('/:id', conctactsController.updateContact);

// Delete a contact by ID
router.delete('/:id', conctactsController.deleteContact);

module.exports = router;
