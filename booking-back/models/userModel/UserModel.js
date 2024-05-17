//UserModel.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

import { UserSchemaSpec } from './UserSchemaSpec.js';


const collectionName = 'User';

//---------------------
const schemaOptions = { timestamps: true, versionKey: false };

const collectionSchema = new Schema(UserSchemaSpec, schemaOptions);

const UserModel = model(collectionName, collectionSchema);
//---------------------

// export default Model;

export default UserModel;
