<script>
    import {onMount} from 'svelte';
    import {fly} from 'svelte/transition';

    import {getCurrentID, updateStartingID, nextID} from '../scripts/utils';
    import {saveTodos, loadTodos} from '../scripts/todoStorage';
    import {activeTodos, doneTodos} from '../stores/todosList';
    import TodoItem from './TodoItem.svelte';

    const possibleView = ["active","done"];
    let currentView = "active";

    onMount(()=>{
        const loadedTodos = loadTodos();
        updateStartingID(loadedTodos.totalTodos);
        activeTodos.update(current=>[...loadedTodos.activeTodos,...current]);
        doneTodos.update(current=>[...loadedTodos.doneTodos,...current]);
    });

    const switchView = (view)=>{
        if(possibleView.includes(view)) currentView = view;
    }

    let newTodoInput = "";
    let newTodoPriority = "low";
    
    const addNewTodo = ()=>{
        if(newTodoInput != ""){
            const newTodo = {todoID: nextID(), todoText: newTodoInput, todoPriority: newTodoPriority, todoDone: false};
            activeTodos.update(todos => [...todos, newTodo]);
            saveTodos(updateAllTodosList(), getCurrentID());
        }

        newTodoInput = "";
    }

    const removeTodo = (todo)=>{
        if(!todo.todoDone){
            localStorage.removeItem(`todo-${todo.todoID}`);
            activeTodos.update(current=>{
                const flitered = current.filter(currentTodo => currentTodo.todoID != todo.todoID);
                return flitered;
            });
        }else if(todo.todoDone){
            localStorage.removeItem(`todo-${todo.todoID}`);
            doneTodos.update(current=>{
                const flitered = current.filter(currentTodo => currentTodo.todoID != todo.todoID);
                return flitered;
            });
        } 
    }

    const markTodoAsDone = (todo)=>{
        const updatedTodo = {todoID: todo.todoID, todoText: todo.todoText, todoPriority: todo.todoPriority, todoDone: true}

        activeTodos.update(current=>{
            const flitered = current.filter(cTodo => cTodo.todoID != todo.todoID);
            return flitered;
        });

        doneTodos.update(current=>{
            return [...current, updatedTodo];
        });
        saveTodos(updateAllTodosList(), getCurrentID());
    }

    const saveEditedTodo = (e)=>{
        const editedTodo = e.detail;
        activeTodos.update(current=>{
            const copied = [...current];
            let foundTodo = copied.find(todo=>todo.todoID == editedTodo.todoID);
            foundTodo = editedTodo;
            return copied;
        });
        saveTodos(updateAllTodosList(), getCurrentID());
    }

    const updateAllTodosList = ()=>{
        return [...$activeTodos,...$doneTodos];
    }
</script>

<div id="todo-view" class="flex">
    <div id="todo-creator" class="flex">
        <div id="todo-inputs" class="flex">
            <input type="text" class="todo-input" bind:value={newTodoInput} placeholder="Enter a new todo...">
            <button on:click={addNewTodo} class="add-button">Add</button>
        </div>
        <div id="priority-selector">
            <select name="priority_options" bind:value={newTodoPriority}>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>
        </div>
        <nav class="flex">
            <a href="#active" on:click={()=>{switchView("active");}}>Active Todos</a>
            <a href="#done" on:click={()=>{switchView("done");}}>Done Todos</a>
        </nav>
    </div>

    <div id="todos-container" class="flex">
        {#if currentView == "active"}
        <div id="active-todos" in:fly|local={{x: 8, delay: 300, duration: 300}} out:fly|local={{x: -8, duration: 300}}>
            <h2 class="view-header">Active Todos</h2>
            {#each $activeTodos as todo}
            <TodoItem todoItem={todo} on:removeRequest={()=>{removeTodo(todo);}} 
                on:doneRequest={()=>{markTodoAsDone(todo);}} on:editRequest={saveEditedTodo}></TodoItem>
            {/each}
        </div>
        {:else if currentView == "done"}
        <div id="done-todos" in:fly|local={{x: 8, delay: 300, duration: 300}} out:fly|local={{x: -8, duration: 300}}>
            <h2 class="view-header">Done Todos</h2>
            {#each $doneTodos as todo}
            <TodoItem todoItem={todo} on:removeRequest={()=>{removeTodo(todo);}}
                on:doneRequest={()=>{markTodoAsDone(todo);}}></TodoItem>
            {/each}
        </div>
        {/if}
    </div>
</div>

<style>
    #todo-view{
        --view-primary-color: rgb(12, 13, 31);
        --view-secondary-color: hsl(179, 100%, 42%);

        margin: 2rem 0.2rem;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    #todo-view nav{
        margin: 1.8rem 0 0 0;
        gap: 1.2rem;
    }

    #todo-view nav a{
        position: relative;
        font-size: 16pt;
        font-family: var(--doc-font-500);
        text-decoration: none;
        color: black;
    }

    #todo-view nav a::before{
        content: '';
        display: block;
        height: 0.13em;
        background: var(--view-secondary-color);
        position: absolute;
        top: 1.6em;
        right: 0;
        left: 0;
        transform: scale(0, 1);
        transition: transform ease-in-out 260ms;
    }
    #todo-view nav a:hover::before{
        transform: scale(1, 1);
    }

    #todo-creator{
        --bg-color:rgba(0,0,0,20%); 
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(white, var(--bg-color));
        box-shadow: 0 8rem 2rem 1rem var(--bg-color);
        margin: 0 0 2rem 0;
    }

    #todo-inputs{
        margin: 0 1rem;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
    }

    #priority-selector select{
        font-family: var(--doc-font-300);
        margin: 1rem 0 0 0;
        padding: 0.6rem;
        width: 12rem;
        text-align: center;
        font-size: 14pt;
        -moz-appearance: none;
	    -webkit-appearance: none;
        border-radius: 6px;
        background: var(--view-primary-color);
        color: white;
        border: 1px solid var(--view-primary-color);
        transition: color 300ms ease-in-out, border 300ms ease-in-out;
    }

    #priority-selector select:hover{
        color: var(--view-secondary-color);
        border: 1px solid var(--view-secondary-color);
    }

    #todos-container{
        background: var(--view-primary-color);
        width: 100%;
        flex-direction: column;
        margin: 1.8rem 0 0 0;
        border-radius: 6px;
        padding: 1rem;
    }

    #todos-container h2{
        text-align: center;
    }

    .todo-input{
        width: 40rem;
        max-width: 40rem;
        font-size: 14pt;
        padding: 0.6rem 0 0.6rem 0.4rem;
        border-radius: 6px;
        border: 1px solid var(--view-primary-color);
        font-family: var(--doc-font-400);
        transition: border 300ms ease-in-out;
    }

    .todo-input:hover{
        border: 1px solid var(--view-secondary-color);
    }

    .todo-input:focus{
        outline: none;
        border: 1px solid var(--view-secondary-color);
    }

    .add-button{
        padding: 0.5em 1.8em;
        font-size: 14pt;
        font-family: var(--doc-font-300);
        border-radius: 6px;
        background: rgb(12, 13, 31);
        color: white;
        border: 1px solid var(--view-primary-color);
        transition: border 300ms ease-in-out, color 300ms ease-in-out;
    }

    .add-button:hover{
        color: var(--view-secondary-color);
        border: 1px solid var(--view-secondary-color);
    }

    .view-header{
        color: var(--view-secondary-color);
        font-size: 28pt;
    }

    @media screen and (max-width: 770px){
        .todo-input{
            width: 14rem;
        }
    }
</style>