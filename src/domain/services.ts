import type { ToDo } from './models';

export class ToDoService {
  private toDoList: ToDo[] = [];

  // Adds a new ToDo item to the list with the specified content
  addToDo(content: string) {
    this.toDoList.push({ content, editing: false, checked: false });
  }

  // Removes a ToDo item from the list based on its index
  deleteToDo(index: number) {
    this.toDoList.splice(index, 1);
  }

  // Returns the current list of ToDo items
  getToDos() {
    return this.toDoList;
  }

  // Method to set the entire ToDo list
  setToDos(toDoList: ToDo[]) {
    this.toDoList = toDoList;  // Overwrites the current list with the one passed as a parameter
  }
}
