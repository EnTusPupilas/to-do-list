<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons'; // Import checkmark icon

	import { ToDoManager } from '../main';
	import '../../input.css'; // Ensure Tailwind CSS is included
	import '../../styles/animations.css';

	const toDoManager = new ToDoManager(); // Initialize ToDoManager instance

	let textInput = '';
	let toDoList = toDoManager.getToDos(); // Initialize the list of ToDos
	let showError = false;

	let popupModal = false; // Control to open/close the delete confirmation modal
	let successModal = false; // Control to show the success modal after deletion
	let toDoToDelete: number | null = null; // To track which ToDo is selected for deletion

	// Function to add a new ToDo
	function addToDo() {
		const result = toDoManager.addToDo(textInput); // Add new ToDo
		toDoList = result.toDoList;
		showError = result.showError;
		textInput = result.textInput;
	}

	// Function to confirm the deletion of a ToDo by index
	function confirmDeleteToDo() {
		if (toDoToDelete !== null) {
			toDoList = toDoManager.deleteToDo(toDoToDelete);
			toDoToDelete = null; // Reset after deletion
			popupModal = false; // Close the confirmation modal
			successModal = true; // Open the success modal
			setTimeout(() => (successModal = false), 3000); // Automatically close the success modal after 3 seconds
		}
	}

	// Open the delete confirmation modal
	function openDeleteModal(index: number) {
		toDoToDelete = index; // Assign the index of the selected ToDo
		popupModal = true; // Open the modal
	}

	// Function to enable or disable editing mode for a ToDo
	function setEditing(index: number, editing: boolean) {
		toDoList = toDoManager.setEditing(index, editing);
	}
</script>

<!-- Main Container -->
<div class="bg-gray-900 min-h-screen text-gray-300 pt-10">
	<!-- Section to enter a new ToDo -->
	<div class="mx-auto p-5 max-w-lg bg-gray-800 rounded-lg shadow-lg text-gray-300">
		<h2 class="text-center text-2xl font-bold mb-6 text-gray-100">ToDo List</h2>
		<p class="text-gray-400 mb-4">Enter your ToDo here:</p>
		<div class="flex mb-4">
			<input
				type="text"
				bind:value={textInput}
				class="border border-gray-700 p-2 flex-grow rounded bg-gray-700 text-gray-100"
				placeholder="New ToDo"
			/>
			<button
				type="button"
				class="ml-2 p-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
				on:click={addToDo}
			>
				Add
			</button>
		</div>
		{#if showError}
			<p class="text-red-500">Please introduce your ToDo</p>
		{/if}
	</div>

	<!-- List of ToDos -->
	<div class="mx-auto p-5 max-w-lg space-y-4">
		{#each toDoList as toDo, i}
			<div class="flex items-center justify-between bg-gray-800 p-3 rounded shadow-sm">
				{#if toDo.editing}
					<input
						type="text"
						bind:value={toDo.content}
						class="border p-2 flex-grow rounded bg-gray-700 text-gray-300"
					/>
				{:else}
					<div class="flex items-center flex-grow">
						<input type="checkbox" bind:checked={toDo.checked} class="mr-2" />
						<h4 class={toDo.checked ? 'line-through text-gray-500' : 'text-gray-200'}>
							{toDo.content}
						</h4>
					</div>
				{/if}
				<div class="flex space-x-2">
					{#if toDo.editing}
						<button
							class="p-2 bg-green-600 text-white rounded hover:bg-green-700 ml-2"
							on:click={() => setEditing(i, false)}
						>
							Save
						</button>
					{:else}
						<button
							class="p-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
							on:click={() => setEditing(i, true)}
						>
							Edit
						</button>
					{/if}
					<button
						class="p-2 bg-red-600 text-white rounded hover:bg-red-700"
						on:click={() => openDeleteModal(i)}
					>
						Delete
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<Modal bind:open={popupModal} size="xs" autoclose outsideclose>
	<div class="fade-in text-center" class:fade-out={!popupModal}>
		<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Are you sure you want to delete this ToDo?
		</h3>
		<Button color="red" class="me-2" on:click={confirmDeleteToDo}>Yes, I'm sure</Button>
		<Button color="alternative" on:click={() => (popupModal = false)}>No, cancel</Button>
	</div>
</Modal>

<!-- Success modal after deletion with animation -->
<Modal bind:open={successModal} size="xs" autoclose outsideclose>
	<div class="text-center">
		<!-- Checkmark SVG with applied animations -->
		<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
			<circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
			<path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
		</svg>
		<h3 class="text-lg font-normal text-gray-500 dark:text-gray-400">ToDo was deleted</h3>
	</div>
</Modal>
