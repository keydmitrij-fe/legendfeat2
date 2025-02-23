import { useState } from "react";
import "./TaskAdding.css";

export default function TaskAdding({onUpdate}) {
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
    onUpdate();
  }
  console.log(inputValue);
  return (
    <div>
      <form className="form">
        <input
          type="text"
          className="input"
          placeholder="Task To Be Done..."
          onChange={(event) => handleChange(event.target.value)}
        />
        <button
          type="button"
          className="button"
          onClick={() => addTask()}
        >
          Add
        </button>
      </form>
    </div>
  );
}
