//types.ts
//types related to data files used

export type RoomInfoDBType = {
  _id?: string; //check if it needs be converted from Type ObjectId to string
  title: string;
  price: number;
  maxPeople: number;
  desc: string;
  roomNumbers: { _id: string; number: number; unavailableDates: Date[] }[];
};
