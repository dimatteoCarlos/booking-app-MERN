// HotelModel.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

import { HotelSchemaSpec } from './HotelSchemaSpec.js';
const collectionName = 'Hotel';

const schemaOptions = { timestamps: true, versionKey: false };


const collectionSchema = new Schema(HotelSchemaSpec, schemaOptions);

const HotelModel = model(collectionName, collectionSchema);

export default HotelModel;
