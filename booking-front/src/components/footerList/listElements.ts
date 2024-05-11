//listElements.ts
export const list1: string[] = [
  'Countries',
  'Regions',
  'Cities',
  'Districts',
  'Airports',
  'Hotels',
  'Places of interest',
];
export const list2: string[] = [
  'Homes',
  'Apartments',
  'Resorts',
  'Villas',
  'Hostels',
  'B&Bs',
  'Guest houses',
];
export const list3: string[] = [
  'Unique places to stay',
  'Reviews',
  'Discover monthly stays',
  'Unpacked: Travel articles',
  'Seasonal and holiday deals',
  'Traveller Review Awards',
];
export const list4: string[] = [
  'Car rental',
  'Flight Finder',
  'Restaurant reservations',
  'Booking.com for Travel Agents',
];
export const list5: string[] = [
  'Coronavirus(COVID-19) FAQS',
  'About Booking.com',
  'Curtomer Service Help',
  'Partner Help',
  'Careers',
  'Sustainability',
  'Press center',
  'Safety Resource Center',
  'Investor relations',
  'Terms & Conditions',
  'Partner dispute',
  'How We Work',
  'Privacy & cookie statement ',
  'MSA statement',
  'Corporate contact',
  'Content guidelines and reporting',
];

export const listBreaks: string[] = [
  'Places of interest',
  'Guest houses',
  'Traveller Review Awards',
  'Booking.com for Travel Agents',
  'Content guidelines and reporting',
];

export const breakListFn = (key: string, listBreaks: string[]): boolean => {
  return listBreaks.indexOf(key) !== -1;
};
