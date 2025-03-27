export async function fetchTasks(tab) {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1/todos?filter=${tab}`
    );
    const resData = await response.json();
    return resData;
  } catch (error) {
    alert("Ошибка: " + error);
  }
}

export async function addTask(inputValue) {
  try {
    await fetch("https://easydev.club/api/v1/todos", {
      method: "POST",
      "Content-type": "application/json",
      body: JSON.stringify({
        title: inputValue,
        isDone: false,
      }),
    });
  } catch (error) {
    alert("Ошибка: " + error);
  }
}

export async function fetchEditTasksToDone(id, taskIsDone) {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      "Content-type": "application/json",
      body: JSON.stringify({
        isDone: !taskIsDone,
      }),
    });
  } catch (error) {
    alert("Ошибка: " + error);
  }
}

export async function deleteTask(id) {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    alert("Ошибка: " + error);
  }
}

export async function fetchEditTasksName(id, newTaskName) {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      "Content-type": "application/json",
      body: JSON.stringify({
        title: newTaskName,
      }),
    });
  } catch (error) {
    alert("Ошибка: " + error);
  }
}
