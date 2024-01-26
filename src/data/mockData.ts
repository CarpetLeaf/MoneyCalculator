import { DataType } from "../types/DateSumType";

export const mockRules: DataType = {
  periodChanges: [
    {
      date: 10,
      sum: 10000,
    },
    {
      date: 25,
      sum: 50000,
    },
    {
      date: 1,
      sum: -20000,
    },
  ],
  dailyExpenses: [
    {
      sum: -500,
    },
  ],
};

export const mockProfile = {
  name: "Name",
  lastname: "Lastname",
  avatarUrl: "public/Picture1.png",
};
