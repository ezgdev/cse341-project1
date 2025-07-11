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

// Create a new contact
const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const result = await mongodb.getDb().db().collection('Contacts').insertOne(contact);
  if (result.acknowledged) {
    res.status(201).send({ message: 'Contact created successfully', id: result.insertedId });
  } else {
    res.status(500).json({ message: 'Failed to create contact' });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('Contacts')
    .replaceOne({ _id: contactId }, contact);
  if (result.modifiedCount > 0) {
    res.status(200).send({ message: 'Contact updated successfully' });
  } else {
    res.status(404).json({ message: 'Contact not found or no changes made' });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('Contacts').deleteOne({ _id: contactId });
  if (result.deletedCount > 0) {
    res.status(200).send({ message: 'Contact delete successfully' });
  } else {
    res.status(404).json({ message: 'Contact not found or no changes made' });
  }
};

// Export the controller functions to be used in routes
module.exports = {
  getAll,
  getById,
  createContact,
  updateContact,
  deleteContact,
};
