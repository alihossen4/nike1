import e from 'express';
import { HealthCheck } from '../controllers/healthCheck.controller.js';

const router = e.Router();

router.get("/", HealthCheck)

export default router;