//Input Data
const {
  names2,
  names1,
  cities,
  types,
  prices,
  rates,
  ratings,
  featuredAcc,
  roomsArray,
  photos,
  titles,
  addresses,
  distCom,
  recs,
  descriptions,
  priceHighlightArray,
  featTit,
  featSubTit,
  feats,
  cncOp,
  cncOS,
  txsOp,
} = require('.input-data-hotel/inputDataHotel.js');

//Where to write the txt data file
const yourDataDirectory=    'C:/AA1-WEB DEVELOPER/VIDEOS/backend 7710/8 React Booking/booking-app-MERN/DATA/hotelsData/test1.txt'

//------Random Number Generator between maxRndNumber and mninRndNumber------------

function randomNumberGenerator(maxRndNumber = 10, minRndNumber = 1) {
  return (
    Math.floor(Math.random() * Math.abs(maxRndNumber - minRndNumber) + 0.5) +
    minRndNumber * 1
  );
}

//-----Generate an Array with non repeated random numbers between max and min range and with size arrLen -----
function rndNumArrayGen(arrLen = 10, maxRndNumber = 10, minRndNumber = 1) {
  let randomNumbersArray = [];
  //if min value of range is <=0 then is set to 1
  minRndNumber < 0 ? (minRndNumber = 0) : null;
  maxRndNumber > 1000 ? (maxRndNumber = 1000) : null;

  const limit = Math.floor(Math.abs(maxRndNumber - minRndNumber) + 1);

  arrLen > limit ? (arrLen = limit) : null;

  for (let i = 0; i < arrLen; i++) {
    let rnd = randomNumberGenerator(maxRndNumber, minRndNumber);

    //do not repeate rnd number
    while (randomNumbersArray.includes(rnd)) {
      rnd = randomNumberGenerator(maxRndNumber, minRndNumber);
    }
    randomNumbersArray.push(rnd);
  }

  return randomNumbersArray;
}

//*************************** */
function randomValue(array) {
  const rangeInd = array.length;
  const rndVal = array[Math.floor(Math.random() * rangeInd)];
  return rndVal;
}

const photosLen = photos.length,
  maxRndNumber = photosLen - 1,
  minRndNumber = 0;

//-------------------------------------------------
//INIT
const datos = Array.from({ length: 1000 }, (_, i) => {
  const rndNumPhotos = rndNumArrayGen(6, maxRndNumber, minRndNumber);

  let obj = {
    id: i + 1,
    type: randomValue(types),
    name: `${randomValue(names1)} ${randomValue(names2)} `,
    city: randomValue(cities),
    // economicPrice: Math.floor(Math.random() * (800 - 20) + 20),
    economicPrice: randomValue(prices),
    rate: Number((Math.random() * (10 - 1) + 1).toFixed(1)),
    // rate: randomValue(ratings),

    rating: randomValue(ratings),
    reviews: Math.floor(Math.random() * (100 - 1) + 1),
    featured: randomValue(featuredAcc),
    rooms: randomValue(roomsArray),

    //------------------
    photoUrlImages: rndNumPhotos.map((photoIndx, _) => photos[photoIndx]),

    details: {
      title: `${randomValue(names1)} ${randomValue(names2)} `,
      address: randomValue(addresses),
      distance: {
        km: randomNumberGenerator(5, 0.5),
        comment: randomValue(distCom),
      },
      priceHighlight: randomValue(priceHighlightArray),

      detailsDescription: {
        recommendation: randomValue(recs),
        description: randomValue(descriptions),
      },

      detailsPriceOfStaying: {
        commentStay: 'Perfect for a ${NUMBER-night} stay!', //calculate
        locationStay:
          'Located in the real heart of the CITY, this property has an RATING location score of RATE!',
        totPrice: '$NUMBER*PRICE', //calculate
        durationStay: '(NUMBER nights)', //calculate
      },
    }, //details

    features_details: {
      featureTitle: randomValue(featTit),
      featureSubTitle: randomValue(featSubTit),
      features: randomValue(feats),
      cancelOp: randomValue(cncOp),
      cancelOpSubtitle: randomValue(cncOS),
      taxesOp: randomValue(txsOp),
    }, //features
  };

  return {
    ...obj,
  };
});

// console.log('🚀 ~ datos:', datos);
//---------------------
//How many fields
console.log('Fields:', datos.length);

const datosCongelados = [...datos];

console.log('🚀 ~ datosCongelados:', datosCongelados[0].details);

// -------------------------------------------
//Writing the data in a txt file

const fs = require('fs');

let content = 'export const data_hotel=' + JSON.stringify(datosCongelados);

// console.log(content);

try {
  fs.writeFileSync(
yourDataDirectory,
    content
  );
  // file written successfully
} catch (err) {
  console.error(err);
}

/************************* */
