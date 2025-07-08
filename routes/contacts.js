const express = require('express');
const router = express.Router();

const conctactsController = require('../controllers/contacts');

// Define routes for contacts
// Get all contacts
router.get('/', conctactsController.getAll);

// Get contact by ID
router.get('/:id', conctactsController.getById);

module.exports = router;
