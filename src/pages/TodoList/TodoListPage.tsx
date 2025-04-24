import { useState, useEffect, useCallback } from "react";
import { Filter, MetaResponse, Todo, TodoInfo } from "../../api/interface.ts";
import { fetchTasks } from "../../api/api.ts";
import "./TodoListPage.css";
import Tabs from "../../components/Tabs/Tabs.tsx";
import TaskAdding from "../../components/TaskAdding/TaskAdding.tsx";
import Tasks from "../../components/Tasks/Tasks.tsx";

const TodoListPage: React.FC = () => {
  const [tab, setTab] = useState<Filter>("all");
  const [quantityTasks, setQuantityTasks] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [tasks, setTasks] = useState<Todo[]>([]);

  const fetchData = useCallback(async () => {
    const resData: MetaResponse<Todo, TodoInfo> = await fetchTasks(tab);
    setTasks(resData.data);
    setQuantityTasks(resData.info!);
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
    <div>
      <TaskAdding onUpdate={fetchData} />
      <div className="tabs-container">
        <Tabs quantityTasks={quantityTasks} onSelect={handleClick} />
      </div>
      <div>
        <Tasks tasks={tasks} onUpdate={fetchData} />
      </div>
    </div>
  );
};

export default TodoListPage;
