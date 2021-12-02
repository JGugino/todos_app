<script>
    import TodoView from '../TodoView.svelte'

    export let currentRoute = {routeID: 0, routeName: ""};
</script>

<div id="content-holder">
    {#if currentRoute.routeName == "todo_view"}
        <TodoView></TodoView>
    {/if}
</div>

<style>
</style>