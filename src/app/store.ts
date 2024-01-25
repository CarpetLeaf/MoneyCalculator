import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

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
  isDarkMode: true
}
const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: defaultDarkMode,
  reducers: {
    switchMode: (state) => {
      state.isDarkMode = !state.isDarkMode
    }
  }
})

export const newStore = configureStore({
  reducer: {
    money: moneySlice.reducer,
    users: usersSlice.reducer,
    darkMode: darkModeSlice.reducer
  },
});

export const {switchMode} = darkModeSlice.actions;
export const { addDollars, addCents } = moneySlice.actions;
export const { addUser } = usersSlice.actions;
export type AppDispatch = typeof newStore.dispatch;
export type RootState = ReturnType<typeof newStore.getState>;
