export const saveTodos = (allTodos, lastID)=>{
    localStorage.setItem("totalTodos", `${lastID}`);

    allTodos.forEach(todo => {
        localStorage.setItem(`todo-${todo.todoID}`, `${todo.todoID},${todo.todoText},${todo.todoPriority},${todo.todoDone}`);
    });
}

export const loadTodos = ()=>{
    const savedTodos = [];
    const totalTodos = localStorage.getItem("totalTodos");

    for (let i = 0; i < totalTodos; i++) {
        const item = localStorage.getItem(`todo-${i}`);
        if(item) savedTodos.push(item);      
    }

    const activeTodos = [];
    const doneTodos = [];
    savedTodos.forEach(todo =>{
        const splitTodo = todo.split(',');
        let currentTodo = {todoID: splitTodo[0],todoText: splitTodo[1],todoPriority: splitTodo[2], todoDone: JSON.parse(splitTodo[3])};
        if(!currentTodo.todoDone){
            activeTodos.push(currentTodo);
        }else if(currentTodo.todoDone){
            doneTodos.push(currentTodo);
        }
    });

    return {totalTodos, activeTodos, doneTodos};
}