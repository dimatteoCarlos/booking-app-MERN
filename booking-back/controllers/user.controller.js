//user.controller.js

import UserModel from '../models/userModel/UserModel.js';

export const getUser = async (req, res, next) => {
  const id = req.params.id;
  console.log('get user route');
  try {
    let userdb = await UserModel.findById(id).select('-password');

    console.log(userdb);
    res.status(200).json(userdb);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//--------------------------------------
export const getUsers = async (req, res, next) => {
  const queInfoUser = req.params;
  console.log('info user desde getUsers backend', {queInfoUser});

  try {
    const users = await UserModel.find().select('-password');

    // console.log(users);

    res.status(200).json(users);

  } catch (error) {
    console.log(error);
    next(error);
  }
};
//---------------------------------------
export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const userUpdated = await UserModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    res.status(200).json(userUpdated);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//-----------------------------------
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const userDeleted = await UserModel.findByIdAndDelete(id);
    res.status(200).json('user has been deleted');
  } catch (error) {
    console.log(error);
    next(error);
  }
};
