export type MenuTypeData = {
  id: number;
  title: string;
  listItems: {
    id: number;
    title: string;
    url: string;
    icon: string;
  }[];
};

export type topDealUsersTypeData = {
  id: number;
  img: string;
  username: string;
  email: string;
  amount: string;
};

export type ChartBoxTypeData = {
  icon: string;
  number: string;
  percentage: number;

  color: string;
  dataKey: string;
  title: string;
  chartData: {
    name: string;
    users?: number;
    products?: number;
    revenues?: number;
    visit?: number;
  }[];
};

export type AreaChartBoxDataType = {
  name: string;
  books: number;
  clothes: number;
  electronic: number;
}[];

export type ChartDataType = {
  name: string;
  users?: number;
  products?: number;
  revenues?: number;
  ratio?: number;
  visit?: number;
};

export type BarChartBoxType = {
  title: string;
  color: string;
  dataKey: string;
  chartData: {
    name: string;
    visit?: number;
    revenue?: number;
  }[];
};

export type ChartBoxDataType = {
  name: string;
  value: number;
  color: string;
}[];

export type RingChartBoxDataType = {
  name: string;
  value: number;
  color: string;
}[];

export type TitleBtnType = {
  title: string;
  btnLabel: string;
};

export type SimpleChartDataType = {
  name: string;
  value: number;
  color: string;
}[];

export type Activities = {
  text: string;
  time: string;
};
