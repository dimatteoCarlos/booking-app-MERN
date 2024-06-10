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

  {
    id: 8,
    img: 'https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    lastName: 'Decisa',
    firstName: 'Jazmin',
    email: 'kewez@@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true,
  },
  {
    id: 9,
    img: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Trosado',
    firstName: 'Andres',
    email: 'comhuhmit@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true,
  },
  {
    id: 10,
    img: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'de Hesa',
    firstName: 'Hanna Busado',
    email: 'ujudokon@hottmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true,
  },
  {
    id: 11,
    img: 'https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Nava',
    firstName: 'Nory',
    email: 'tinhavabe@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true,
  },
  {
    id: 12,
    img: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Querozo',
    firstName: 'Mathias',
    email: 'gobtagbes@yahoo.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
  },
  {
    id: 13,
    img: 'https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Tiya',
    firstName: 'Aitor',
    email: 'vulca.eder@mail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true,
  },
  {
    id: 14,
    img: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Casas',
    firstName: 'Armando',
    email: 'reso.bilic@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
  },
  {
    id: 15,
    img: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Osaurio',
    firstName: 'Dean',
    email: 'codaic@mail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true,
  },
  {
    id: 16,
    img: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Surero',
    firstName: 'Elba',
    email: 'uzozor@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
  },
  {
    id: 17,
    img: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Tumokito',
    firstName: 'Tesaka',
    email: 'tuhkabapu@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true,
  },
  {
    id: 18,
    img: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Delano',
    firstName: 'Dolores',
    email: 'gibo@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true,
  },
  {
    id: 19,
    img: 'https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Chufe',
    firstName: 'Helen',
    email: 'tic.harvey@hotmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
  },
  {
    id: 20,
    img: 'https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Bustos',
    firstName: 'Hemma Amado ',
    email: 'ceuc@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
  },
  {
    id: 21,
    img: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Tito',
    firstName: 'Elton',
    email: 'bafuv@hotmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
  },
  {
    id: 22,
    img: 'https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    lastName: 'Cremento',
    firstName: 'Alex',
    email: 'ubo@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
  },
];
//--------------------------
const SALT_ROUNDS = 10;
const len = usersDataBase.length;

function modifyDatosUser(nameToChange) {
  const names = nameToChange.split(' ');
  const username = names.join('_');
  const lastname = names[1],
    name = names[0];

  return { username, name, lastname };
}

function modifyUsersDataBase(name, lastname) {
  const username = name + '_' + lastname;
  return { username, name, lastname };
}

const newdatosUser = Array.from({ length: datosUser.length }, (_, i) => {
  const password = `'password'+i`;
  var salt = bcrypt.genSaltSync(SALT_ROUNDS);
  var hash = bcrypt.hashSync(password, salt);
  const aleatorio = Math.floor(Math.random() * len);

  const { username, name, lastname } = datosUser[i].username
    ? modifyDatosUser(datosUser[i].username)
    : modifyUsersDataBase(datosUser[i].firstName, datosUser[i].lastName);

  let obj = {
    ...datosUser[i],
    username: username,
    name: name,
    firstName: name,
    lastName: lastname,
    password: hash,
    city: usersDataBase[i].city,
    country: usersDataBase[i].country,
    occupation: usersDataBase[i].occupation,
    role: usersDataBase[aleatorio].role,
    phone: usersDataBase[i].phoneNumber,
    isAdmin: adminRoles.includes(usersDataBase[aleatorio].role) ? true : false,
  };
  // delete obj.name;

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
