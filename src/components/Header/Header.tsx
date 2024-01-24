import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <span onClick={() => navigate('/testPage')}>Main</span>
    </div>
  );
};

export default Header;
