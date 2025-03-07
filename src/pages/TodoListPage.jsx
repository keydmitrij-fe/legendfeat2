import { useState, useEffect } from "react";
// import {Todo} from "./api/interface.ts"
import { fetchTasks } from "../api/api.js";
import "./TodoListPage.css";
import Tabs from "../components/Tabs/Tabs.jsx";
import TaskAdding from "../components/TaskAdding/TaskAdding.jsx";
import Tasks from "../components/Tasks/Tasks.jsx";

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

  const handleUpdateTaskList = () => {
    fetchData();
  };

  return (
    <>
      <TaskAdding onUpdate={handleUpdateTaskList} />
      <div className="tabs-container">
        <Tabs tabId={tab} quantityTasks={quantityTasks} onSelect={handleClick} />
      </div>
      <div>
        <Tasks
          tasks={tasks}
          onUpdateStatus={handleUpdateTaskList}
          onUpdate={handleUpdateTaskList}
          onDelete={handleUpdateTaskList}
          tabId={tab}
        />
      </div>
    </>
  );
}
