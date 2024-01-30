export type DateSumType = {
  date: number;
  sum: number;
  description: string;
};

export type dailyExpensesType = {
  sum: number;
  description: string;
};

export type DataType = {
  dailyExpenses: dailyExpensesType[];
  periodChanges: DateSumType[];
};
