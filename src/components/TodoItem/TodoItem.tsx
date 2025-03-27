import { ChangeEvent, FormEvent, useState } from "react";
import {
  fetchEditTasksToDone,
  deleteTask,
  fetchEditTasksName,
} from "../../api/api.ts";
import "./TodoItem.css";
import saveIcon from "../../assets/icons/save-icon.png";
import cancelIcon from "../../assets/icons/cancel-icon.png";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import editIcon from "../../assets/icons/edit-icon.svg";
import {
  MINIMAL_TASK_LENGTH,
  MAXIMAL_TASK_LENGTH,
} from "../../constants/constants.ts";
import { TodoRequest } from "../../api/interface.ts";

const TodoItem: React.FC<{
  taskId: number;
  taskIsDone: boolean;
  taskTitle: string;
  onUpdate: () => void;
}> = (props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updateTaskStatus, setUpdateTaskStatus] = useState<boolean>(
    props.taskIsDone
  );
  const [updateTaskName, setUpdateTaskName] = useState<string>();

  async function handleEditClickToDone() {
    setUpdateTaskStatus(!props.taskIsDone);
    const request: TodoRequest = { isDone: updateTaskStatus };
    await fetchEditTasksToDone(props.taskId, request.isDone!);
    props.onUpdate();
  }

  async function handleDelete() {
    await deleteTask(props.taskId);
    props.onUpdate();
  }

  function handleEditClick() {
    setUpdateTaskName(props.taskTitle);
    setIsEdit(true);
    props.onUpdate();
  }

  function handleCancelClick() {
    setUpdateTaskName("");
    setIsEdit(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!updateTaskName?.length) {
      return alert("Введите название задачи!");
    }

    if (
      updateTaskName.length < MINIMAL_TASK_LENGTH ||
      updateTaskName.length > MAXIMAL_TASK_LENGTH
    ) {
      return alert(
        `Длина введенных символов должна быть от ${MINIMAL_TASK_LENGTH} до ${MAXIMAL_TASK_LENGTH}`
      );
    }
    const request: TodoRequest = {
      title: updateTaskName,
    };
    await fetchEditTasksName(props.taskId, request.title!);
    setIsEdit(false);
    props.onUpdate();
  }

  return (
    <li className="task-container">
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={updateTaskStatus}
          onClick={handleEditClickToDone}
          readOnly
          className="checkbox"
        />
      </div>
      {!isEdit && (
        <>
          <div className="label-container">
            <p
              className={
                updateTaskStatus === true ? "paragraph done" : "paragraph"
              }
              id="task-title"
            >
              {props.taskTitle}
            </p>
          </div>

          <button type="button" className="edit" onClick={handleEditClick}>
            <img src={editIcon} alt="icon edit" />
          </button>
        </>
      )}
      {isEdit && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="label-container">
            <input
              className="edit-input"
              value={updateTaskName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUpdateTaskName(e.target.value)
              }
            />
          </div>
          <div className="edit-buttons">
            <button type="submit" className="save-button">
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
};

export default TodoItem;
