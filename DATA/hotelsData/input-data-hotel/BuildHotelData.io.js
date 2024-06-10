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
} = require('./inputDataHotel.js');

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

  //arrLen must be equal or greater than the quantity of numbers available inside the range, if not, then, the arrLen (array length) is limited to the qty of numbers available in the range ------
  const limit = Math.floor(Math.abs(maxRndNumber - minRndNumber) + 1);

  // console.log({ limit });

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

// //-------------------------
// const names2, = [
//   'casa campus ',
//   'hotel',
//   'villa',
//   'resort',
//   'cabin',
//   'remanso',
//   'monaco',
//   'stancia',
//   'Park Residence',
//   'country club',
// ];
// const names1, = [
//   'my dream',
//   'suite ',
//   'hotel inn',
//   'renaissance',
//   'mountain',
//   'sublime',
//   'pinnacle',
//   'paradise',
//   'president',
//   'aparthotel',
//   'long',
//   'superior',
//   'margaret',
//   'boutiqueMadrid',
//   'Hostal Dulcinea',
//   'Ashemere Lodge',
//   'Herbert Park Hotel',
//   'Heart of Gold Hostel',
//   'SabiaNatura',
// ];

// const cities, = [
//   'london',
//   'madrid',
//   'dublin',
//   'berlin',
//   'paris',
//   'buenos aires',
//   'bogota',
// ];

// const types, = ['apartment', 'hotel', 'villa', 'cabin', 'resort', 'room'];

// const prices, = [35, 50, 75, 85, 90, 100, 120, 150, 200, 800];
// const rates, = [7.5, 8.5, 9.8, 6.2, 9.1, 5.9, 9.9];
// const ratings, = ['excelent', 'wonderful', 'very good', 'good', 'fair'];
// const featuredAcc, = [true, false];
// const roomsArray, = [
//   ['101', '102', '103'],
//   ['503', '501', '505'],
//   ['101', '205', '304'],
//   ['202', '102', '302', '402', '502'],
//   ['301', '302', '207', '308'],
//   ['A-1', 'A-7', 'B-2', 'B-3'],
// ];

