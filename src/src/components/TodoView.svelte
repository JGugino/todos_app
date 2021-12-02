<script>
    let newTodoInput = "";

    const addNewTodo = ()=>{

    }
</script>

<div id="todo-view" class="flex">
    <input type="text" bind:value={newTodoInput} placeholder="Enter a new todo...">
    <button on:click={addNewTodo}>Add</button>
    <div id="todos-container">

    </div>
</div>

<style>
    #todo-view{
        margin: 2rem 0;
        justify-content: center;
    }
</style>