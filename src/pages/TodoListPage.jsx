import { useState, useEffect } from "react";
// import {Todo} from "./api/interface.ts"
import { fetchTasks } from "../api/api.js";
import "./TodoListPage.css";
import Tabs from "../components/Tabs/Tabs.jsx";
import TaskAdding from "../components/TaskAdding/TaskAdding.jsx";
import Tasks from "../components/Tasks/Tasks.jsx";

const MINIMAL_TASK_LENGTH = 2;
const MAXIMAL_TASK_LENGTH = 64;

export default function TodoListPage() {
  const [tab, setTab] = useState("all");
  const [quantityTasks, setQuantityTasks] = useState({});
  const [tasks, setTasks] = useState([]);

  async function fetchData() {
    const resData = await fetchTasks(tab);
    setTasks(resData.data);
    setQuantityTasks(resData.info);
  }

  useEffect(() => {
    fetchData();
  }, [tab]);

  const handleClick = (tab) => {
    setTab(tab);
  };

  const updateTaskList = async () => {
    await fetchData();
  };

  return (
    <>
      <TaskAdding
        minimalLength={MINIMAL_TASK_LENGTH}
        maximalLength={MAXIMAL_TASK_LENGTH}
        onUpdate={updateTaskList}
      />
      <div className="tabs-container">
        <Tabs
          tabId={tab}
          quantityTasks={quantityTasks}
          onSelect={handleClick}
        />
      </div>
      <div>
        <Tasks
          minimalLength={MINIMAL_TASK_LENGTH}
          maximalLength={MAXIMAL_TASK_LENGTH}
          tasks={tasks}
          onUpdate={updateTaskList}
          tabId={tab}
        />
      </div>
    </>
  );
}
