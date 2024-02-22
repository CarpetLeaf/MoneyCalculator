import { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [isAuth] = useState(localStorage.getItem("accessToken"));
  if (!isAuth) return <Navigate to="/login" />;
  return <>{children}</>;
};

export default PrivateRoute;
