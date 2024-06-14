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

router.post('/:hotelId',
  //  verifyAdmin, //remember at the end
  createRoom);

//READ GET by id
router.get('/:roomId', getRoom);

//READ ALL
router.get('/', getRooms);

//UPDATE

// router.put("/availability/:id", updateRoomAvailability);

router.put('/:roomId', verifyAdmin, updateRoom);

//DELETE
// /:id/:hotelid
router.delete('/:roomId/:hotelId', verifyAdmin, deleteRoom);

export default router;
