import { Fab } from "@mui/material";
import { mockRules } from "../../data/mockData";
import styles from "./Rules.module.scss";
import AddIcon from "@mui/icons-material/Add";

const Rules = () => {
  const myRules = mockRules;
  console.log(myRules);

  return (
    <div className={styles.wrapper}>
      <h1>Rules</h1>
      <div className={styles.rulesContainer}>
        <div>
          <h2>Daily expenses</h2>
          {myRules.dailyExpenses.map((el) => {
            return <li>{el.sum}</li>;
          })}
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
        <div>
          <h2>Period changes</h2>
          {mockRules.periodChanges.map((el) => (
            <li>
              {el.date}: {el.sum}
            </li>
          ))}
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default Rules;
