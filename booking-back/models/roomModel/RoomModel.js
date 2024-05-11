// RoomModel.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

import { RoomSchemaSpec } from './RoomSchemaSpec.js';

const schemaOptions = { timestamps: true, versionKey: false };

const collectionName = 'Room';

const collectionSchema = new Schema(RoomSchemaSpec, schemaOptions);

const RoomModel = model(collectionName, collectionSchema);

export default RoomModel;
