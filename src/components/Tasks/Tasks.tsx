import { List } from "antd";
import "./Tasks.css";
import TodoItem from "../TodoItem/TodoItem.tsx";
import { Todo } from "../../api/interface";
import { memo } from "react";

const Tasks: React.FC<{ tasks: Todo[]; onUpdate: () => void }> = memo(
  ({ tasks, onUpdate }) => {
    return (
      <List>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            taskId={task.id}
            taskIsDone={task.isDone}
            taskTitle={task.title}
            onUpdate={onUpdate}
          />
        ))}
      </List>
    );
  }
);

export default Tasks;
