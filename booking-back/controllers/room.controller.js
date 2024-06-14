//room.controller.js

import RoomModel from '../models/roomModel/RoomModel.js';
import HotelModel from '../models/hotelModel/HotelModel.js';

//CREATE
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const data = req.body;

  const newRoomDataModel = new RoomModel(data);
  //it Should not duplicate rooms in rooms collection db, and in the hotels collections db.  Better organize database for validation of the data.

  try {
    const roomCreated = await newRoomDataModel.save();

    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: roomCreated._id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json(roomCreated);
  } catch (error) {
    next(error);
  }
};

//UPDATE
export async function updateRoom(req, res, next) {
  const id = req.params.roomId;
  const data = req.body;
  try {
    const roomUpdated = await RoomModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    console.log(roomUpdated, ' was updated');
    res.status(200).json(roomUpdated);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//READ GET by id
export const getRoom = async (req, res, next) => {
  const id = req.params.roomId;

  try {
    const RoomIdInfo = await RoomModel.findById(id);

    res.status(200).json(`Room Info: ${RoomIdInfo} was obtained`);
    console.log(RoomIdInfo);
  } catch (error) {
    next(error);
  }
};

//READ ALL
export const getRooms = async (req, res, next) => {
  try {
    const roomsData = await RoomModel.find();
    console.log(roomsData);
    res.status(200).json(roomsData);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

//Before deleting the roomId from rooms collection, it should be verified if this really exists in the selected Hotel.
// if the roomId does not exist in the hotel selected, the roomId is deleted from the rooms Collection, but instead, it stays in the hotels that contains it.

//How to really delete the room with the number that is inside the array, and not the entire array of rooms

//DELETE

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const roomId = req.params.roomId;

  try {
    const RoomDeleted = await RoomModel.findByIdAndDelete(roomId);

    console.log(RoomDeleted);

    try {
      //probar que arroja en hotelRoomDeleted
      const hotelRoomDeleted = await HotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: roomId },
      });

      console.log({ hotelRoomDeleted });
    } catch (err) {
      console.log(err, 'at hotel', hotelId, 'deleting room', roomId);
      next(err);
    }

    res
      .status(200)
      .json(
        `Room ${
          (RoomDeleted.title, RoomDeleted._id)
        } has been deleted, from room collection db`
      );
  } catch (err) {
    console.log(err, 'at deleting', roomId, 'Room');
    next(err);
  }
};

/**************/
export const updateRoomAvailability = async (req, res, next) => {
  const roomId = req.params.roomId;

  try {
    await RoomModel.updateOne(
      req.params.roomId,

      { 'roomNumbers._id': roomId },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates,
        },
      }
    );
    res.status(200).json('Room status has been updated');
  } catch (error) {
    next(error);
  }
};
