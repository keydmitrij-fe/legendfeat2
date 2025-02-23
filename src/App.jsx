import { useState, useEffect } from "react";
import "./App.css";
import Tabs from "./components/Tabs.jsx";
import TaskAdding from "./components/TaskAdding.jsx";
import Task from "./components/Tasks.jsx";

function App() {
  const [tab, setTab] = useState("all");
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [quant, setQuant] = useState({});

  useEffect(() => {
      async function fetchQuantityTasks(tab) {
          const response = await fetch(
            "https://easydev.club/api/v2//todos?filter=" + `${tab}`
          );
          const resData = await response.json();
          setQuant(resData.info)
        }
        fetchQuantityTasks(tab);
      } ,[tab, isAdd, isDelete])
  
  function handleClick(tab) {
    setTab(tab);
  }
  console.log(tab);

  const handleAdd = () => {
    setIsAdd(!isAdd)
  }

  const handleDelete = () => {
    setIsDelete(!isDelete)
  }

  return (
    <>
      <TaskAdding onUpdate={handleAdd}/>
      <div className="tabs-container">
        <Tabs tabId={tab} quant={quant.all} highlight={tab === "all" ? "tab selected" : "tab"} onSelect={() => handleClick("all")} title="Все" />
        <Tabs tabId={tab} quant={quant.inWork} highlight={tab === "inWork" ? "tab selected" : "tab"} onSelect={() => handleClick("inWork")} title="В работе" />
        <Tabs tabId={tab} quant={quant.completed} highlight={tab === "completed" ? "tab selected" : "tab"} onSelect={() => handleClick("completed")} title="Сделано" />
      </div>
      <div>
        <Task onUpdate={handleDelete} isDelete={isDelete} isAdd={isAdd} tabId={tab} />
      </div>
    </>
  );
}

export default App;
