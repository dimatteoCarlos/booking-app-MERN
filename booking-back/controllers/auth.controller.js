//auth.controller.js
import UserModel from '../models/userModel/UserModel.js';
// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/createError.js';

// const app = express();
// app.use(cookieParser())
//Para crear un usuario nuevo, se deberia verificar que el username introducido no se encuentre ya en la base de datos,  deberia haber ademas de validacion, verificacion del rol en alguna tabla, o seria un administrador el que coloque los roles.

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

//LOGIN - POST
export const login = async (req, res, next) => {
  console.log('req.body:', req.body);

  try {
    const userInfo = await UserModel.findOne({ username: req.body.username });

    if (!userInfo) {
      return next(createError(404, 'User not found'));
    }

    const isRightPassword = bcrypt.compareSync(
      req.body.password,
      userInfo.password
    );

    if (!isRightPassword) {
      console.log('Wrong password or username!');
      return next(createError(400, 'Wrong password or username!'));
    }

    const { password, isAdmin, role, ...mainUserInfo } = userInfo._doc;

    console.log({ password, isAdmin, role, mainUserInfo });

    const token = jwt.sign(
      {
        id: mainUserInfo._id,
        isAdmin: isAdmin,
        role: role,
      },
      process.env.JWT
      // ,{ expiresIn: '1h' }
    );

    console.log('token:', token, typeof token);

    console.log('previous cookies:', req.cookies);

    res.cookie('access_token', token, {
      httpOnly: true,
    });

    res.status(200).json({ userAuthInfo: { ...mainUserInfo }, isAdmin, role });
  } catch (error) {
    console.error(error, 'error message');
    next(error);
    // res.status(500).json(error);
  }
};
