import { useState } from "react";
import { addTask } from "../../api/api.js";
import "./TaskAdding.css";
import {
  MAXIMAL_TASK_LENGTH,
  MINIMAL_TASK_LENGTH,
} from "../../constants/constants.js";

export default function TaskAdding({ onUpdate }) {
  const [inputValue, setInputValue] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!inputValue.length) {
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

    await addTask(inputValue), onUpdate(), setInputValue("");
  }

  function handleChange(e) {
    setInputValue(e.target.value);
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
}
