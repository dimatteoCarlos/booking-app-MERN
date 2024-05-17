//arreglos con los datos
// import bcrypt from 'bcrypt';
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const usersDataBase = require('./usersDataBase.js');

//-------------------------

const adminRoles = ['admin', 'superadmin'];

const datosUser = [
  {
    id: 1,
    img: 'https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    username: 'Elva McDonald',
    email: 'elva@gmail.com',
    password: '',
  },
  {
    id: 2,
    img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600',
    username: 'Linnie Nelson',
    email: 'linnie@gmail.com',
    password: '',
  },
  {
    id: 3,
    img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600',
    username: 'Brent Reeves',
    email: 'brent@gmail.com',
    password: '',
  },
  {
    id: 4,
    img: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600',
    username: 'Adeline Watson',
    email: 'adeline@gmail.com',
    password: '',
  },
  {
    id: 5,
    img: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600',
    username: 'Juan Harrington',
    email: 'juan@gmail.com',
    password: '',
  },
  {
    id: 6,
    img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600',
    username: 'Augusta McGee',
    email: 'augusta@gmail.com',
    password: '',
  },
  {
    id: 7,
    img: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600',
    username: 'Angel Thomas',
    email: 'angel@gmail.com',
    password: '',
  },
];

const SALT_ROUNDS = 10;
const len = usersDataBase.length;
const newdatosUser = Array.from({ length: 7 }, (_, i) => {
  const password = `'password'+i`;
  var salt = bcrypt.genSaltSync(SALT_ROUNDS);
  var hash = bcrypt.hashSync(password, salt);
  const aleatorio = Math.floor(Math.random() * len);

  let obj = {
    ...datosUser[i],
    password: hash,
    city: usersDataBase[i].city,
    country: usersDataBase[i].country,
    occupation: usersDataBase[i].occupation,
    role: usersDataBase[aleatorio].role,
    phone: usersDataBase[i].phoneNumber,
    isAdmin: adminRoles.includes(usersDataBase[aleatorio].role) ? true : false,
  };

  return {
    ...obj,
  };
});

console.log('🚀 ~ datos:', newdatosUser);
//---------------------
//How many fields
console.log('Fields:', newdatosUser.length);

const datosCongelados = [...newdatosUser];

console.log('🚀 ~ datosCongelados:', datosCongelados);

// -------------------------------------------
//Writing the data in a txt file

const fs = require('fs');

let content = JSON.stringify(datosCongelados);

// console.log(content);

try {
  fs.writeFileSync(
    'C:/AA1-WEB DEVELOPER/VIDEOS/backend 7710/8 React Booking/booking-app-MERN/DATA/usersData/users.txt',
    content
  );
  // file written successfully
} catch (err) {
  console.error(err);
}

/************************* */
