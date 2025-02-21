import { useState } from "react";
import "./TaskAdding.css";


let inputElementValue = document.getElementsByClassName("input").value;
export default function TaskAdding() {
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
  }
  return (
    <div>
      <form className="form">
        <input type="text" className="input" placeholder="Task To Be Done..." onChange={(event) => handleChange(event.target.value)} />
        <button
          type="submit"
          className="button"
          onClick={() => addTask(inputElementValue)}
        >
          Add
        </button>
      </form>
    </div>
  );
}
