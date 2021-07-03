const Joi = require('joi');
const { validateNip } = require('../helpers/validate');

exports.validateSignIn = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  })

  try {
    const validation = schema.validate(body)
    if (validation.error) {
      return res.status(400).send({
        status: 'error',
        message: 'Invalid request data'
      })
    }
  } catch (err) {
    throw err;
  }

  next();
}

exports.validateSignUp = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    username: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(5).required(),
  })

  try {
    const validation = schema.validate(body)
    if (validation.error) {
      return res.status(400).send({
        status: 'error',
        message: 'Invalid request data'
      })
    }
  } catch (err) {
    throw err;
  }

  next();
}

exports.validateCreateAccount = function (req, res, next) {
  const body = req.body;

  const schema = Joi.object().keys({
    username: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(5).required(),
    permissionId: Joi.number().integer().required()
  })

  try {
    const validation = schema.validate(body)
    if (validation.error) {
      return res.status(400).send({
        status: 'error',
        message: 'Invalid request data'
      })
    }
  } catch (err) {
    throw err;
  }

  next();
}

exports.validateAdmin = function (req, res, next) {
  if (req.payload?.permission !== 'ADMIN') {
    return res.sendStatus(401)
  }
  next();
}

exports.validateUser = function (req, res, next) {
  if (req.payload?.permission !== 'USER') {
    return res.sendStatus(401)
  }
  next();
}

exports.validateCreateOrder = function (req, res, next) {
  const body = req.body;

  const schemaCompanyOrder = Joi.object().keys({
    plots: Joi.number().required(),
    price: Joi.number().required(),
    poolKey: Joi.string().required(),
    farmerKey: Joi.string().required(),
    orderTypeId: Joi.number().integer().required(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    NIP: Joi.custom(validateNip).required(),
    company: Joi.string().required(),
    phone: Joi.string(),
    isCompany: Joi.boolean()
  })

  const schemaCitizenOrder = Joi.object().keys({
    plots: Joi.number().required(),
    price: Joi.number().required(),
    poolKey: Joi.string().required(),
    farmerKey: Joi.string().required(),
    orderTypeId: Joi.number().integer().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    NIP: Joi.custom(validateNip),
    phone: Joi.string(),
    isCompany: Joi.boolean()
  })

  try {
    let validation;
    if (body.isCompany) {
      validation = schemaCompanyOrder.validate(body)
    } else {
      validation = schemaCitizenOrder.validate(body)
    }
    if (validation.error) {
      return res.status(400).send({
        status: 'error',
        message: 'Invalid request data'
      })
    }
  } catch (err) {
    throw err;
  }

  next();
}

exports.validateEditOrder = function (req, res, next) {
  const body = req.body

  const schema = Joi.object().keys({
    orderId: Joi.number().integer().required(),
    orderStatusId: Joi.number().integer().required(),
  })

  try {
    const validation = schema.validate(body)
    if (validation.error) {
      return res.status(400).send({
        status: 'error',
        message: 'Invalid request data'
      })
    }
  } catch (err) {
    throw err;
  }

  next();
}
