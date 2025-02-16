import "./TaskAdding.css"

export default function TaskAdding() {
  return (
    <div>
      <form className="form">
      <input type="text" className="input" placeholder="Task To Be Done..."/>
      <button className="button">Add</button>
      </form>
    </div>
  );
}
