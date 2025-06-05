import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { RootState } from "../../store";

type MenuItem = Required<MenuProps>["items"][number];

const SiderMenu: React.FC = () => {
  const location = useLocation();
  const profileRoles = useSelector((state: RootState) => state.profile.roles);

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

  if (profileRoles.includes("ADMIN") || profileRoles.includes("MODERATOR")) {
    items.push({
      label: <NavLink to="/users">Пользователи</NavLink>,
      key: "/users",
    });
  }

  return (
    <Menu
      style={{ width: 150 }}
      mode="vertical"
      selectedKeys={[location.pathname]}
      items={items}
    />
  );
};

export default SiderMenu;
