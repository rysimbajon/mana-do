import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_NAME,
  SET_TODO,
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
    switch (action.type) {
        case CREATE_TODO:
            state.todos.push(action.payload);
                return {
                    ...state
                };
        case SET_TODO:
                return {
                    ...state,
                    todos: action.payload,
                };
        case UPDATE_TODO_STATUS:
            const index2 = action.payload.todoId
            const status = state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
            let statusRow = state.todos;
            statusRow[index2].status = status;
                return {
                    ...state,
                    // todos: state.todos
                    todos: statusRow
                }
        case TOGGLE_ALL_TODOS:
            const tempTodos = state.todos.map((e)=>{
                return {
                    ...e,
                    status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
                }
        })
                return {
                    ...state,
                    todos: tempTodos
                }
        case DELETE_TODO:
            const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
            state.todos.splice(index1, 1);
                return {
                    ...state,
                    todos: state.todos
                }
        case UPDATE_TODO_NAME:
            const index3 = action.payload.todoId;
            const name = action.payload.todoName;
            let statusRowToUpdate = state.todos;
            statusRowToUpdate[index3] = { ...statusRowToUpdate[index3], content: name };
                return {
                    ...state,
                    todos: statusRowToUpdate
                }
        case DELETE_ALL_TODOS:
                return {
                    todos: []
                }
        default:
                return state;
  }
}

export default reducer;