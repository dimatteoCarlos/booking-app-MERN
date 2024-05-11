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
//SEARCH BY query
//define the query by City: /countByCity?cities=berlin, madrid, london

export const countHotelsByCity = async (req, res, next) => {
  //query.../countnByCity?cities=berlin, madrid,london
  const searchedCities = req.query.cities.split(',');

  console.log(req.query.cities, 'searchedCities', searchedCities);
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
    //01:31:03
    console.log(list);

    groupHotelsByCity(req, res, next);

    // res.status(200).json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const groupHotelsByCity = async (req, res, next) => {
  //query.../countnByCity?cities=all
  const result = { list: [] };
  let key = 'city',
    counter = 0,
    grouper = 'city';
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
};

export const countHotelsByType = async (req, res, next) => {
  //query:  /countByType?types=cabin, hotel, apartment, room
  const searchedType = req.query.types.split(',');
  try {
    const hotelsByType = await HotelModel.find({
      type: searchedType,
    });
    console.log(hotelsByType);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//-------------------------------
//READ ALL
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
