import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import classes from ".//RootLayout.module.css";

const RootLayout: React.FC = () => {
  return (
    <>
      <section className={classes.menu}>
        <Navigation />
      </section>
      <section className={classes.main}>
        <Outlet />
      </section>
    </>
  );
};

export default RootLayout;
