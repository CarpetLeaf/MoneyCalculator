import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import styles from './MainPage.module.scss';
import { DataType } from '../../types/DateSumType';

const MainPage = () => {
  const [selectedDate, handleDateChange] = React.useState(dayjs());
  const [calculatedBalance, setCalculatedBalance] = useState(0);
  const [currBalance, setCurrBalance] = useState(0);

  const mockData: DataType = {
    periodChanges: [
        {
            date: 10,
            sum: 10000
        },
        {
            date: 25,
            sum: 50000
        },
        {
            date: 1,
            sum: -20000
        },
    ],
    dailyExpenses: [
        {
            sum: -500
        }
    ]
  }
  console.log(mockData);

  const calculateBalance = () => {
    const startDate = dayjs();
    const endDate = selectedDate;
    console.log(startDate, endDate)
    let balance = currBalance;
    let day = startDate;
    while (day.valueOf() <= endDate.valueOf()) {
        console.log('day: ', day)
        mockData.dailyExpenses.forEach(sum => {
            balance+=sum.sum
        })
        mockData.periodChanges.forEach(el => {
            if(day.day() === el.date)
                balance += el.sum;
        })
        day = day.add(1, 'day')
    }
    console.log('balance: ', balance)
    setCalculatedBalance(balance);
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} style={{ marginTop: '2rem', padding: '2rem' }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Calculate Your Balance
          </Typography>
          <Box my={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={selectedDate}
                onChange={(e) => handleDateChange(e ?? dayjs())}
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
        </Paper>
      </Container>
    </>
  );
};

export default MainPage;