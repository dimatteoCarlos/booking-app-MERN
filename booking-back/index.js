//index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

//routes
import hotelsRoute from './routes/routeHotels.js';
import authRoute from './routes/routeAuth.js';
import usersRoute from './routes/routeUsers.js';
import roomsRoute from './routes/routeRooms.js';

/*CONFIGURATIONS*/
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

//allow cross origin sharing request

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//makes  api call possible from another server
app.use(cors());
app.use(morgan('common'));

/*MIDDLEWARES */
//app.use('route',router) syntax
app.use('/api/hotels', hotelsRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/rooms', roomsRoute);

//message error handling
app.use((err, req, res, next) => {
  console.log('error handled, response ');
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    message: errorMessage,
    success: false,
    status: errorStatus,
    stack: err.stack,
  });
});

/*MONGOOSE SETUP */
const PORT = process.env.PORT || 8800;
//seems that options are not longer required.
const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

//*************** */
//Mode 02 with  await
//instead of localhost use: 'mongodb://127.0.0.1:27017/test'

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_BOOKINGAPP, options);
    console.log('Connected to mongodb');
  } catch (error) {
    throw error;
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('mongodb disconnected!');
});
mongoose.connection.on('connected', () => {
  console.log('mongodb is connected!');
});

app.listen(PORT, () => {
  connect();

  console.log('Connected to backend', '\n', `Server http://localhost:${PORT}/`);

});
