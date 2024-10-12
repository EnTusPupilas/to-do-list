import { ToDoController } from '../app/controller';

export const toDoController = new ToDoController();

export class ToDoManager {
  showError: boolean = false;

  constructor() {
    // Check if we are running in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedToDos = localStorage.getItem('toDoList');
      if (storedToDos) {
        toDoController.setToDos(JSON.parse(storedToDos));
      }
    }
  }

  // Method to add a new ToDo item, validating input, and saving the updated list to localStorage
  addToDo(textInput: string): { toDoList: any[], showError: boolean, textInput: string } {
    if (textInput.trim() !== '') {
      toDoController.addToDo(textInput);
      const toDoList = toDoController.getToDos();
      this.saveToLocalStorage(toDoList);  // Save the updated list to localStorage
      textInput = '';  // Clear the input field after adding the ToDo
      this.showError = false;
      return { toDoList, showError: this.showError, textInput };
    } else {
      // Show an error message if the input is empty or just whitespace
      this.showError = true;
      return { toDoList: toDoController.getToDos(), showError: this.showError, textInput };
    }
  }

  // Method to delete a ToDo item by index and save the updated list to localStorage
  deleteToDo(index: number): any[] {
    toDoController.deleteToDo(index);
    const toDoList = toDoController.getToDos();
    this.saveToLocalStorage(toDoList);  // Save the updated list to localStorage after deletion
    return toDoList;
  }

  // Method to enable or disable editing mode for a specific ToDo item and save the updated list to localStorage
  setEditing(index: number, editing: boolean): any[] {
    const toDoList = toDoController.getToDos();
    toDoList[index].editing = editing;
    this.saveToLocalStorage(toDoList);  // Save the updated list to localStorage after editing
    return [...toDoList];
  }

  // Retrieves the current list of ToDo items
  getToDos(): any[] {
    return toDoController.getToDos();
  }

  // Method to save the current list of ToDo items to localStorage
  saveToLocalStorage(toDoList: any[]) {
    // Check if we are running in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('toDoList', JSON.stringify(toDoList));
    }
  }
}
