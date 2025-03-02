import { useState } from "react";
import { addTask } from "../../api/api.js";
import "./TaskAdding.css";

export default function TaskAdding({ onUpdate }) {
  const [inputValue, setInputValue] = useState("");

  let input = document.getElementById("main-input");

  function handleChange(value) {
    setInputValue(() => value);
  }

  return (
    <div>
      <form className="main-form">
        <input
          id="main-input"
          type="text"
          minLength="2"
          maxLength="64"
          required
          className="input"
          placeholder="Task To Be Done..."
          onChange={(event) => handleChange(event.target.value)}
        />
        <button
          type="button"
          className="button"
          onClick={() => {
            inputValue.length <= 0
              ? alert("Введите название задачи!")
              : inputValue.length >= 2 && inputValue.length <= 64
              ? addTask(inputValue, input, setInputValue, onUpdate)
              : alert("Длина введенных символов должна быть от 2 до 64");
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}
