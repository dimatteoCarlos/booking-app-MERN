export type SingleProductDataType = {
  id: number;
  title: string;
  img: string;
  info: Info;
  chart: Chart;
  activities?: ActivitiesEntity[] | null;
};
export type Info = {
  productId: string;
  color: string;
  price: string;
  producer: string;
  export: string;
};
export type Chart = {
  dataKeys?: DataKeysEntity[] | null;
  data?: DataEntity[] | null;
};
export type DataKeysEntity = {
  name: string;
  color: string;
};
export type DataEntity = {
  name: string;
  visits: number;
  orders: number;
};
export type ActivitiesEntity = {
  text: string;
  time: string;
};
