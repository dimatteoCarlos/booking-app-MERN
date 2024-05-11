//routeAuth.js
import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

//http://localhost:8800/auth on browser

router.post('/register', register);
router.get("/login", login);

export default router;
