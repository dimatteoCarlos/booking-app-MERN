//-----------
export interface SingleUserDataType {
  id: number;
  title: string;
  img: string;
  info: Info;
  chart: Chart;
  activities?: Activities[] | null;
}
export interface Info {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  status: string;
}
export interface Chart {
  dataKeys?: DataKeys[] | null;
  data?: Data[] | null;
}
export interface DataKeys {
  name: string;
  color: string;
}
export interface Data {
  name: string;
  visits?: number;
  clicks?: number;
}
export interface Activities {
  text: string;
  time: string;
}
