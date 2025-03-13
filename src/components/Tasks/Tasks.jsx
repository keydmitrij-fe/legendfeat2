import "./Tasks.css";
import TodoItem from "../TodoItem/TodoItem.jsx";

export default function Tasks({ tasks, onUpdate, ...props }) {
  const tabId = props.tabId;

  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem
          tabId={tabId}
          key={task.id}
          taskId={task.id}
          taskIsDone={task.isDone}
          taskTitle={task.title}
          onUpdate={onUpdate}
          minimalLength={props.minimalLength}
          maximalLength={props.maximalLength}
        />
      ))}
    </ul>
  );
}
