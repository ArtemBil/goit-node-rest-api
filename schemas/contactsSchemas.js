import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/, {
        name: 'UA phone number'
    }).required(),
})

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/, {
        name: 'UA phone number'
    }),
})
    .or('name', 'email', 'phone')
    .messages({
        'object.missing': 'Body must have at least one field'
    });

export const updateStatusContactSchema = Joi.object({
    favorite: Joi.boolean().required(),
}).messages({
    'object.missing': 'Body must have favorite field with boolean value'
});