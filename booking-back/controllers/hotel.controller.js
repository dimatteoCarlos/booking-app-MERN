//hotel.controller.js

import HotelModel from '../models/hotelModel/HotelModel.js';
import RoomModel from '../models/roomModel/RoomModel.js';

//CREATE
export const createHotel = async (req, res, next) => {
  const data = req.body;

  const newHotelDataModel = new HotelModel(data);

  try {
    const hotelCreated = await newHotelDataModel.save();
    res.status(200).json(hotelCreated);
  } catch (error) {
    next(error);
  }
};

//-------------------------------
//READ GET hotel by id
//endpoint: http://localhost:8800/api/hotels/find/:hotelId

export const getHotel = async (req, res, next) => {
  const id = req.params.hotelId;
  // console.log('🚀 ~ getHotel ~ id:', id);

  try {
    const hotelIdInfo = await HotelModel.findById(id);

    console.log(hotelIdInfo);
    res.status(200).json(hotelIdInfo);

    //string: res.status(200).json(`Hotel Info: ${hotelIdInfo} was obtained`);
  } catch (error) {
    next(error);
  }
};

//-------------------------------
//COUNT hotels BY CITY query
//define the query by City: /countByCity?cities=berlin,madrid,london

export const countHotelsByCity = async (req, res, next) => {
  //query.../countnByCity?cities=berlin, madrid,london
  const searchedCities = req.query.cities.split(',');

  // console.log(req.query.cities, 'searchedCities', searchedCities);

  try {
    const list = await Promise.all(
      searchedCities.map(async (searchedCity) => {
        const countObj = {
          city: searchedCity,
          count: await HotelModel.countDocuments({
            city: { $regex: new RegExp(searchedCity, 'i') },
          }),
        };
        return countObj;
      })
    );

    // console.log(list);

    // groupHotelsByCity(req, res, next);

    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Dev use this to check for the properties in the database. Delete it in production.
//challenge: find out how to do this groupping in mongodb

export async function groupHotelsByCity(req, res, next) {
  const result = { list: [] };
  let key = 'city';

  try {
    const hotels = await HotelModel.find();

    for (let index in hotels) {
      const hotel = hotels[index];

      if (result.list.indexOf(hotel[key]) === -1) {
        result.list.push(hotel[key]);
        result[hotel[key]] = {};
        result[hotel[key]]['count'] = 0;
      }
      // console.log(hotel[key], hotel[key].toLowerCase());

      result[hotel[key].toLowerCase()]['count'] += 1;
    }
    console.log('result', result);

    // res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//get by key info
//Dev Idem...
export const groupHotelsByKey = async (req, res, next, keyGroup = 'city') => {
  const result = { list: [] };
  let key = keyGroup;
  console.log('🚀 ~ groupHotelsByKey ~ key:', key);

  try {
    const qtyDoc = await HotelModel.countDocuments();

    const hotels = await HotelModel.find().limit(qtyDoc > 500 ? 500 : qtyDoc);
    console.log('total number of documents:', qtyDoc);

    for (let index in hotels) {
      const hotel = hotels[index];

      if (result.list.indexOf(hotel[key]) === -1) {
        result.list.push(hotel[key]);
        result[hotel[key]] = {};
        result[hotel[key]]['count'] = 0;
      }
      // console.log(hotel[key], hotel[key].toLowerCase());

      result[hotel[key]]['count'] += 1;
    }
    console.log('result', result);
    //use this is you want to see the results on the browser or as a response of a request
    // res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//----------------------------
//COUNT hotels BY TYPE query
//query.../countnByType?types=hotel, apartment,room
//Use this to count specific given types
//Use it as a dev. Delete it in production
//Dev Idem...
export const countHotelsByType = async (req, res, next) => {
  const searchedTypes = req.query.types.split(',');
  console.log(searchedTypes);
  const keyGroup = 'type';

  try {
    const list = await Promise.all(
      searchedTypes.map(async (searchedType) => {
        const counterObj = {
          type: searchedType,
          count: await HotelModel.countDocuments({
            type: { $regex: new RegExp(searchedType, 'i') },
          }),
        };
        return counterObj;
      })
    );

    console.log(list);

    //Use this to check all the different types in the database, this helps to check the keys used as type in the db data

    groupHotelsByKey(req, res, next, keyGroup);

    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//-------------------------
//COUNT PROPERTIES  BY TYPE
//Use this to count the properties by specific types already set

export const countByType = async (req, res, next) => {
  const givenTypes = [
    'hotel',
    'resort',
    'villa',
    'cabin',
    'apartment',
    'room',
    'village',
  ];
  console.log(req.params);
  try {
    const list = await Promise.all(
      givenTypes.map(async (givenType) => {
        const countObj = {
          type: givenType,
          count: await HotelModel.countDocuments({
            type: { $regex: new RegExp(givenType, 'i') },
          }),
        };
        return countObj;
      })
    );
    console.log(list);

    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//-------------------------------
//READ ALL. GET ALL ACCOMODATIONS
export const getHotels = async (req, res, next) => {
  try {
    const data = await HotelModel.find();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    next(error);
  }
};
//-------------------
//READ BY QUERY. GET ALL ACCOMODATIONS BY QUERY
export const getHotelsByQuery = async (req, res, next) => {
  //endpoint : http://localhost:8800/api/hotels/getHotelsByQuery/?city=london&min=10&max=800&minRate=2&limit=1000

  console.log(req.query);

  const { min, max, limit, minRate, ...restOfQuery } = req.query;

  //validations
  //check min and max
  const minPrice = min > max ? max : min;
  const maxPrice = min > max ? min : max;

  try {
    const data = await HotelModel.find({
      ...restOfQuery,
      // city:{cityTofind}
      economicPrice: { $gte: minPrice, $lte: maxPrice },
      rate: { $gte: minRate },
      // economicPrice: { $gte: min | 2, $lte: max | 800 },
    }).limit(req.query.limit);

    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    next(error);
  }
};
//----------------------
//UPDATE hotel
export async function updateHotel(req, res, next) {
  const id = req.params.hotelId;
  const data = req.body;
  try {
    const hotelUpdated = await HotelModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    console.log(hotelUpdated);
    res.status(200).json(hotelUpdated);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//DELETE

export const deleteHotel = async (req, res, next) => {
  const id = req.params.hotelId;

  try {
    const hotelDeleted = await HotelModel.findByIdAndDelete(id);

    console.log(hotelDeleted);
    res.status(200).json(`${hotelDeleted.name} has been deleted`);
  } catch (err) {
    console.log(err, 'at deleting', id, 'hotel');
    next(err);
  }
};

//************** */
// '/room/:hotelId', getHotelRooms

//READ GET A Hotel rooms Info by hotelId from Hotel collection and using roomId to get room info from Rooms Collections.
//data structure needed from Hotel collection: rooms[string, ...]

//endpoint: http://localhost:8800/api/hotels/room/:hotelId

export const getHotelRooms = async (req, res, next) => {
  const { hotelId } = req.params;

  // console.log({ hotelId });

  try {
    const hotelDataFromHotelId = await HotelModel.findById(
      { _id: hotelId }
      // ,      { rooms: 1 }
    );

    // console.log({ hotelDataFromHotelId });

    //this Ids array, links Hoteldb to RoomsDb through Hotel room Numbers
    const hotelRoomIds = hotelDataFromHotelId.rooms;
    // console.log('🚀 ~ getHotelRooms ~ hotelRoomIds:', hotelRoomIds);

    const hotelRoomsInfo = await Promise.all(
      hotelRoomIds.map(async (hotelRoomId) => {
        // console.log({ hotelRoomId });

        try {
          const hotelRoomInfo = await RoomModel.findById(hotelRoomId);

          // console.log({ hotelRoomInfo });

          return {
            ...hotelRoomInfo._doc,
            hotelRoomInfo,
          };

          return hotelRoomInfo;
        } catch (error) {
          console.log(error.message);
        }
      })
    );

    res.status(200).json(hotelRoomsInfo);
  } catch (err) {
    next(err);
  }
};
