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
  Popover,
  TextField,
  Typography,
  styled,
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
  uploadRules,
} from "../../app/store";
import DownloadIcon from "@mui/icons-material/Download";
import dayjs from "dayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InfoIcon from "../../assets/icons/info-icon";
import { primaryDark, primaryLight } from "../../theming/theme";
import classNames from "classnames";

const Rules = () => {
  const [dailyExpensesModalOpen, setDailyExpensesModalOpen] = useState(false);
  const [periodChangesModalOpen, setPeriodChangesModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
  const [infoText, setInfoText] = useState("");
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

  const openInfo = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeDailyExpensesModal = () => {
    setDailyExpensesModalOpen(false);
  };
  const closePeriodChangesModal = () => {
    setPeriodChangesModalOpen(false);
  };

  const downloadRules = () => {
    const file = JSON.stringify(rules);
    const blob = new Blob([file], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const currTime = dayjs();
    link.download = `Rules_${currTime.valueOf()}`;
    document.getElementById("headerLineId")!.appendChild(link);
    link.click();
    document.getElementById("headerLineId")!.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const fileUploadHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (result) {
        dispatch(uploadRules(JSON.parse(result.toString())));
      }
    };
    reader.readAsText(event.target.files![0]);
  };

  const open = Boolean(anchorEl);
  const dailyInfo =
    "Эти правила означают ваши ежеденвные траты. Например расходы на еду, бензин и т.д.";
  const periodInfo =
    "Эти правила означают ваши периодические траты/доходы. Например зарплата, арендная плата и т.д.";

  return (
    <div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>{infoText}</Typography>
      </Popover>
      <div className={styles.headerLine} id="headerLineId">
        <Typography
          variant="h3"
          sx={{
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          Rules
        </Typography>
        <div className={styles.rightElements}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              accept=".json"
              onChange={(e) => fileUploadHandler(e)}
            />
          </Button>
          <DownloadIcon
            fontSize="large"
            className={classNames(
              styles.downloadIcon,
              isDarkMode ? styles.darkIcon : "",
            )}
            onClick={downloadRules}
          ></DownloadIcon>
        </div>
      </div>
      <div className={styles.rulesContainer}>
        <Accordion
          sx={{
            backgroundColor: isDarkMode ? "#222" : "white",
            color: isDarkMode ? "white" : "black",
            boxShadow: isDarkMode
              ? "0px 0px 2px 0px white"
              : "0px 0px 2px 0px black",
            svg: {
              color: isDarkMode ? "white" : "#888",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="daily-expenses-content"
            id="daily-expenses-header"
            sx={{
              img: {
                marginLeft: "10px",
              },
            }}
          >
            <Typography>Daily expenses</Typography>
            <InfoIcon
              color={isDarkMode ? primaryLight : primaryDark}
              onClick={(e) => {
                openInfo(e);
                setInfoText(dailyInfo);
              }}
            />
          </AccordionSummary>
          <AccordionDetails
            sx={{
              svg: {
                color: "white",
              },
            }}
          >
            <List className={styles.list}>
              {rules.dailyExpenses.length ? (
                rules.dailyExpenses.map((el) => (
                  <ListItem>
                    <ListItemText
                      primary={el.sum}
                      secondary={`${el.description}`}
                      secondaryTypographyProps={{
                        color: isDarkMode ? "#ccc" : "#888",
                      }}
                    ></ListItemText>
                  </ListItem>
                ))
              ) : (
                <Typography>Данных нет</Typography>
              )}
            </List>
            <div className={styles.addRuleBtnWrapper}>
              <Fab color="primary" aria-label="add">
                <AddIcon onClick={() => setDailyExpensesModalOpen(true)} />
              </Fab>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            backgroundColor: isDarkMode ? "#222" : "white",
            color: isDarkMode ? "white" : "black",
            boxShadow: isDarkMode
              ? "0px 0px 2px 0px white"
              : "0px 0px 2px 0px black",
            svg: {
              color: isDarkMode ? "white" : "#888",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="period-changes-content"
            id="period-changes-header"
            sx={{
              img: {
                marginLeft: "10px",
              },
            }}
          >
            <Typography>Period changes</Typography>
            <InfoIcon
              color={isDarkMode ? primaryLight : primaryDark}
              onClick={(e) => {
                openInfo(e);
                setInfoText(periodInfo);
              }}
            />
          </AccordionSummary>
          <AccordionDetails
            sx={{
              svg: {
                color: "white",
              },
            }}
          >
            <List className={styles.list}>
              {rules.periodChanges.length ? (
                rules.periodChanges.map((el) => (
                  <ListItem>
                    <ListItemText
                      primary={el.sum}
                      secondary={`${el.date}th: ${el.description}`}
                      secondaryTypographyProps={{
                        color: isDarkMode ? "#ccc" : "#888",
                      }}
                    ></ListItemText>
                  </ListItem>
                ))
              ) : (
                <Typography>Данных нет</Typography>
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
