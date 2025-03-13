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

  let taskView;

  async function handleEditClickToDone() {
    await fetchEditTasksToDone(props.taskId, props.taskIsDone);
    props.onUpdate();
  }

  async function handleDelete() {
    await deleteTask(props.taskId);
    props.onUpdate();
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

  async function handleSubmit(event) {
    event.preventDefault();
    if (newTaskName.length <= 0) {
      alert("Введите название задачи!");
    } else if (newTaskName.length >= 2 && newTaskName.length <= 64) {
      await handleSaveNewTaskName();
    } else {
      alert("Длина введенных символов должна быть от 2 до 64");
    }
  }

  if (isEdit) {
    taskView = (
      <form className="form" onSubmit={handleSubmit}>
        <div className="label-container">
          <input
            type="checkbox"
            checked={props.taskIsDone}
            onClick={handleEditClickToDone}
            readOnly
            id={props.taskId}
            className="checkbox"
          />
          <input
            minLength={props.minimalLength}
            maxLength={props.maximalLength}
            required
            className="edit-input"
            id={props.taskId}
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        </div>
        <div className="edit-buttons">
          <button type="submit" id={props.taskId} className="save-button">
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
    );
  } else {
    taskView = (
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
    );
  }

  return <li className="task-container">{taskView}</li>;
}
