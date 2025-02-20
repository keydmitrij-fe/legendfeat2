import "./TaskAdding.css";


const inputElement = document.getElementsByClassName("input").value;
export default function TaskAdding() {
  async function addTask(title, isDone) {
    await fetch("https://easydev.club/api/v2/todos", {
      method: "POST",
      "Content-type": "application/json",
      body: JSON.stringify({
        title: title,
        isDone: true,
      }),
    });
  }
  return (
    <div>
      <form className="form">
        <input type="text" className="input" placeholder="Task To Be Done..." />
        <button
          className="button"
          onClick={() => addTask(inputElement)}
        >
          Add
        </button>
      </form>
    </div>
  );
}
