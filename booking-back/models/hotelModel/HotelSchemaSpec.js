// HotelSchemaSpec.js
// import mongoose from 'mongoose';

export const HotelSchemaSpec = {
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String, //cabin, hotel, apartment
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },

  rooms: {
    type: [String],
  },

  economicPrice: {
    type: Number,
    required: true,
  },

  featured: {
    type: Boolean,
    default: false,
  },
};
