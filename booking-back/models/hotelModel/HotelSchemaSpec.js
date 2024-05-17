// HotelSchemaSpec.js
// import mongoose from 'mongoose';

export const HotelSchemaSpec = {
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  economicPrice: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    min: 1,
    max: 10,
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },
  reviews: {
    type: Number,
    default: 1,
  },

  featured: {
    type: Boolean,
    default: false,
  },

  rooms: {
    type: [String],
  },

  photoUrlImages: {
    type: [String],
  },

  details: {
    title: { type: String },
    address: { type: String },
    priceHighlight: { type: String },
    distance: {
      km: { type: Number },
      comment: { type: String },
    },
    detailsDescription: {
      recommendation: { type: String },
      description: { type: String },
    },
    detailsPriceOfStaying: {
      commentStay: { type: String },
      locationStay: { type: String },
      totPrice: { type: String },
      durationStay: { type: String },
    },
  },//details
  features_details: {
    featureTitle: {type:String, required:false},
    featureSubTitle: {type:String, required:false},
    features: {type:String, required:false},
    cancelOp: {type:String, required:false},
    cancelOpSubtitle: {type:String, required:false},
    taxesOp: {type:String, required:false},
  }//features
};
