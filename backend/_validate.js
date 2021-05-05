const Joi = require('joi');

const validateOrder = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    pickup: Joi.string().min(5).required(),
    dropoff: Joi.string().min(5).required(),
    vehicle: Joi.string().min(3),
    datedue: Joi.string().optional().default('')
  });
  
  return schema.validate(body);
}


module.exports.validateOrder = validateOrder;