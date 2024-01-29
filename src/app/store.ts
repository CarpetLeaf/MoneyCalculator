import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { mockRules } from "../data/mockData";
import { DateSumType, dailyExpensesType } from "../types/DateSumType";

const initialState: MoneyReducerType = {
  cash: {
    dollars: 0,
    cents: 0,
  },
};
type MoneyReducerType = {
  cash: {
    dollars: number;
    cents: number;
  };
};

const moneySlice = createSlice({
  name: "money",
  initialState,
  reducers: {
    addDollars: (state, action: PayloadAction<number>) => {
      state.cash.dollars += action.payload;
    },
    addCents: (state, action: PayloadAction<number>) => {
      state.cash.cents += action.payload;
    },
  },
});

type UserType = {
  name: string;
  sirname: string;
};
const usersDefault: UserType[] = [];
const usersSlice = createSlice({
  name: "users",
  initialState: usersDefault,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.push(action.payload);
    },
  },
});

const defaultDarkMode = {
  isDarkMode: false,
};
const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: defaultDarkMode,
  reducers: {
    switchMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

const rulesSlice = createSlice({
  name: "rules",
  initialState: mockRules,
  reducers: {
    addDailyRule: (state, action: PayloadAction<dailyExpensesType>) => {
      state.dailyExpenses = [
        ...state.dailyExpenses,
        { sum: action.payload.sum, description: action.payload.description },
      ];
    },
    addPeriodRule: (state, action: PayloadAction<DateSumType>) => {
      state.periodChanges = [
        ...state.periodChanges,
        {
          date: action.payload.date,
          description: action.payload.description,
          sum: action.payload.sum,
        },
      ];
    },
  },
});

export const newStore = configureStore({
  reducer: {
    money: moneySlice.reducer,
    users: usersSlice.reducer,
    darkMode: darkModeSlice.reducer,
    rules: rulesSlice.reducer,
  },
});

export const { addDailyRule, addPeriodRule } = rulesSlice.actions;
export const { switchMode } = darkModeSlice.actions;
export const { addDollars, addCents } = moneySlice.actions;
export const { addUser } = usersSlice.actions;
export type AppDispatch = typeof newStore.dispatch;
export type RootState = ReturnType<typeof newStore.getState>;
