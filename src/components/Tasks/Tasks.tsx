import { List } from "antd";
import "./Tasks.css";
import TodoItem from "../TodoItem/TodoItem.tsx";
import { Todo } from "../../types/todoTypes.ts";
import { memo } from "react";

const Tasks: React.FC<{ tasks: Todo[] }> = memo(({ tasks }) => {
  return (
    <List>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          taskId={task.id}
          taskIsDone={task.isDone}
          taskTitle={task.title}
        />
      ))}
    </List>
  );
});

export default Tasks;
