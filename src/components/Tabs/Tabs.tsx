import { Button } from "antd";
import { TodoInfo } from "../../api/interface";
import "./Tabs.css";

const Tabs: React.FC<{
  onSelect: (tab: "all" | "completed" | "inWork") => void;
  tabId: string;
  quantityTasks: TodoInfo;
}> = (props) => {
  return (
    <>
      <Button onClick={() => props.onSelect("all")} type="text">
        Все ({props.quantityTasks.all})
      </Button>
      <Button onClick={() => props.onSelect("inWork")} type="text">
        В работе ({props.quantityTasks.inWork})
      </Button>
      <Button onClick={() => props.onSelect("completed")} type="text">
        Сделано ({props.quantityTasks.completed})
      </Button>
    </>
  );
};

export default Tabs;
