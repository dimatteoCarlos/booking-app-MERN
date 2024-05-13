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
} from '../controllers/hotel.controller.js';

import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

/*CRUD----*/

//CREATE
//'/:id?limit=5'
router.post('/', verifyAdmin, createHotel);

//READ GET by id
router.get('/find/:id', getHotel);

//READ GET by query
router.get('/query/countByCity', countHotelsByCity);
router.get('/query/countByType', countHotelsByType);

router.get('/count/countByType', countByType);

//READ ALL
router.get('/', getHotels);

//READ BY QUERY
router.get('/query', getHotelsByQuery);

//UPDATE
router.put('/:id', verifyAdmin, updateHotel);

//DELETE
router.delete('/:id', verifyAdmin, deleteHotel);

export default router;
