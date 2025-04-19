import { Button } from "antd";
import { TodoInfo } from "../../api/interface";
import "./Tabs.css";
import { memo } from "react";

const Tabs: React.FC<{
  onSelect: (tab: "all" | "completed" | "inWork") => void;
  quantityTasks: TodoInfo;
}> = memo(({ onSelect, quantityTasks }) => {
  return (
    <>
      <Button onClick={() => onSelect("all")} type="text">
        Все ({quantityTasks.all})
      </Button>
      <Button onClick={() => onSelect("inWork")} type="text">
        В работе ({quantityTasks.inWork})
      </Button>
      <Button onClick={() => onSelect("completed")} type="text">
        Сделано ({quantityTasks.completed})
      </Button>
    </>
  );
});

export default Tabs;