// const photos, = [
//   'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1',
//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/451623050.jpg?k=7ff8bc67f60202b2ecf2360c29731bbcfdfff521a58d19a247df8862e552ead4&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/451623015.jpg?k=8c554e737982f584834abfc9c1669bd21f7213ac2d23d1f110b87d4bf54256ba&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/451623174.jpg?k=d5cc7f98195757922d987846065b718c993c70ef888a0003977fcd615c5174b1&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/451623025.jpg?k=dab975cd5c5284bd24c029d1924891cabd3b5434b5baa252390c59c19ab239c0&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/451623101.jpg?k=0914d02e337dd5b5f074c78793a667a8f0d1925a56cbafbd6113b870ab30e849&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/451622765.jpg?k=a09321f2bf7c12f0873f881614668200f75a1049d8834e9f0753762f90f118a5&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/43464330.jpg?k=0dd9c43879e3bc9817ab297def2ca6057b402dd38841c9eab3d54ad5c3bcb691&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/38191745.jpg?k=311b45d226cab70e895d4e06957672ba191c032e07d90c5ed386e783c927cf9a&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/38191727.jpg?k=2f9dbea02b8dab39001c4fd8a3b2238e809d545c1826052c668ddec945e5dc31&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/38191689.jpg?k=2d018d5545baf473a7c67a303eb1bb6fe92eb63044509801ee11c94b048d54ca&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/38191691.jpg?k=250495f37a52ba1e203494d6d275e237b6c55d069e3285d6793fde798a09f98f&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/43464321.jpg?k=3fa24eb0ef4611802a1a580160956edc4d605bdfd28b4096e10166687a4915b8&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/43463946.jpg?k=eca0d3cc63f57bff17ed143d3bb72b5628c19574a9b9e4682c8f4ef962fcc8dd&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/473321222.jpg?k=f7bd3dccb54826b2de2f180c174d0cc4f3f27683d03e7588b3d93c854ca83ee6&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/473321227.jpg?k=1000f38f68c1f25481b1522a444f5e1d3f8d6dccaff5251581cd725f376ff952&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/473320096.jpg?k=cdded33ddb130466841b08074a856c0f570d70e541a542737af1c214bcc73fad&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/473320086.jpg?k=ee5c2eb3404b961ccd30c95dd455ed4ac0e593dae77edb0490c606c5f8c81fdd&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/473320100.jpg?k=dbe58ae154e2b29b770a8b8eb7067c7f68d7ab83609304bdb6595ab54dc8fd3f&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/473320109.jpg?k=9da3ff71239a9f461c2c517218b8d7e08e802f49018f6672239e67d064d4d220&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/133362285.jpg?k=0677e5f50f64cd69aceb2be5807eec80024f362a19e8d2a5c65c8f8d4ce586d0&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/93175484.jpg?k=2f780091c7a98c9e3ef44855716ed58283ad3a31e23f5f7856aba209da75714d&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/515056786.jpg?k=964e1369dd09677733aae740a78f3113f01712c2495693b7649278e23574c547&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/495521936.jpg?k=e3a5d5dc673de8ed5b6deff93d2a16b4b83498f56388aa90b31fa0c602acc3f9&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/246217815.jpg?k=c22bf82e9153a92968b2de588f4685461fb88c4c79d0ac83c5d4317018b615ec&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/41098502.jpg?k=9d418ba085386d0a22b821eab17b47f4726fac06735e1c59fc6b5157666fb7d2&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/277632694.jpg?k=c9aaa236250e3ef544bbaab9120170f0459f5c24bac2f750887406016658b68f&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/277632873.jpg?k=5a6df8c146eb274522c2c440e8b9a8ec55f7374ea3df2904a75ae890173b5e3d&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/277633073.jpg?k=94ecf0a7ce491527b643b0617198432e3897acacbf76950b815a28a6381828b9&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/480984651.jpg?k=980426da2aec148116107f8720a72840d283b1ce56bb1f47ff31fd16942d7fdd&o=&hp=1',

//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/480984635.jpg?k=cd44138ceb0ae2ab9da4bd1ea9315c3335cdbff29a67b355236f3b96962f23da&o=&hp=1',
//   'https://cf.bstatic.com/xdata/images/hotel/max1024x768/480984649.jpg?k=d7e0ddc23cfdfaabb2c9f21248f86e6cb3313210e4f832d16b1c1983d83fed10&o=&hp=1',

//   //----------------
// ];
// //details
// const titles, = [
//   'Tower Street Apartments',
//   'SabiaNatura - boutique Madrid',
//   'CanningTown Double Rooms - 20',
//   'Herbert Park Hotel and Park Residence',
//   ,
// ];
// const addresses, = [
//   ' Calle del Arenal 26 ( 3ª Planta Izquierda), Centro de la ciudad, 28013 ',
//   'camino de Madrid, 20, 45221 Esquivias, ',
//   '0 Malmesbury Terrace, Newham, E16 4PL',
//   '07 Cherrywood Villas, Clondalkin',
//   'Ballsbridge, D4 ',
//   ' Johannisstr. 11, Mitte, 10117,',
// ];
// const distCom, = [
//   'excellent location',
//   'great location',
//   'near center',
//   'quite location',
//   'nearby the best beach in town',
//   'close to town',
//   'happy environment',
//   'near beautiful parks',
//   'near best restaurants',
// ];

// const recs, = [
//   'Stay in the heart of the City',
//   'Stay in teh best beach in the city',
//   'Enjoy the warm and comfy place',
//   'Ready to hit the main road',
//   'Relax and enjoy nature',
//   ' Spa and pool are very  comfortables, enjoy your Stay!',
//   'This is a very nice place for families and couples',
// ];
// const descriptions, = [
//   'Located within a 4-minute walk of Plaza Mayor and 500 yards of Puerta del Sol, this accomadation provides rooms with air conditioning and a private bathroom . The property is around a 15-minute walk from Temple of Debod, 600 yards from Gran Via and a 9-minute walk from Gran Via Station Metro Station. The property is a 3-minute walk from Mercado San Miguel, and within 300 yards of the city center.',

