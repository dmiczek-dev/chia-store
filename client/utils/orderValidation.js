import Joi from 'joi';

export const validateNip = (value, helpers) => {
    let nipWithoutDashes = value.replace(/-/g, '');
    let reg = /^[0-9]{10}$/;
    if (!reg.test(nipWithoutDashes)) {
        return helpers.error('any.invalid');
    }

    const digits = ('' + nipWithoutDashes).split('');
    const checksum = (6 * parseInt(digits[0]) + 5 * parseInt(digits[1]) + 7 * parseInt(digits[2]) + 2 * parseInt(digits[3]) + 3 *
        parseInt(digits[4]) + 4 * parseInt(digits[5]) + 5 * parseInt(digits[6]) + 6 * parseInt(digits[7]) + 7 * parseInt(digits[8])) % 11;
    if (!parseInt(digits[9]) === checksum) {
        return helpers.error('any.invalid');
    }
    return value;
};

export const validationSchema = Joi.object().keys({
    productId: Joi.number().integer().required(),
    plots: Joi.number().required(),
    poolKey: Joi.string().required(),
    farmerKey: Joi.string().required(),
    buyerType: Joi.string().required(),
    firstname: Joi.string().when('buyerType', { is: 'individual', then: Joi.required() }),
    lastname: Joi.string().when('buyerType', { is: 'individual', then: Joi.required() }),
    city: Joi.string().required(),
    street: Joi.string().required(),
    phone: Joi.string(),
    NIP: Joi.custom(validateNip).when('buyerType', { is: 'company', then: Joi.required() }),
    company: Joi.string().when('buyerType', { is: 'company', then: Joi.required() }),
});
