//auth.controller.js
import UserModel from '../models/userModel/UserModel.js';
// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/createError.js';

//Para crear un usuario nuevo, deberia haber ademas de validacion, verificacion del rol en alguna tabla, o seria un administrador el que coloque los roles.

// logica para trabajar con expiration token y acces token?

//CREATE NEW USER
export const register = async (req, res, next) => {
  const SALT_ROUNDS = 10;

  try {
    var salt = bcrypt.genSaltSync(SALT_ROUNDS);

    var hash = bcrypt.hashSync(req.body.password, salt);

    const newUserDataModel = new UserModel({ ...req.body, password: hash });

    const newUser = await newUserDataModel.save();
    console.log(`${newUser.username} has been created`);
    res.status(200).send(`${newUser.username} has been created`);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//GET USER - LOGIN
export const login = async (req, res, next) => {
  const data = req.body;

  try {
    const userInfo = await UserModel.findOne({ username: req.body.username }); //.select('-password');

    if (!userInfo) {
      return next(createError(404, 'User not found'));
    }

    const isRightPassword = bcrypt.compareSync(
      data.password,
      userInfo.password
    );

    if (!isRightPassword) {
      return next(createError(400, 'Wrong password or username!'));
    }

    const token = jwt.sign(
      { id: userInfo._id, isAdmin: userInfo.isAdmin, role: userInfo.role },
      process.env.JWT
      // ,
      // { expiresIn: '1h' }
    );

    const { password, isAdmin, role, ...restOfUserInfo } = userInfo._doc;

    console.log('you are logged in', { ...restOfUserInfo });

    // res.status(200).json({ ...restOfUserInfo });

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...restOfUserInfo }, isAdmin, role });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
