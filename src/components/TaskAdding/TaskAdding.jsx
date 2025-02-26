import { useState } from "react";
import "./TaskAdding.css";

export default function TaskAdding({ onUpdate, mainInput }) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(value) {
    setInputValue(() => value);
  }
  async function addTask() {
    await fetch("https://easydev.club/api/v2/todos", {
      method: "POST",
      "Content-type": "application/json",
      body: JSON.stringify({
        title: inputValue,
        isDone: false,
      }),
    });
    mainInput.value = "";
    setInputValue("");
    onUpdate();
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
              ? addTask()
              : alert("Длина введенных символов должна быть от 2 до 64");
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}
