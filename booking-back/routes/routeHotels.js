//routeHotels.js
import express from 'express';

import {
  createHotel,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
  countHotelsByCity,
  countHotelsByType,
  countByType,
  getHotelsByQuery,
  getHotelRooms,
} from '../controllers/hotel.controller.js';

import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

/*HOTEL CRUD----*/

//CREATE
//'/:id?limit=5'
router.post('/', verifyAdmin, createHotel);

//READ GET by id
//http://localhost:8800/api/hotels/find/663f7364420a784bf6c15b76
router.get('/find/:hotelId', getHotel);

//READ GET by query to count by city, by type
router.get('/query/countByCity', countHotelsByCity);

router.get('/count/countByType', countByType);

//Use as Dev
router.get('/query/countByType', countHotelsByType);

//READ ALL
router.get('/', getHotels);

//READ BY QUERY
router.get('/getHotelsByQuery', getHotelsByQuery);

//UPDATE
router.put('/:hotelId', verifyAdmin, updateHotel);

//DELETE
router.delete('/:hotelId', verifyAdmin, deleteHotel);

/*----GET ROOMs FROM A SPECIFIC HOTEL---*/
router.get('/room/:hotelId', getHotelRooms)

export default router;
