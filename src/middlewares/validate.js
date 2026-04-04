import Joi from 'joi';

// ✅ validate body
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      status: 'fail', // ⚠️ ganti ke "fail"
      message: error.message,
    });
  }

  req.validated = value;
  next();
};

// ✅ validate query (HARUS di-export)
export const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }

  req.validated = value;
  next();
};

export default validate;
