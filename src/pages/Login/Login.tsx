import { Button, TextField } from "@mui/material";
import styles from "./Login.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    const response = await axiosInstance.login(username, password);
    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      navigate("/mainPage");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBlock}>
        <TextField
          required
          id="standard-basic"
          label="Username"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          className={styles.loginBtn}
          onClick={() => login(username, password)}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default Login;
