import { Outlet } from "react-router-dom";
import Header from "../Header";
import styles from "./Layout.module.scss";
import classNames from "classnames";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Layout = () => {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const theme = useAppSelector((state) => state.darkMode);

  return (
    <div
      className={classNames(
        styles.wrapper,
        theme.isDarkMode ? styles.wrapperDark : "",
      )}
    >
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
