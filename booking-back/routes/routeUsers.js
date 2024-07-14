//routeUsers.js
import express from 'express';
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';

import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//READ ONE
router.get(
  '/:id',
  // verifyUser,
  getUser
);
//UPDATE
router.put(
  '/:id',
  // // verifyUser,
  updateUser
);
//DELETE
router.delete(
  '/:id',

   // verifyUser,

  deleteUser
);
//READ ALL
router.get(
  '/',

  //  verifyAdmin,
  //
  getUsers
);

export default router;

//-------------
