import "./Tasks.css";
import TodoItem from "../TodoItem/TodoItem.tsx";
import { Todo } from "../../api/interface";

const Tasks: React.FC<{ tasks: Todo[]; onUpdate: () => void }> = (props) => {
  return (
    <ul>
      {props.tasks.map((task) => (
        <TodoItem
          key={task.id}
          taskId={task.id}
          taskIsDone={task.isDone}
          taskTitle={task.title}
          onUpdate={props.onUpdate}
        />
      ))}
    </ul>
  );
};

export default Tasks;
