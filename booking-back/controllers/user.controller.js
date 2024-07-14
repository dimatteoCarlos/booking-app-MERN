//user.controller.js

import UserModel from '../models/userModel/UserModel.js';

//READ ONE USER
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
//READ ALL USERS
export const getUsers = async (req, res, next) => {
  console.log('enter getUsers')
  try {
    const users = await UserModel.find().select('-password');
    console.log(users[0]);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//---------------------------------------
//UPDATE
export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);

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
//DELETE
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const userDeleted = await UserModel.findByIdAndDelete(id);
    console.log('🚀 ~ deleteUser ~ userDeleted:', userDeleted);

    res.status(200).json('user has been deleted');
  } catch (error) {
    console.log(error);
    next(error);
  }
};
