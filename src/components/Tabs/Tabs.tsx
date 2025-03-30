import { TodoInfo } from "../../api/interface";
import "./Tabs.css";

const Tabs: React.FC<{
  onSelect: (tab: "all" | "completed" | "inWork") => void;
  tabId: string;
  quantityTasks: TodoInfo;
}> = (props) => {
  return (
    <>
      <button
        onClick={() => props.onSelect("all")}
        className={props.tabId === "all" ? "tab selected" : "tab"}
      >
        Все ({props.quantityTasks.all})
      </button>
      <button
        onClick={() => props.onSelect("inWork")}
        className={props.tabId === "inWork" ? "tab selected" : "tab"}
      >
        В работе ({props.quantityTasks.inWork})
      </button>
      <button
        onClick={() => props.onSelect("completed")}
        className={props.tabId === "completed" ? "tab selected" : "tab"}
      >
        Сделано ({props.quantityTasks.completed})
      </button>
    </>
  );
};

export default Tabs;
