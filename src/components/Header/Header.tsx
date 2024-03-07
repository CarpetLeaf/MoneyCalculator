import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  FormControlLabel,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import styles from "./Header.module.scss";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, switchMode } from "../../app/store";
import { useEffect, useState } from "react";
import { mockProfile } from "../../data/mockData";
import { themeSecondary } from "../../theming/theme";

const Header = () => {
  const navigate = useNavigate();
  const useAppDispatch = () => useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [currPage, setCurrPage] = useState(useLocation().pathname);

  const userData = mockProfile;

  const handleSwitch = () => {
    dispatch(switchMode());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateProfile = () => {
    handleClose();
    setCurrPage("/profile");
    navigate("/profile");
  };

  const navigateRules = () => {
    handleClose();
    setCurrPage("/rules");
    navigate("/rules");
  };

  const handleExpandUser = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setAnchorEl(e.currentTarget);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("accessToken");
    setCurrPage("/login");
    navigate("/login");
  };

  useEffect(() => {
    if (currPage === "/") {
      setCurrPage("/mainPage");
      navigate("/mainPage");
    }
  }, [currPage, navigate]);

  return (
    <AppBar position="static" className={styles.appBar}>
      <Toolbar className={styles.wrapper}>
        <Typography
          onClick={() => navigate("/mainPage")}
          variant="h6"
          className={styles.headerMain}
        >
          Balance Calculator
        </Typography>
        <div className={styles.rightElements}>
          <ThemeProvider theme={themeSecondary}>
            <FormControlLabel
              control={
                <Switch
                  sx={{ m: 1 }}
                  color="primary"
                  checked={isDarkMode}
                  onChange={handleSwitch}
                />
              }
              label="Dark mode"
              labelPlacement="start"
            />
          </ThemeProvider>
          <Avatar
            onClick={(e) => handleExpandUser(e)}
            src={userData.avatarUrl}
            className={styles.avatar}
          >
            {userData.name[0]}
            {userData.lastname[0]}
          </Avatar>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={navigateProfile}>Profile</MenuItem>
            <MenuItem onClick={navigateRules}>My rules</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
