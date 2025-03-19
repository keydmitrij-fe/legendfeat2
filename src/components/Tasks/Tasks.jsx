import "./Tasks.css";
import TodoItem from "../TodoItem/TodoItem.jsx";

export default function Tasks({ tasks, onUpdate, ...props }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          taskId={task.id}
          taskIsDone={task.isDone}
          taskTitle={task.title}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
