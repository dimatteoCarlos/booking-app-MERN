//verifyToken.js

import jwt from 'jsonwebtoken';
import { createError } from './createError.js';

//verify access_token
export const verifyToken = (req, res, next, cb) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'Access not Authenticated'));
  }
  // verify  token
  jwt.verify(token, process.env.JWT, (err, userInfo) => {
    if (err) {
      return next(createError(403, 'Creddential (token) is not valid'));
    }

    req.user = userInfo;
    //------------------------------
    //id, isAdmin, role
    //if role is not admin, shouldn't validate if the user is the same from the token? o se valida el token, es decir por eso es que se hace el cb, para validar lo que sea pero afuera?

    console.log('is the token valid?', req.user.id === req.params.id);

    //-----------------------------------
    cb();

    // next(); si se usa el cb este next no hace falta el flujo esta yendo al getUser
  });
};

//verify user
export const verifyUser = (req, res, next) => {
  console.log('user req:', req.params.id, 'user logged not read is:', req.user);

  verifyToken(req, res, next, () => {
    console.log('Verifying Token for', req.user.id);

    console.log(
      'You want to access your user account',
      req.user.id === req.params.id
    );

    if (req.user.id === req.params.id || req.user.isAdmin) {
      console.log(req.user.id, 'your access is granted');
      next();
    } else {
      console.log(req.user.id, 'Acces Not Authorized');

      return next(createError(403, 'You are not authorized!'));
    }
  });
};

//verify admin
export const verifyAdmin = (req, res, next) => {
  //probar las dos maneras
  verifyToken(req, res, next, ()=> {
  // verifyToken((req, res, next) => {
    console.log('admin verifications:', req.user.isAdmin);
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized as Administrator!'));
    }
  });
};
