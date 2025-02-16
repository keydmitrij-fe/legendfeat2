import { useState } from "react";
import "./App.css";
import Tabs from "./components/Tabs.jsx";
import TaskAdding from "./components/TaskAdding.jsx";

function App() {
  const [tab, setTab] = useState("all");

  function handleClick(tab) {
    setTab({ tab });
    console.log(tab);
  }

  return (
    <>
      <TaskAdding />
      <div className="tabs-container">
        <Tabs onSelect={() => handleClick("all")} title="Все" />
        <Tabs onSelect={() => handleClick("inWork")} title="В работе" />
        <Tabs onSelect={() => handleClick("done")} title="Сделано" />
      </div>
    </>
  );
}

export default App;
