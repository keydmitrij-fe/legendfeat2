import { Outlet } from "react-router-dom";
import { Image } from "antd";
import classes from "../../pages/Authorization/Authorization.module.css";
import authImage from "../../assets/images/illustration.png";
import logo from "../../assets/logo.png";

const AuthLayout: React.FC = () => {
  return (
    <div className={classes.layout}>
      <Image
        preview={false}
        style={{ maxHeight: "100vh" }}
        src={authImage}
        alt=""
      />
      <section className={classes.form}>
        <div className={classes.logoContainer}>
          <Image preview={false} width={50} src={logo} />
        </div>
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;
