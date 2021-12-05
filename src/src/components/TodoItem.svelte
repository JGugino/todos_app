<script>
    import {fly, fade} from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    /*  Todo Item Structure
        {
            todoID: 0,
            todoText: "",
            todoPriority: "low/medium/high",
            todoDone: true/false
        }
    */

   export let todoItem = {
        todoID: 0,
        todoText: "",
        todoPriority: "low",
        todoDone: false
   }

   let optionsOpen = false;

   const possibleViews = ["view","edit"];
   let currentView = "view";
   const switchView = (view)=>{if(possibleViews.includes(view)) currentView = view}

   const optionClicked = (id)=>{
    switch (id) {
        case 0:
            switchView("edit");
            break;
    
        case 1:
            dispatch("removeRequest", todoItem);
            break;

        case 2:
            dispatch("doneRequest", todoItem);
            break;
    }

    optionsOpen = false;
   }

   const saveEditedTodo = ()=>{
        if(todoItem.todoText != ""){
            switchView("view");
            dispatch("editRequest", todoItem);
        }
   }

</script>

<div id="todo-item" class="flex {todoItem.todoPriority}" on:click={()=>{optionsOpen = false;}}>
    {#if currentView == "view"}
    <div id="view-display" class="flex" in:fly|local={{x: 6, delay: 800, duration: 400}} out:fly|local={{x: -6, duration: 400}}>
        <h3>{todoItem.todoText}</h3> 
        <svg class="settings-button" on:click|stopPropagation={()=>{optionsOpen = !optionsOpen}} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 60" id="Layer_60"><circle cx="16" cy="16" r="1"/><path d="M16,18a2,2,0,1,1,2-2A2,2,0,0,1,16,18Zm0-2Z"/><circle cx="16" cy="5" r="1"/><path  d="M16,7a2,2,0,1,1,2-2A2,2,0,0,1,16,7Zm0-2Z"/><circle  cx="16" cy="27" r="1"/><path  d="M16,29a2,2,0,1,1,2-2A2,2,0,0,1,16,29Zm0-2Z"/></g></svg>
        {#if optionsOpen == true}
            <div id="todo-options" class="flex" transition:fly={{x: 6, duration: 280}}>
                {#if todoItem.todoDone == false}
                <button on:click|preventDefault={()=>{optionClicked(0);}}>Edit</button>
                {/if} 
                <button on:click|preventDefault={()=>{optionClicked(1);}}>Remove</button>
                {#if todoItem.todoDone == false}
                <button on:click|preventDefault={()=>{optionClicked(2);}}>Mark as Done</button>
                {/if}
            </div>
        {/if}
    </div>
    {:else if currentView == "edit"}
        <div id="edit-display" class="flex" in:fly|local={{x: 6, delay: 600, duration: 400}} out:fly|local={{x: -6, duration: 400}}>
            <input class="edit-input" type="text" bind:value={todoItem.todoText}>
            <select class="edit-select" name="priority_options" bind:value={todoItem.todoPriority}>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>
            <button class="edit-button" on:click|preventDefault={saveEditedTodo}>Save</button>
        </div>
    {/if}
</div>

<style>
    #todo-item{
        position: relative;
        font-size: 14pt;
        margin: 1rem 1rem;
        padding: 0.8rem 1.4rem;
        border-radius: 6px;
    }

    #view-display{
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }

    #edit-display{
        width: 100%;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    #todo-options{
        position: absolute;
        flex-direction: column;
        right: 3.6rem;
        gap: 0.4rem;
        background: rgb(78, 78, 78);
        padding: 1rem;
        border-radius: 6px;
        z-index: 1;
    }

    #todo-options button{
        padding: 0.4rem 1.2rem;
        font-family: var(--doc-font-300);
        border-radius: 6px;
        border: 0px;
    }

    .settings-button{
        text-align: right;
        height: 2.4rem;
        margin: 0 0 0 auto;
        fill:#101820;
        cursor: pointer;
        transition: fill 300ms ease;
    }

    .settings-button:hover{
        fill: rgb(255, 255, 255);
    }

    .edit-input{
        font-size: 14pt;
        font-family: var(--doc-font-300);
        padding: 0.4rem 2rem 0.4rem 0.6rem;
        border-radius: 6px;
        border: 0;
    }

    .edit-select{
        font-family: var(--doc-font-300);
        padding: 0.6rem;
        width: 14rem;
        text-align: center;
        font-size: 14pt;
        -moz-appearance: none;
	    -webkit-appearance: none;
        border-radius: 6px;
    }

    .edit-button{
        font-size: 16pt;
        font-family: var(--doc-font-300);
        padding: 0.4rem 1.8rem;
        border-radius: 6px;
        border: none;
    }

    .low{
        background: hsl(112, 100%, 62%);
        transition: background 200ms ease-in-out;
    }

    .medium{
        background: hsl(37, 100%, 62%);
        transition: background 200ms ease-in-out;
    }

    .high{
        background: hsl(2, 94%, 62%);
        transition: background 200ms ease-in-out;
    }

    .low:hover{
        background: hsl(112, 100%, 54%);
    }

    .medium:hover{
        background: hsl(37, 100%, 54%);
    }

    .high:hover{
        background: hsl(2, 94%, 54%);
    }
</style>