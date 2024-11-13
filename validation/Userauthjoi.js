import joi from 'joi';

const UserAuthJoi = joi.object({
    username: joi.string().min(3).max(30).required()
    .messages({
        'string.empty': 'Username is required',
        'string.min': 'Username should have at least 3 characters',
        'any.required': 'Username is a required field'
    }),

    email: joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org"] }
    }).lowercase().required().trim()
    .messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is a required field'
    }),

    password: joi.string().min(8).required()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .messages({
        'string.pattern.base': 'Password must contain only alphanumeric characters',
        'string.min': 'Password should have at least 8 characters',
        'any.required': 'Password is a required field'
    })
});

export default UserAuthJoi;
