import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import styles from "./MainPage.module.scss";
import { LineChart } from "@mui/x-charts";
import { RootState } from "../../app/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const MainPage = () => {
  const [selectedDate, handleDateChange] = useState(dayjs());
  const [calculatedBalance, setCalculatedBalance] = useState(0);
  const [currBalance, setCurrBalance] = useState(0);
  const [timeAxis, setTimeAxis] = useState<string[]>([]);
  const [balanceAxis, setBalanceAxis] = useState<number[]>([]);

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const data = useAppSelector((state) => state.rules);

  const calculateBalance = () => {
    const localTimeAxis: string[] = [];
    const localBalanceAxis: number[] = [];
    setBalanceAxis([]);
    const startDate = dayjs();
    const endDate = selectedDate;
    let balance = currBalance;
    for (
      let day = startDate;
      day.valueOf() <= endDate.valueOf();
      day = day.add(1, "day")
    ) {
      data.dailyExpenses.forEach((sum) => {
        balance += sum.sum;
      });
      data.periodChanges.forEach((el) => {
        if (day.get("D") === el.date) balance += el.sum;
      });
      localTimeAxis.push(day.format("DD.MM.YYYY"));
      localBalanceAxis.push(balance);
    }
    setTimeAxis(localTimeAxis);
    setBalanceAxis(localBalanceAxis);
    setCalculatedBalance(balance);
  };

  return (
    <div className={isDarkMode ? styles.wrapperDark : styles.wrapper}>
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={3}
          style={{ marginTop: "2rem", padding: "2rem" }}
          className={isDarkMode ? styles.paperDark : styles.wrapper}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Calculate Your Balance
          </Typography>
          <Box my={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={(e) => handleDateChange(e ?? dayjs())}
                sx={{
                  input: {
                    color: isDarkMode ? "white" : "black",
                  },
                  svg: {
                    color: isDarkMode ? "white" : "#888",
                  },
                  fieldset: {
                    borderColor: isDarkMode ? "white" : "#aaa",
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box my={3}>
            <TextField
              label="Current Balance"
              variant="outlined"
              fullWidth
              value={currBalance}
              onChange={(e) => setCurrBalance(Number(e.target.value))}
              className={styles.textField}
              sx={{
                input: {
                  color: isDarkMode ? "white" : "black",
                },
                fieldset: {
                  borderColor: isDarkMode ? "white" : "#aaa",
                },
                label: {
                  color: isDarkMode ? "white" : "#aaa",
                },
              }}
            />
          </Box>
          <Box my={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => calculateBalance()}
              className={styles.button}
            >
              Calculate
            </Button>
          </Box>
          <Typography variant="h6" gutterBottom>
            Calculated Balance: {calculatedBalance}
          </Typography>
          {balanceAxis.length > 0 && (
            <div>
              <Typography variant="h5" component="h1" gutterBottom>
                Balance change chart
              </Typography>
              <LineChart
                xAxis={[{ data: timeAxis, scaleType: "point" }]}
                series={[
                  {
                    data: balanceAxis,
                  },
                  {
                    data: [
                      0,
                      ...timeAxis.slice(0, timeAxis.length - 2).map(() => null),
                      0,
                    ],
                    connectNulls: true,
                    color: "grey",
                  },
                ]}
                width={500}
                height={300}
              />
            </div>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default MainPage;
