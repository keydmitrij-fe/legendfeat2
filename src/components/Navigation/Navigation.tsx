import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <NavLink to="/">Список задач</NavLink>,
    key: "todoList",
  },
  {
    label: <NavLink to="/profile">Профиль</NavLink>,
    key: "profile",
  },
];

const Navigation: React.FC = () => {
  const [current, setCurrent] = useState("todoList");

  const onSelect: MenuProps["onClick"] = (event) => {
    setCurrent(event.key);
  };
  return (
    <Menu
      style={{ width: 150 }}
      onClick={onSelect}
      mode="vertical"
      selectedKeys={[current]}
      items={items}
    />
  );
};

export default Navigation;
