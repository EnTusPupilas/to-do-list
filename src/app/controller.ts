import { ToDoService } from '../domain/services';

export class ToDoController {
  private service = new ToDoService();

  // Method to add a new ToDo item to the list
  addToDo(content: string) {
    this.service.addToDo(content);
  }

  // Method to delete a ToDo item based on its index in the list
  deleteToDo(index: number) {
    this.service.deleteToDo(index);
  }

  // Method to retrieve the current list of ToDo items
  getToDos() {
    return this.service.getToDos();
  }

  // Method to set the entire ToDo list from localStorage
  setToDos(toDoList: any[]) {
    this.service.setToDos(toDoList); // This will update the list in the service
  }
}
