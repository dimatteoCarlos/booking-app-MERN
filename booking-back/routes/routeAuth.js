//routeAuth.js
import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

//http://localhost:8800/api/auth/login 
//http://localhost:8800/api/auth/register 

router.post('/register', register);
router.post("/login", login);

export default router;
