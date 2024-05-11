// HotelModel.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

import { HotelSchemaSpec } from './HotelSchemaSpec.js';

const schemaOptions = { timestamps: true, versionKey: false };

const collectionName = 'Hotel';

const collectionSchema = new Schema(HotelSchemaSpec, schemaOptions);

const HotelModel = model(collectionName, collectionSchema);

export default HotelModel;
