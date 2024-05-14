//types.ts
export type headerItemType = {
  icon: 'stays' | 'flights' | 'carRentals' | 'attractions' | 'taxis';
  title: string;
  status: boolean;
};

export type ModeType = string | null;

export type headerTitleType = {
  title: string;
  description: string;
};

export type PropertiesListType = {
  id: number;
  url: string;
  titles: {
    category: string;
    qty: string;
  };
};

//------
export type OptionsType = {
  adults: number;
  children: number;
  rooms: number;
};

//----
export type ResultsItemType = {
  image: string;
  title: string;
  distance: string;
  taxiOp: string;
  subtitle: string;
  features: string;
  cancelOp: string;
  cancelOpSubtitle: string;
  rating: {
    desc: string;
    rate: string;
  };
  price: string;
  taxesOp: string;
};

//--------
export type PhotoUrlType = {
  imgUrl: string;
};

export type DataOfAHotelType = {
  title: string;
  address: string;
  distance: string;
  priceHighlight: string;
  detailsDescription: {
    recommendation: string;
    description: string;
  };
  detailsPriceOfStaying: {
    commentStay: string;
    locationStay: string;
    price: string;
    durationStay: string;
  };
};
//------------------
export type PropertyType = {
  id: number;
  urlImage: string;
  name: string;
  place: string;
  price: string;
  rating: {
    rate: number;
    rating: string;
  };
};

//types related to the schemas defined in the database


export type HotelDBInfoType = {
  _id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  title: string;
  photos: string;
  description: string;
  rating: number;
  rooms: string;
  economicPrice: number;
  featured: boolean;
};
