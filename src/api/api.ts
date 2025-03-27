
export async function fetchTasks(status?: string) {
    try {
        const response = await fetch(
            `https://easydev.club/api/v1/todos?filter=${status}`
        );
        const resData = response.json();
        return resData;
    } catch (error) {
        alert("Ошибка: " + error);
    }
}

export async function addTask(inputValue: string) {
    try {
        await fetch("https://easydev.club/api/v1/todos", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                title: inputValue,
                isDone: false,
            }),
        });
    } catch (error) {
        alert("Ошибка: " + error);
    }
}

export async function fetchEditTasksToDone(id: number, isDone: boolean) {
    try {
        await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                isDone: !isDone,
            }),
        });
    } catch (error) {
        alert("Ошибка: " + error);
    }
}

export async function deleteTask(id: number) {
    try {
        await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        alert("Ошибка: " + error);
    }
}

export async function fetchEditTasksName(id: number, newTaskName: string) {
    try {
        await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                title: newTaskName,
            }),
        });
    } catch (error) {
        alert("Ошибка: " + error);
    }
}
