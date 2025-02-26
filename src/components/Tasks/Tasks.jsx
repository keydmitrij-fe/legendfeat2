import "./Tasks.css";
import TodoItem from "../TodoItem/TodoItem.jsx";

export default function Task({
  tasks,
  onUpdateEdit,
  isEdit,
  isDelete,
  onUpdate,
  isAdd,
  mainInput,
  updateTaskList,
  ...props
}) {
  const tabId = props.tabId;

  async function fetchEditTasksToDone(id, taskIsDone) {
    await fetch("https://easydev.club/api/v2/todos/" + `${id}`, {
      method: "PUT",
      "Content-type": "application/json",
      body: JSON.stringify({
        isDone: !taskIsDone,
      }),
    });
    onUpdateEdit();
  }

  async function deleteTask(id) {
    await fetch("https://easydev.club/api/v2/todos/" + `${id}`, {
      method: "DELETE",
    });
    mainInput.value = "";
    onUpdate();
  }
  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem
          tabId={tabId}
          key={task.id}
          taskId={task.id}
          taskIsDone={task.isDone}
          taskTitle={task.title}
          onDelete={deleteTask}
          onEditTaskToDone={fetchEditTasksToDone}
          onUpdate={updateTaskList}
        />
      ))}
    </ul>
  );
}
