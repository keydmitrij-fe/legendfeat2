import { useState, useEffect, useCallback } from "react";
import { Filter, MetaResponse, Todo, TodoInfo } from "../../types/todoTypes.ts";
import { fetchTasks } from "../../api/todoApi.ts";
import "./TodoListPage.css";
import Tabs from "../../components/Tabs/Tabs.tsx";
import TaskAdding from "../../components/TaskAdding/TaskAdding.tsx";
import Tasks from "../../components/Tasks/Tasks.tsx";
import { Layout } from "antd";
import { useQuery } from "@tanstack/react-query";

const layoutStyle: React.CSSProperties = {
  justifyContent: "center",
  borderRadius: 8,
  maxWidth: "30%",
  marginLeft: "30rem",
  overflow: "hidden",
  width: "auto",
  background: "#fff",
};
const emptyTaskQuantity = {
  all: 0,
  completed: 0,
  inWork: 0,
};

const TodoListPage: React.FC = () => {
  const [tab, setTab] = useState<Filter>("all");

  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(tab),
    refetchInterval: 5000,
  });

  const handleClick = useCallback((tab: Filter) => {
    setTab(tab);
  }, []);

  return (
    <Layout style={layoutStyle}>
      <TaskAdding />
      <div className="tabs-container">
        <Tabs
          quantityTasks={tasks?.info ?? emptyTaskQuantity}
          onSelect={handleClick}
        />
      </div>
      <div>
        <Tasks tasks={tasks?.data ?? []} />
      </div>
    </Layout>
  );
};

export default TodoListPage;
