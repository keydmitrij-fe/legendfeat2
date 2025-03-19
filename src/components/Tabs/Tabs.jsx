import "./Tabs.css";

export default function Tabs(props) {
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
}
