import { useState, useEffect } from "react";
import "./App.css";
import Tabs from "./components/Tabs.jsx";
import TaskAdding from "./components/TaskAdding.jsx";
import Task from "./components/Tasks.jsx";

function App() {
  const [tab, setTab] = useState("all");


  function handleClick(tab) {
    setTab(tab);
  }
  console.log(tab);



  return (
    <>
      <TaskAdding />
      <div className="tabs-container">
        <Tabs onSelect={() => handleClick("all")} title="Все" />
        <Tabs onSelect={() => handleClick("inWork")} title="В работе" />
        <Tabs onSelect={() => handleClick("completed")} title="Сделано" />
      </div>
      <div>
        <Task tabId={tab}/>
      </div>
    </>
  );
}

export default App;
