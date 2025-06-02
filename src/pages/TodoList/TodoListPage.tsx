import { useState, useEffect, useCallback } from "react";
import { Filter, MetaResponse, Todo, TodoInfo } from "../../types/todoTypes.ts";
import { fetchTasks } from "../../api/todoApi.ts";
import "./TodoListPage.css";
import Tabs from "../../components/Tabs/Tabs.tsx";
import TaskAdding from "../../components/TaskAdding/TaskAdding.tsx";
import Tasks from "../../components/Tasks/Tasks.tsx";
import { Layout } from "antd";

const layoutStyle: React.CSSProperties = {
  justifyContent: "center",
  borderRadius: 8,
  maxWidth: "30%",
  marginLeft: "30rem",
  overflow: "hidden",
  width: "auto",
  background: "#fff",
};

const TodoListPage: React.FC = () => {
  const [tab, setTab] = useState<Filter>("all");
  const [quantityTasks, setQuantityTasks] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [tasks, setTasks] = useState<Todo[]>([]);

  const fetchData = useCallback(async () => {
    const resData: MetaResponse<Todo, TodoInfo> | unknown = await fetchTasks(
      tab
    );
    if (
      resData &&
      typeof resData === "object" &&
      "data" in resData &&
      "info" in resData
    ) {
      const typedResData = resData as MetaResponse<Todo, TodoInfo>;
      setTasks(typedResData.data);
      setQuantityTasks(typedResData.info!);
    }
  }, [tab]);

  useEffect(() => {
    let intervalId = setInterval(fetchData, 5000);
    fetchData();
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, [tab]);

  const handleClick = useCallback((tab: Filter) => {
    setTab(tab);
  }, []);

  return (
    <Layout style={layoutStyle}>
      <TaskAdding onUpdate={fetchData} />
      <div className="tabs-container">
        <Tabs quantityTasks={quantityTasks} onSelect={handleClick} />
      </div>
      <div>
        <Tasks tasks={tasks} onUpdate={fetchData} />
      </div>
    </Layout>
  );
};

export default TodoListPage;
