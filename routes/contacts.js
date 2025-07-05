const express = require('express');
const router = express.Router();

const conctactsController = require('../controllers/contacts');

router.get('/', conctactsController.getAll);
router.get('/:id', conctactsController.getById);

module.exports = router;