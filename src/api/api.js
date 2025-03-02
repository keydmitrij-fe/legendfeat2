export async function fetchTasks(tab, setTasks, setQuant) {
  try {
    const response = await fetch(
      "https://easydev.club/api/v2//todos?filter=" + `${tab}`
    );
    const resData = await response.json();
    setTasks(resData.data);
    setQuant(resData.info);
  } catch (error) {
    alert("Ошибка: " + error);
  }
}

export async function addTask(inputValue, mainInput, setInputValue, onUpdate) {
  try {
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
  } catch (error) {
    alert("Ошибка: " + error);
  }
}

export async function fetchEditTasksToDone(id, taskIsDone, onUpdateStatus) {
  try {
    await fetch("https://easydev.club/api/v2/todos/" + `${id}`, {
      method: "PUT",
      "Content-type": "application/json",
      body: JSON.stringify({
        isDone: !taskIsDone,
      }),
    });
    onUpdateStatus();
  } catch (error) {
    alert("Ошибка: " + error);
  }
}

export async function deleteTask(id, onDelete) {
  try {
    await fetch("https://easydev.club/api/v2/todos/" + `${id}`, {
      method: "DELETE",
    });

    onDelete();
  } catch (error) {
    alert("Ошибка: " + error);
  }
}

export async function fetchEditTasksName(
  id,
  newTaskName,
  setIsEdit,
  onUpdate,
  tabId
) {
  try {
    await fetch("https://easydev.club/api/v2/todos/" + `${id}`, {
      method: "PUT",
      "Content-type": "application/json",
      body: JSON.stringify({
        title: newTaskName,
      }),
    });
    setIsEdit(false);
    onUpdate(tabId);
  } catch (error) {
    alert("Ошибка: " + error);
  }
}
