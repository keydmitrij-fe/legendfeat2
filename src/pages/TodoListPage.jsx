import { useState, useEffect } from "react";
// import {Todo} from "./api/interface.ts"
import { fetchTasks } from "../api/api.js";
import "./TodoListPage.css";
import Tabs from "../components/Tabs/Tabs.jsx";
import TaskAdding from "../components/TaskAdding/TaskAdding.jsx";
import Task from "../components/Tasks/Tasks.jsx";

export default function TodoListPage() {
  const [tab, setTab] = useState("all");
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [quant, setQuant] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks(tab, setTasks, setQuant);
  }, [tab]);

  const handleClick = (tab) => {
    setTab(tab);
  };

  const handleAdd = () => {
    setIsAdd(!isAdd);
    fetchTasks(tab, setTasks, setQuant);
  };

  const handleDelete = () => {
    setIsDelete(!isDelete);
    fetchTasks(tab, setTasks, setQuant);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
    fetchTasks(tab, setTasks, setQuant);
  };

  return (
    <>
      <TaskAdding onUpdate={handleAdd} />
      <div className="tabs-container">
        <Tabs tabId={tab} quant={quant} onSelect={handleClick} />
      </div>
      <div>
        <Task
          tasks={tasks}
          onUpdateStatus={handleEdit}
          onUpdate={handleEdit}
          onDelete={handleDelete}
          tabId={tab}
        />
      </div>
    </>
  );
}
