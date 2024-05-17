export interface Hotels {
  id: number;
  type: string;
  name: string;
  city: string;
  economicPrice: number;
  rate: string;
  rating: string;
  reviews: number;
  featured: boolean;
  rooms?: string[] | null;
  photoUrlImages?: string[] | null;
  details: Details;
}
export interface Details {
  title: string;
  address: string;
  distance: Distance;
  priceHighlight: string;
  detailsDescription: DetailsDescription;
  detailsPriceOfStaying: DetailsPriceOfStaying;
}
export interface Distance {
  km: number;
  comment: string;
}
export interface DetailsDescription {
  recommendation: string;
  description: string;
}
export interface DetailsPriceOfStaying {
  commentStay: string;
  locationStay: string;
  totPrice: string;
  durationStay: string;
}
