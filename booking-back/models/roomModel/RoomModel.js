// RoomModel.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const schemaOptions = { timestamps: true, versionKey: false };

import { RoomSchemaSpec } from './RoomSchemaSpec.js';

const collectionName = 'Room';

const collectionSchema = new Schema(RoomSchemaSpec, schemaOptions);

const RoomModel = model(collectionName, collectionSchema);

export default RoomModel;

// export default mongoose.models[collectionName] ||
//   model(collectionName, collectionSchema);
