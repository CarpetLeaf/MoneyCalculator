import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Fab,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./Rules.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  addDailyRule,
  addPeriodRule,
} from "../../app/store";

const Rules = () => {
  const [dailyExpensesModalOpen, setDailyExpensesModalOpen] = useState(false);
  const [periodChangesModalOpen, setPeriodChangesModalOpen] = useState(false);
  const [DESum, setDESum] = useState("");
  const [DEDesc, setDEDesc] = useState("");
  const [PCSum, setPCSum] = useState("");
  const [PCDate, setPCDate] = useState("");
  const [PCDesc, setPCDesc] = useState("");

  const useRulesDispatch = () => useDispatch<AppDispatch>();
  const useRulesSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useRulesDispatch();
  const rules = useRulesSelector((state) => state.rules);
  const isDarkMode = useRulesSelector((state) => state.darkMode.isDarkMode);

  const addDailyRuleHandler = () => {
    dispatch(addDailyRule({ sum: Number(DESum), description: DEDesc }));
    setDESum("");
    setDEDesc("");
    setDailyExpensesModalOpen(false);
  };

  const addPeriodRuleHandler = () => {
    dispatch(
      addPeriodRule({
        date: Number(PCDate),
        description: PCDesc,
        sum: Number(PCSum),
      }),
    );
    setPCSum("");
    setPCDate("");
    setPCDesc("");
    setPeriodChangesModalOpen(false);
  };

  const closeDailyExpensesModal = () => {
    setDailyExpensesModalOpen(false);
  };
  const closePeriodChangesModal = () => {
    setPeriodChangesModalOpen(false);
  };

  return (
    <div>
      <Typography variant="h3" sx={{
        color: isDarkMode ? '#fff' : '#000'
      }}>Rules</Typography>
      <div className={styles.rulesContainer}>
        <Accordion    
        sx={{
          backgroundColor: isDarkMode ? '#222' : 'white',
          color: isDarkMode ? 'white' : 'black',
          boxShadow: isDarkMode ? '0px 0px 2px 0px white' : '0px 0px 2px 0px black',
          svg: {
            color: isDarkMode ? 'white' : '#888'
          }
          }}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="daily-expenses-content"
            id="daily-expenses-header"
          >
            <Typography>Daily expenses</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List className={styles.list}>
              {rules ? (
                rules.dailyExpenses.map((el) => (
                  <ListItem>
                    <ListItemText
                      primary={el.sum}
                      secondary={`${el.description}`}
                      secondaryTypographyProps={{
                        color: isDarkMode ? '#ccc' : '#888'
                      }}
                    ></ListItemText>
                  </ListItem>
                ))
              ) : (
                <></>
              )}
            </List>
            <div className={styles.addRuleBtnWrapper}>
              <Fab color="primary" aria-label="add">
                <AddIcon onClick={() => setDailyExpensesModalOpen(true)} />
              </Fab>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{
          backgroundColor: isDarkMode ? '#222' : 'white',
          color: isDarkMode ? 'white' : 'black',
          boxShadow: isDarkMode ? '0px 0px 2px 0px white' : '0px 0px 2px 0px black',
          svg: {
            color: isDarkMode ? 'white' : '#888'
          },
      }}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="period-changes-content"
            id="period-changes-header"
          >
            <Typography>Period changes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List className={styles.list}>
              {rules ? (
                rules.periodChanges.map((el) => (
                  <ListItem>
                    <ListItemText
                      primary={el.sum}
                      secondary={`${el.date}th: ${el.description}`}
                      secondaryTypographyProps={{
                        color: isDarkMode ? '#ccc' : '#888'
                      }}
                    ></ListItemText>
                  </ListItem>
                ))
              ) : (
                <></>
              )}
            </List>
            <div className={styles.addRuleBtnWrapper}>
              <Fab color="primary" aria-label="add">
                <AddIcon onClick={() => setPeriodChangesModalOpen(true)} />
              </Fab>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <Modal
        open={dailyExpensesModalOpen}
        onClose={closeDailyExpensesModal}
        aria-labelledby="daily-expenses-title"
      >
        <Box className={styles.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <div className={styles.inputBlock}>
            <TextField
              label="Sum"
              variant="standard"
              value={DESum}
              onChange={(e) => setDESum(e.target.value)}
            />
            <TextField
              label="Description"
              variant="standard"
              value={DEDesc}
              onChange={(e) => setDEDesc(e.target.value)}
            />
          </div>
          <div className={styles.saveBtnWrapper}>
            <Button onClick={addDailyRuleHandler}>Save</Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={periodChangesModalOpen}
        onClose={closePeriodChangesModal}
        aria-labelledby="period-changes-title"
      >
        <Box className={styles.modal}>
          <div className={styles.inputBlock}>
            <TextField
              label="Sum"
              variant="standard"
              value={PCSum}
              onChange={(e) => setPCSum(e.target.value)}
            />
            <TextField
              label="Day of the month"
              variant="standard"
              value={PCDate}
              onChange={(e) => setPCDate(e.target.value)}
            />
            <TextField
              label="Description"
              variant="standard"
              value={PCDesc}
              onChange={(e) => setPCDesc(e.target.value)}
            />
          </div>
          <div className={styles.saveBtnWrapper}>
            <Button onClick={addPeriodRuleHandler}>Save</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Rules;
