//routeRooms.js
import express from 'express';

import {
  createRoom,
  getRoom,
  getRooms,
  updateRoom,
  deleteRoom,

  // updateRoomAvailability,
} from '../controllers/room.controller.js';

import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

/*CRUD----*/

//CREATE

router.post('/:hotelid', verifyAdmin, createRoom);

//READ GET by id
router.get('/:id', getRoom);

//READ ALL
router.get('/', getRooms);

//UPDATE

// router.put("/availability/:id", updateRoomAvailability);

router.put('/:id', verifyAdmin, updateRoom);

//DELETE
// /:id/:hotelid
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);

export default router;
