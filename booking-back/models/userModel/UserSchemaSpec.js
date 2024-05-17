//UserSchemaSpec.js

export const UserSchemaSpec = {
  img: {
    type: String,
  },
  username: { type: String, required: true, unique: true, min: 3 },

  email: { type: String, required: true, max: 50, unique: true },

  password: { type: String, required: true},

  city: { type: String },
  country: { type: String, required: false },
  occupation: { type: String },

  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user',
  },

  phone: { type: String, required: false },

  isAdmin: {
    type: Boolean,
    default: false,
  },
};
