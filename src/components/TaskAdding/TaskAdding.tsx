import { ChangeEvent, FormEvent, useState } from "react";
import { addTask } from "../../api/api.ts";
import "./TaskAdding.css";
import {
  MAXIMAL_TASK_LENGTH,
  MINIMAL_TASK_LENGTH,
} from "../../constants/constants.ts";
import { TodoRequest } from "../../api/interface.ts";

const TaskAdding: React.FC<{ onUpdate: () => void }> = (props) => {
  const [inputValue, setInputValue] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!inputValue?.length) {
      return alert("Введите название задачи!");
    }

    if (
      inputValue.length < MINIMAL_TASK_LENGTH ||
      inputValue.length > MAXIMAL_TASK_LENGTH
    ) {
      return alert(
        `Длина введенных символов должна быть от ${MINIMAL_TASK_LENGTH} до ${MAXIMAL_TASK_LENGTH}`
      );
    }
    const request: TodoRequest = {
      title: inputValue,
    };
    await addTask(request.title!);
    props.onUpdate();
    setInputValue("");
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <div>
      <form className="main-form" onSubmit={handleSubmit}>
        <input
          id="main-input"
          type="text"
          className="input"
          placeholder="Task To Be Done..."
          onChange={handleChange}
          value={inputValue}
        />
        <button type="submit" className="button">
          Add
        </button>
      </form>
    </div>
  );
};

export default TaskAdding;
