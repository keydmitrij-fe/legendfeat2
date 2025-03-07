import { useState } from "react";
import {
  fetchEditTasksToDone,
  deleteTask,
  fetchEditTasksName,
} from "../../api/api.js";
import "./TodoItem.css";
import saveIcon from "../../assets/icons/save-icon.png";
import cancelIcon from "../../assets/icons/cancel-icon.png";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import editIcon from "../../assets/icons/edit-icon.svg";

export default function TodoItem(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  async function handleEditClickToDone() {
    await fetchEditTasksToDone(props.taskId, props.taskIsDone);
    props.onUpdateStatus();
  }

  async function handleDelete() {
    await deleteTask(props.taskId);
    props.onDelete();
  }

  function handleEditClick() {
    setNewTaskName(props.taskTitle);
    setIsEdit(true);
    props.onUpdate();
  }

  function handleCancelClick() {
    setNewTaskName("");
    setIsEdit(false);
  }

  async function handleSaveNewTaskName() {
    await fetchEditTasksName(props.taskId, newTaskName);
    setIsEdit(false);
    props.onUpdate();
  }

  async function handleSubmit() {
    {
      newTaskName.length <= 0
        ? alert("Введите название задачи!")
        : newTaskName.length >= 2 && newTaskName.length <= 64
        ? await handleSaveNewTaskName()
        : alert("Длина введенных символов должна быть от 2 до 64");
    }
  }

  return (
    <li className="task-container">
      {isEdit ? (
        <form className="form" onSubmit={(event) => {handleSubmit(); event.preventDefault()}}>
          <div className="label-container">
            <input
              type="checkbox"
              checked={props.taskIsDone}
              onClick={() => handleEditClickToDone()}
              readOnly
              id={props.taskId}
              className="checkbox"
            />
            <input
              minLength="2"
              maxLength="64"
              required
              className="edit-input"
              id={props.taskId}
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
          </div>
          <div className="edit-buttons">
            <button
              type="submit"
              id={props.taskId}
              className="save-button"
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
            <button type="button" className="delete" onClick={handleDelete}>
              <img src={deleteIcon} alt="icon delete" />
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="label-container">
            <input
              type="checkbox"
              checked={props.taskIsDone}
              onClick={() => handleEditClickToDone()}
              readOnly
              id={props.taskId}
              className="checkbox"
            />
            <p
              htmlFor={props.taskId}
              className={
                props.taskIsDone === true ? "paragraph done" : "paragraph"
              }
              id="task-title"
            >
              {props.taskTitle}
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              id={props.taskId}
              className="edit"
              onClick={handleEditClick}
            >
              <img src={editIcon} alt="icon edit" />
            </button>
            <button type="button" className="delete" onClick={handleDelete}>
              <img src={deleteIcon} alt="icon delete" />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
