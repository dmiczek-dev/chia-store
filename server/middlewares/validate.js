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
    productId: Joi.number().integer().required(),
    plots: Joi.number().required(),
    poolKey: Joi.string().required(),
    farmerKey: Joi.string().required(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    NIP: Joi.custom(validateNip).required(),
    company: Joi.string().required(),
    phone: Joi.string(),
    buyerType: Joi.string()
  })

  const schemaIndividualOrder = Joi.object().keys({
    productId: Joi.number().integer().required(),
    plots: Joi.number().required(),
    poolKey: Joi.string().required(),
    farmerKey: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    NIP: Joi.custom(validateNip),
    phone: Joi.string(),
    buyerType: Joi.string()
  })

  try {
    let validation;
    if (body.buyerType === "company") {
      validation = schemaCompanyOrder.validate(body)
    } else {
      validation = schemaIndividualOrder.validate(body)
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

exports.validateCreateProduct = function (req, res, next) {
  const body = req.body

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
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
    throw err
  }

  next();
}

exports.validateEditProduct = function (req, res, next) {
  const body = req.body

  const schema = Joi.object().keys({
    productId: Joi.number().integer().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
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
    throw err
  }

  next();
}

exports.validateDeleteProduct = function (req, res, next) {
  const body = req.body

  const schema = Joi.object().keys({
    productId: Joi.number().integer().required(),
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
    throw err
  }

  next();
}

