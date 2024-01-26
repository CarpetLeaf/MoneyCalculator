export type DateSumType = {
  date: number;
  sum: number;
};

export type dailyExpensesType = {
  sum: number;
};

export type DataType = {
  dailyExpenses: dailyExpensesType[];
  periodChanges: DateSumType[];
};
