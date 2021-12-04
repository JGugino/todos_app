<script>
    import {onMount} from 'svelte';

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
    </div>

    <div id="todos-container" class="flex">
        {#if currentView == "active"}
        <div id="active-todos">
            <h2>Active Todos</h2>
            {#each $activeTodos as todo}
            <TodoItem todoItem={todo} on:removeRequest={()=>{removeTodo(todo);}}></TodoItem>
            {/each}
        </div>
        {:else if currentView == "done"}
        <div id="done-todos">
            <h2>Done Todos</h2>
            {#each $doneTodos as todo}
            <TodoItem todoItem={todo} on:removeRequest={()=>{removeTodo(todo);}}></TodoItem>
            {/each}
        </div>
        {/if}
    </div>
</div>

<style>
    #todo-view{
        margin: 2rem 2rem;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    #todo-creator{
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
    }

    #todos-container{
        width: 100%;
        flex-direction: column;
        margin: 1.8rem 0 0 0;
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
        border: 1px solid lightgray;
        font-family: var(--doc-font-400);
    }

    .add-button{
        padding: 0.4em 1.8em;
        font-size: 14pt;
        font-family: var(--doc-font-300);
    }

    @media screen and (max-width: 770px){
        .todo-input{
            width: 14rem;
        }
    }
</style>