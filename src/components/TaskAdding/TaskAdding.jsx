import { useState } from "react";
import { addTask } from "../../api/api.js";
import "./TaskAdding.css";

export default function TaskAdding({ onUpdate, minimalLength, maximalLength }) {
  const [inputValue, setInputValue] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.length <= 0) {
      alert("Введите название задачи!");
    } else if (inputValue.length >= 2 && inputValue.length <= 64) {
      await addTask(inputValue), onUpdate(), setInputValue("");
    } else {
      alert("Длина введенных символов должна быть от 2 до 64");
    }
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
          minLength={minimalLength}
          maxLength={maximalLength}
          required
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
