import { Menu } from "antd";
import type { MenuProps } from "antd";
import { NavLink, useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const Navigation: React.FC = () => {
  const location = useLocation();

  const items: MenuItem[] = [
    {
      label: <NavLink to="/">Список задач</NavLink>,
      key: "/",
    },
    {
      label: <NavLink to="/profile">Личный кабинет</NavLink>,
      key: "/profile",
    },
  ];

  return (
    <Menu
      style={{ width: 150 }}
      mode="vertical"
      selectedKeys={[location.pathname]}
      items={items}
    />
  );
};

export default Navigation;
