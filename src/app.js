import cors from 'cors';
import express from 'express';
import { WHITELIST } from './constants.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler.middleware.js';
import { HealthCheck } from './controllers/healthCheck.controller.js';
import healthCheckRoute from './routes/healthCheck.route.js';
import userRoute from './routes/user.route.js';
import { asyncHandler } from './utils/asyncHandler.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  cors({
    origin: WHITELIST,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(healthCheckRoute);
app.use("/api/v1", userRoute);
app.use(errorHandler);

export { app };
