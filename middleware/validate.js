const validator = require('../helpers/validate');
const { param } = require('express-validator');

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    favoriteColor: 'required|string',
    birthday: 'date',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

const validateIdParam = () => [param('_id').isMongoId().withMessage('Invalid MongoDB ObjectId')];

module.exports = {
  saveContact,
  validateIdParam,
};
