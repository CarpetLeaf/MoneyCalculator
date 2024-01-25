import { useNavigate } from "react-router-dom";
import { AppBar, FormControlLabel, Switch, Toolbar, Typography } from "@mui/material";
import styles from './Header.module.scss';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, switchMode } from "../../app/store";

const Header = () => {
    const navigate = useNavigate();
    const useAppDispatch = () => useDispatch<AppDispatch>();
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
    const dispatch = useAppDispatch();

      const handleSwitch = () => {
        dispatch(switchMode())
      }

  return (
    <AppBar position="static" className={styles.appBar}>
    <Toolbar className={styles.wrapper}>
      <Typography
        onClick={() => navigate('/mainPage')} 
        variant="h6"
      >
        Balance Calculator
      </Typography>
      <FormControlLabel
        control={<Switch sx={{ m: 1 }} color="primary" checked={isDarkMode} onChange={handleSwitch}/>}
        label="Dark mode"
        labelPlacement="start"
      />
    </Toolbar>
  </AppBar>
  );
};

export default Header;
