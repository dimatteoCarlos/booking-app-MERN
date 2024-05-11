// RoomSchemaSpec.js
// import mongoose from 'mongoose';

export const RoomSchemaSpec = {
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
};

/*
[
  {number:101, unavailableDates:[01.05.2022, 02.07.2025]}
]
*/
