//hotel.controller.js

import HotelModel from '../models/hotelModel/HotelModel.js';

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
//READ GET by id
export const getHotel = async (req, res, next) => {
  const id = req.params.id;

  try {
    const hotelIdInfo = await HotelModel.findById(id);

    res.status(200).json(`Hotel Info: ${hotelIdInfo} was obtained`);
    console.log(hotelIdInfo);
  } catch (error) {
    next(error);
  }
};

//-------------------------------
//COUNT BY CITY query
//define the query by City: /countByCity?cities=berlin, madrid, london

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

    groupHotelsByCity(req, res, next);

    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export async function groupHotelsByCity(req, res, next) {
  //query.../countByCity?cities=all
  const result = { list: [] };
  let key = 'city';

  try {
    const hotels = await HotelModel.find();

    for (let index in hotels) {
      const hotel = hotels[index];

      if (result.list.indexOf(hotel[key]) === -1) {
        result.list.push(hotel[key]);
        result[hotel[key]] = {};
        result[hotel[key]]['counter'] = 0;
      }
      // console.log(hotel[key], hotel[key].toLowerCase());

      result[hotel[key].toLowerCase()]['counter'] += 1;
    }
    console.log('result', result);

    // res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//how to do this groupping in mongodb
//get key info

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
//COUNT BY TYPE query
//query.../countnByType?types=hotel, apartment,room
//Use this to count specific types given by user
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
//COUNT PROPERTIES BY TYPE
//Use this to count the properties by the types already defined in the database

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

//READ BY QUERY. GET ALL ACCOMODATIONS BY QUERY
export const getHotelsByQuery = async (req, res, next) => {
  //endpoint : http://localhost:8800/api/hotels/getHotelsByQuery/?featured=true&min=10&max=800&limit=4

  console.log(req.query);

  const { min, max, limit, ...restOfQuery } = req.query;

  console.log(min, max, limit, restOfQuery);

  try {
    const data = await HotelModel.find({
      ...restOfQuery,
      economicPrice: { $gte: min, $lte: max },
      // economicPrice: { $gte: min | 2, $lte: max | 800 },
    }).limit(req.query.limit);
    // const data = await HotelModel.find(req.query).limit(req.query.limit);
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

//UPDATE
export async function updateHotel(req, res, next) {
  const id = req.params.id;
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
  const id = req.params.id;

  try {
    const hotelDeleted = await HotelModel.findByIdAndDelete(id);

    console.log(hotelDeleted);
    res.status(200).json(`${hotelDeleted.name} has been deleted`);
  } catch (err) {
    console.log(err, 'at deleting', id, 'hotel');
    next(err);
  }
};