//   'Offering a restaurant, This accomation is located in the square, 10 minutes walk from the city center. Free WiFi access is available.',

//   'CanningTown Double Rooms - 20 offers accommodations, 2.3 miles from Canary Wharf Tube Station and 2.7 miles from East Ham Tube Station. The property is around 2.7 miles from Stratford Tube Station, 3 miles from Stratford City Westfield, and 3.4 miles from Olympic Stadium. Free Wifi is available throughout the property, and Tube Station is a 19-minute walk away.',

//   ' Enjoy a location in Clondalkin, 3.5 miles from The Square Tallaght and 5.1 miles from Kilmainham Gaol. Both Wifi and private parking are accessible at the bed and breakfast free of charge. National Museum of Ireland – Decorative Arts & History is 6.3 miles away, and  Zoo is 6.6 miles from the bed and breakfast.',

//   'Overlooking the 48-acre Herbert Park in Ballsbridge,  4, this hotel is located 328 feet from the RDS and 5 minutes’ walk from the Aviva Stadium. This stylish, modern hotel offers spacious and elegant bedrooms as well as luxury studio apartments.',

//   'Located in the heart of the capital, just minutes away from some of the best sights and attractions in town. Just a 5 minute walk from Museum Island and a 3 minute train journey to Brandenburg Gate, this modern backpacker hostel is the perfect location for sightseeing and socializing with fellow travelers and local expats in our Belushis bar.',

//   'This modern accomodation is the perfect location for sightseeing and socializing with fellow travelers and local expats in our special Bar.  The property is around 3 miles from north to south, 3 miles from downtown, and 3.4 miles from shoreline beachs. Free Wifi is available throughout the property, and public transportation is a 19-minute walk away.',
// ];

// const priceHighlightArray, = [
//   'Book a stay over $114 at this property and get a free airport taxi',
//   'We prices match',
//   'The earlier you book the better the credit',
//   'Reasonable prices for super accomodations',
//   'The best prices in the city',
//   'You are eligible for a Genius discount. To save at this property, all you have to do is sign in.',
// ];

// const featTit, = [
//   'Tower Street Apartments',
//   'Downtown Apartment - Near Banks Center!',
//   'Super Comfy Cabin',
//   'Clear waters beach',
// ];
// const featSubTit, = [
//   'Studio Apartment with Air conditioning',
//   'Studio Apartment',
//   'Apartaestudios',
//   'Studio Apartment with Air conditioning',
// ];
// const feats, = [
//   'Entire studio • 1 bathroom • 21m² 1 full bed',
//   'Entire apartment • 1 queen bed • 67 m² size • Kitchen • Non-smoking room • Free wifi',
//   'Private suite • 1 bedroom • 1 living room • 1 bathroom • 43m² • 1 full bed',
//   'Entire studio • 2 bathroom • 90m² 2 full bed',
// ];
// const cncOp, = [
//   'Free cancellation',
//   'Prepayment required',
//   'Free cancellation',
//   'You can cancel later in cash',
// ];
// const cncOS, = [
//   'Free cancellation',
//   'You can cancel later',
//   'You can pay later in cash',
//   'You can cancel later, so lock in this great price today!',
// ];
// const txsOp, = ['Includes taxes and fees', 'Includes taxes and fees'];

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
const datos = Array.from({ length: 100 }, (_, i) => {
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
        totPrice: '$NUMBER*PRICE', //calculated
        durationStay: '(NUMBER nights)', //calculated
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
    'C:/AA1-WEB DEVELOPER/VIDEOS/backend 7710/8 React Booking/booking-app-MERN/DATA/hotelsData/test1.txt',
    content
  );
  // file written successfully
} catch (err) {
  console.error(err);
}

/************************* */
