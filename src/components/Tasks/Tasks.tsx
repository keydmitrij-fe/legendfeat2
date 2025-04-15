import { List } from "antd";
import "./Tasks.css";
import TodoItem from "../TodoItem/TodoItem.tsx";
import { Todo } from "../../api/interface";

const Tasks: React.FC<{ tasks: Todo[]; onUpdate: () => void }> = (props) => {
  return (
    <List>
      {props.tasks.map((task) => (
        <TodoItem
          key={task.id}
          taskId={task.id}
          taskIsDone={task.isDone}
          taskTitle={task.title}
          onUpdate={props.onUpdate}
        />
      ))}
    </List>
  );
};

export default Tasks;
