//UserSchemaSpec.js

export const UserSchemaSpec = {
  username: { type: String, required: true, unique: true,min: 2, max: 20 },

  email: { type: String, required: true, max: 50, unique: true },

  password: { type: String, required: true, min: 5 },
  img: {
    type: String,
  },

  occupation: { type: String },

  // city: String,
  // state: String,
  country: { type: String, require: true },
  phone: String,
  // transactions: Array,
  isAdmin: {
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user',
  },
};
