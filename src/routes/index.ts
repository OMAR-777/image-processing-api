import express from 'express';
import catchAsync from '../utils/catchAsync';
import { getImage } from '../controllers/index';

import { validateImageQuery } from '../middleware';

const routes = express.Router();

routes.get('/', validateImageQuery, catchAsync(getImage));

export default routes;
