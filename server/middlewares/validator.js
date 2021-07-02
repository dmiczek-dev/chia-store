const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { decodeToken } = require('../helpers/auth');

function validateToken(req) {
  const token = req.cookies.JWT;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
      if (err) {
        return res.status(400).send({ message: 'Invalid token' });
      }
      return true;
    })
  } else {
    return res.status(400).send({ message: 'Unauthorized request' });
  }
}

function validateRefreshToken(req) {
  return req.cookies.refreshToken !== undefined;
}

function validateAdmin(req) {
  if (validateToken(req)) {
    const payload = decodeToken(req)
    return payload?.permission === 'ADMIN';
  } else {
    return false;
  }
}

function validateUser() {
  if (validateToken(req)) {
    const payload = decodeToken(req)
    return payload?.permission === 'USER';
  } else {
    return false;
  }
}

const validateNIP = (value, helpers) => {
  let nipWithoutDashes = value.replace(/-/g, '');
  let reg = /^[0-9]{10}$/;
  if (!reg.test(nipWithoutDashes)) {
    return helpers.error("any.invalid");
  }

  const digits = ('' + nipWithoutDashes).split('');
  const checksum = (6 * parseInt(digits[0]) + 5 * parseInt(digits[1]) + 7 * parseInt(digits[2]) + 2 * parseInt(digits[3]) + 3 *
    parseInt(digits[4]) + 4 * parseInt(digits[5]) + 5 * parseInt(digits[6]) + 6 * parseInt(digits[7]) + 7 * parseInt(digits[8])) % 11;
  if (!parseInt(digits[9]) === checksum) {
    return helpers.error("any.invalid");
  }
  return value;
}

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

exports.validateSignOut = function (req, res, next) {
  if (!validateToken(req)) {
    return res.status(400).send({ message: 'Unauthorized request' })
  };
  next();
}

exports.validateRefreshToken = function (req, res, next) {
  if (!validateRefreshToken(req)) {
    return res.status(400).send({ message: 'Unauthorized request' });
  }

  next();
}

exports.validateAdminOrders = function (req, res, next) {
  if (!validateAdmin(req)) {
    return res.status(400).send({ message: 'Unauthorized request' })
  };

  next();
}

exports.validateUserOrders = function (req, res, next) {
  if (!validateUser(req)) {
    return res.status(400).send({ message: 'Unauthorized request' })
  }

  next();
}

exports.validateCreateOrder = function (req, res, next) {

  if (!validateUser(req)) {
    return res.status(400).send({ message: 'Unauthorized request' })
  }

  const body = req.body;

  const schemaCompanyOrder = Joi.object().keys({
    plots: Joi.number().required(),
    price: Joi.number().required(),
    poolKey: Joi.string().required(),
    farmerKey: Joi.string().required(),
    orderTypeId: Joi.integer().required(),
    company: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    NIP: Joi.custom(validateNIP).required(),
  })

  const schemaCitizenOrder = Joi.object().keys({
    plots: Joi.number().required(),
    price: Joi.number().required(),
    poolKey: Joi.string().required(),
    farmerKey: Joi.string().required(),
    orderTypeId: Joi.integer().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
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
  if (!validateAdmin(req)) {
    return res.status(400).send({ message: 'Unauthorized request' })
  }

  const body = req.body

  const schema = Joi.object().keys({
    orderId: Joi.integer().required(),
    orderStatusId: Joi.integer().required(),
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


