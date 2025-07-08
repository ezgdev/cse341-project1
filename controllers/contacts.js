const mongodb = require('../data/database');

// Import ObjectId from mongodb to handle MongoDB Object IDs
const ObjectId = require('mongodb').ObjectId;

// Controller functions for handling contacts
// Get all contacts
const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('Contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(contacts);
  });
};

// Get contact by ID
// Uses ObjectId to convert the string ID from the request parameters into a MongoDB ObjectId
const getById = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('Contacts').find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

module.exports = {
  getAll,
  getById,
};
