import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { JSX } from "react";

const PrivateRoute: React.FC<{ children: JSX.Element }> = (props) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return isAuth ? props.children : <Navigate to="/auth" />;
};

export default PrivateRoute;
