import { useState } from "react";
import { addTask } from "../../api/api.js";
import "./TaskAdding.css";

export default function TaskAdding({ onUpdate }) {
  const [inputValue, setInputValue] = useState("");

  async function handleSubmit() {
    {
      inputValue.length <= 0
        ? alert("Введите название задачи!")
        : inputValue.length >= 2 && inputValue.length <= 64
        ? (await addTask(inputValue), onUpdate(), setInputValue(""))
        : alert("Длина введенных символов должна быть от 2 до 64");
    }
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div>
      <form className="main-form" onSubmit={(event) => {handleSubmit(); event.preventDefault()}}>
        <input
          id="main-input"
          type="text"
          minLength="2"
          maxLength="64"
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
