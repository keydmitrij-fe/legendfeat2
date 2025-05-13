import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store";

const AuthLayout: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <>
      {isAuth && <Navigate to="/" />}
      {!isAuth && <Outlet />}
    </>
  );
};

export default AuthLayout;
