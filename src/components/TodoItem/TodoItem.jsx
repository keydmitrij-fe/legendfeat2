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
import {
  MINIMAL_TASK_LENGTH,
  MAXIMAL_TASK_LENGTH,
} from "../../constants/constants.js";

export default function TodoItem(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

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

  async function handleSubmit(event) {
    event.preventDefault();
    if (!newTaskName.length) {
      return alert("Введите название задачи!");
    }

    if (
      newTaskName.length < MINIMAL_TASK_LENGTH ||
      newTaskName.length > MAXIMAL_TASK_LENGTH
    ) {
      return alert(
        `Длина введенных символов должна быть от ${MINIMAL_TASK_LENGTH} до ${MAXIMAL_TASK_LENGTH}`
      );
    }
    await fetchEditTasksName(props.taskId, newTaskName);
    setIsEdit(false);
    props.onUpdate();
  }

  return (
    <li className="task-container">
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={props.taskIsDone}
          onClick={handleEditClickToDone}
          readOnly
          id={props.taskId}
          className="checkbox"
        />
      </div>
      {!isEdit && (
        <>
          <div className="label-container">
            <p
              className={
                props.taskIsDone === true ? "paragraph done" : "paragraph"
              }
              id="task-title"
            >
              {props.taskTitle}
            </p>
          </div>

          <button
            type="button"
            id={props.taskId}
            className="edit"
            onClick={handleEditClick}
          >
            <img src={editIcon} alt="icon edit" />
          </button>
        </>
      )}
      {isEdit && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="label-container">
            <input
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
          </div>
        </form>
      )}
      <button type="button" className="delete" onClick={handleDelete}>
        <img src={deleteIcon} alt="icon delete" />
      </button>
    </li>
  );
}
