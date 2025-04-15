import { useState, useEffect } from "react";
import { MetaResponse, Todo, TodoInfo } from "../../api/interface.ts";
import { fetchTasks } from "../../api/api.ts";
import "./TodoListPage.css";
import Tabs from "../../components/Tabs/Tabs.tsx";
import TaskAdding from "../../components/TaskAdding/TaskAdding.tsx";
import Tasks from "../../components/Tasks/Tasks.tsx";

const TodoListPage: React.FC = () => {
  const [tab, setTab] = useState<"all" | "completed" | "inWork">("all");
  const [quantityTasks, setQuantityTasks] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [tasks, setTasks] = useState<Todo[]>([]);

  async function fetchData() {
    const resData: MetaResponse<Todo, TodoInfo> = await fetchTasks(tab);
    setTasks(resData.data);
    console.log(resData);
    setQuantityTasks(resData.info!);
  }

  useEffect(() => {
    let intervalId = setInterval(fetchData, 5000);
    fetchData();
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, [tab]);

  const handleClick = (tab: "all" | "completed" | "inWork") => {
    setTab(tab);
  };

  const updateTaskList = async () => {
    await fetchData();
  };

  return (
    <div>
      <TaskAdding onUpdate={updateTaskList} />
      <div className="tabs-container">
        <Tabs
          tabId={tab}
          quantityTasks={quantityTasks}
          onSelect={handleClick}
        />
      </div>
      <div>
        <Tasks tasks={tasks} onUpdate={updateTaskList} />
      </div>
    </div>
  );
};

export default TodoListPage;
