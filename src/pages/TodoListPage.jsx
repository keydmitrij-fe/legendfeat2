import { useState, useEffect } from "react";
// import {Todo} from "./api/interface.ts"
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
  
    let input = document.getElementById("main-input");
    
    async function fetchTasks() {
      const response = await fetch(
        "https://easydev.club/api/v2//todos?filter=" + `${tab}`
      );
      const resData = await response.json();
      setTasks(resData.data);
    }
  
    async function fetchQuantityTasks(tab) {
        const response = await fetch(
          "https://easydev.club/api/v2//todos?filter=" + `${tab}`
        );
        const resData = await response.json();
        setQuant(resData.info)
      }
  
    useEffect(() => {
          fetchTasks(tab)
          fetchQuantityTasks(tab);
        } ,[tab])
    
    const handleClick = (tab) => {
      setTab(tab);
      fetchQuantityTasks(tab);
    }
  
    const handleAdd = () => {
      setIsAdd(!isAdd)
      fetchQuantityTasks(tab);
      fetchTasks();
    }
  
    const handleDelete = () => {
      setIsDelete(!isDelete)
      fetchQuantityTasks(tab);
      fetchTasks();
    }
  
    const handleEdit = () => {
      setIsEdit(!isEdit);
      fetchQuantityTasks(tab);
      fetchTasks()
    }
  
    return (
        <>
        <TaskAdding mainInput={input} onUpdate={handleAdd}/>
        <div className="tabs-container">
          <Tabs tabId={tab} quant={quant.all} highlight={tab === "all" ? "tab selected" : "tab"} onSelect={() => handleClick("all")} title="Все" />
          <Tabs tabId={tab} quant={quant.inWork} highlight={tab === "inWork" ? "tab selected" : "tab"} onSelect={() => handleClick("inWork")} title="В работе" />
          <Tabs tabId={tab} quant={quant.completed} highlight={tab === "completed" ? "tab selected" : "tab"} onSelect={() => handleClick("completed")} title="Сделано" />
        </div>
        <div>
          <Task tasks={tasks} updateTaskList={fetchTasks} mainInput={input} onUpdateEdit={handleEdit} onUpdate={handleDelete} isEdit={isEdit} isDelete={isDelete} isAdd={isAdd} tabId={tab} />
        </div>
      </>
    );
}