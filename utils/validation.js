const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    address: Joi.string()
        .min(5)
        .max(255)  // Adjusted max length to accommodate longer addresses
        .required(),

    latitude: Joi.number()
        .required()
        .precision(6),  // Optional: restrict precision if needed

    longitude: Joi.number()
        .required()
        .precision(6)  // Optional: restrict precision if needed
});

module.exports = schema;
