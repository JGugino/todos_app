import { writable } from "svelte/store";

export const activeTodos = writable([]);
export const doneTodos = writable([]);