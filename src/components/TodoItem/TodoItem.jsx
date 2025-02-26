import { useState } from "react";
import "./TodoItem.css";
import saveIcon from "/frontend/todo-list-new/todo-list/src/assets/icons/save-icon.png";
import cancelIcon from "/frontend/todo-list-new/todo-list/src/assets/icons/cancel-icon.png";

export default function TodoItem(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  async function fetchEditTasksName() {
    await fetch("https://easydev.club/api/v2/todos/" + `${props.taskId}`, {
      method: "PUT",
      "Content-type": "application/json",
      body: JSON.stringify({
        title: newTaskName,
      }),
    });
    setIsEdit(false);
    props.onUpdate(props.tabId);
  }

  function handleEditClick() {
    setNewTaskName(props.taskTitle);
    setIsEdit(true);
    props.onUpdate(props.tabId);
  }

  function handleCancelClick() {
    setNewTaskName("");
    setIsEdit(false);
  }

  function saveNewTaskName() {
    fetchEditTasksName(props.taskId);
  }

  return (
    <li key={props.taskId} className="task-container">
      <form className="form">
        <div className="label-container">
          <input
            type="checkbox"
            checked={props.taskIsDone}
            onClick={() =>
              props.onEditTaskToDone(props.taskId, props.taskIsDone)
            }
            readOnly
            id={props.taskId}
            className="checkbox"
          />
          {isEdit ? (
            <input
              minLength="2"
              maxLength="64"
              required
              className="edit-input"
              id={props.taskId}
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
          ) : (
            <label
              htmlFor={props.taskId}
              className={props.taskIsDone === true ? "label done" : "label"}
              id="task-title"
            >
              {props.taskTitle}
            </label>
          )}
        </div>
        {isEdit ? (
          <div className="edit-buttons">
            <button
              type="button"
              id={props.taskId}
              className="save-button"
              onClick={() => {
                newTaskName.length <= 0
                  ? alert("Введите название задачи!")
                  : newTaskName.length >= 2 && newTaskName.length <= 64
                  ? saveNewTaskName()
                  : alert("Длина введенных символов должна быть от 2 до 64")
              }}
            >
              <img src={saveIcon} alt="save icon" className="image" />
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancelClick}
            >
              <img src={cancelIcon} alt="cancel icon" />
            </button>
            <button
              type="button"
              className="delete"
              onClick={() => props.onDelete(props.taskId)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 48 48"
                fill="white"
              >
                <path d="M 24 4 C 20.704135 4 18 6.7041348 18 10 L 7.5 10 A 1.50015 1.50015 0 1 0 7.5 13 L 10 13 L 10 38.5 C 10 41.533 12.467 44 15.5 44 L 32.5 44 C 35.533 44 38 41.533 38 38.5 L 38 13 L 40.5 13 A 1.50015 1.50015 0 1 0 40.5 10 L 30 10 C 30 6.7041348 27.295865 4 24 4 z M 24 7 C 25.674135 7 27 8.3258652 27 10 L 21 10 C 21 8.3258652 22.325865 7 24 7 z M 19.5 18 C 20.328 18 21 18.672 21 19.5 L 21 34.5 C 21 35.328 20.328 36 19.5 36 C 18.672 36 18 35.328 18 34.5 L 18 19.5 C 18 18.672 18.672 18 19.5 18 z M 28.5 18 C 29.328 18 30 18.672 30 19.5 L 30 34.5 C 30 35.328 29.328 36 28.5 36 C 27.672 36 27 35.328 27 34.5 L 27 19.5 C 27 18.672 27.672 18 28.5 18 z"></path>
              </svg>
            </button>
          </div>
        ) : (
          <div className="buttons">
            <button
              type="button"
              id={props.taskId}
              className="edit"
              onClick={handleEditClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 48 48"
                fill="white"
              >
                <path d="M 39.822266 6.0019531 C 39.265016 6.0019531 38.707703 6.2127188 38.283203 6.6367188 L 21.730469 23.191406 L 20.998047 27.001953 L 24.808594 26.269531 L 41.361328 9.7167969 C 41.772328 9.3057969 42 8.7587344 42 8.1777344 C 42 7.5967344 41.772328 7.0487188 41.361328 6.6367188 C 40.936828 6.2127188 40.379516 6.0019531 39.822266 6.0019531 z M 12.5 7 C 9.486124 7 7 9.486124 7 12.5 L 7 35.5 C 7 38.513876 9.486124 41 12.5 41 L 35.5 41 C 38.513876 41 41 38.513876 41 35.5 L 41 19 A 2.0002 2.0002 0 1 0 37 19 L 37 35.5 C 37 36.352124 36.352124 37 35.5 37 L 12.5 37 C 11.647876 37 11 36.352124 11 35.5 L 11 12.5 C 11 11.647876 11.647876 11 12.5 11 L 29 11 A 2.0002 2.0002 0 1 0 29 7 L 12.5 7 z"></path>
              </svg>
            </button>
            <button
              type="button"
              className="delete"
              onClick={() => props.onDelete(props.taskId)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 48 48"
                fill="white"
              >
                <path d="M 24 4 C 20.704135 4 18 6.7041348 18 10 L 7.5 10 A 1.50015 1.50015 0 1 0 7.5 13 L 10 13 L 10 38.5 C 10 41.533 12.467 44 15.5 44 L 32.5 44 C 35.533 44 38 41.533 38 38.5 L 38 13 L 40.5 13 A 1.50015 1.50015 0 1 0 40.5 10 L 30 10 C 30 6.7041348 27.295865 4 24 4 z M 24 7 C 25.674135 7 27 8.3258652 27 10 L 21 10 C 21 8.3258652 22.325865 7 24 7 z M 19.5 18 C 20.328 18 21 18.672 21 19.5 L 21 34.5 C 21 35.328 20.328 36 19.5 36 C 18.672 36 18 35.328 18 34.5 L 18 19.5 C 18 18.672 18.672 18 19.5 18 z M 28.5 18 C 29.328 18 30 18.672 30 19.5 L 30 34.5 C 30 35.328 29.328 36 28.5 36 C 27.672 36 27 35.328 27 34.5 L 27 19.5 C 27 18.672 27.672 18 28.5 18 z"></path>
              </svg>
            </button>
          </div>
        )}
      </form>
    </li>
  );
}
