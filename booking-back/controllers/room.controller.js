//room.controller.js

import RoomModel from '../models/roomModel/RoomModel.js';
import HotelModel from '../models/hotelModel/HotelModel.js';

//CREATE
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid; //porque hotelid y no id
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
  const id = req.params.id;
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
  const id = req.params.id;

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

//DELETE

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const roomId = req.params.id;

  try {
    //Before deleting the roomId from rooms collection, it should be verified if this really exists in the selected Hotel.
    // if the roomId does not exist in the hotel selected, the roomId is deleted from the rooms Collection, but instead, it stays in the hotels that contains it.

    //How to really delete the room with the number that is inside the array, and not the entire array of rooms

    const RoomDeleted = await RoomModel.findByIdAndDelete(roomId);

    console.log(RoomDeleted);

    try {
      const hotelRoomDeleted = await HotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: roomId },
      });
    } catch (error) {
      console.log(err, 'at hotel', hotelId, 'deleting room', id);
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
    console.log(err, 'at deleting', id, 'Room');
    next(err);
  }
};
