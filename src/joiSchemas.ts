import Joi from 'joi';

export const imageQuerySchema = Joi.object({
  filename: Joi.string().required(),
  width: Joi.number().min(0).max(5000),
  height: Joi.number().min(0).max(5000),
}).and('width', 'height');
