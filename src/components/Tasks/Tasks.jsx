import "./Tasks.css";
import TodoItem from "../TodoItem/TodoItem.jsx";

export default function Tasks({
  tasks,
  onUpdateStatus,
  onDelete,
  onUpdate,
  ...props
}) {
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
          onDelete={onDelete}
          onUpdate={onUpdate}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </ul>
  );
}
