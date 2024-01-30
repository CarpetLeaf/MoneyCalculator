import { DataType } from "../types/DateSumType";

export const mockRules: DataType = {
  periodChanges: [
    {
      date: 10,
      sum: 10000,
      description: "Аванс",
    },
    {
      date: 25,
      sum: 50000,
      description: "Зарплата",
    },
    {
      date: 1,
      sum: -20000,
      description: "Аренда",
    },
  ],
  dailyExpenses: [
    {
      sum: -500,
      description: "Еда",
    },
  ],
};

export const mockProfile = {
  name: "Name",
  lastname: "Lastname",
  avatarUrl: "public/Picture1.png",
};
