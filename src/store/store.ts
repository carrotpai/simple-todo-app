import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TodoStatus = 'pending' | 'done';

export interface TodoType {
  id: number;
  name: string;
  type: TodoStatus;
  date: string;
}

interface useTodoStoreType {
  todos: Array<TodoType>;
  addTodo: (todo: TodoType) => void;
  fulfillTodos: (todosIds: number[]) => void;
  getTodos: (type: TodoStatus | 'all', search?: string) => Array<TodoType>;
  getTodosLength: () => number;
}

export const useTodoStore = create<useTodoStoreType>()(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (todo) =>
        set(
          produce<useTodoStoreType>((state) => {
            state.todos.push(todo);
          })
        ),
      fulfillTodos: (todosIds) =>
        set(
          produce<useTodoStoreType>((state) => {
            todosIds.forEach(
              (id) => (state.todos[state.todos.findIndex((item) => item.id === id)].type = 'done')
            );
          })
        ),
      getTodos: (type, search) => {
        let todos = get().todos;
        if (type !== 'all') {
          todos = get().todos.filter((item) => item.type === type);
        }
        if (search) {
          todos = todos.filter((item) => item.name.includes(search));
        }
        return todos;
      },
      getTodosLength: () => {
        return get().todos.length;
      },
    }),
    { name: 'todos-storage' }
  )
);
