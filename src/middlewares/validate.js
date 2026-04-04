import Joi from 'joi';

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

   if (error) {
    return res.status(400).json({
      status: 'failed', // ✅ ini yang diminta test
      message: error.message,
    });
  }

  req.validated = value;
  next();
};

export default validate;
