import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
  addTodoAsync,
  checkTodoAsync,
  deleteCompletedTodosAsync,
  deleteTodoAsync,
  fetchTodos,
} from './todoThunks';

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

interface InitialStateType {
  items: TodoItem[];
  filters: string;
}

const initialState: InitialStateType = {
  items: [
    {
      id: '1',
      title: 'pink floyd',
      completed: true,
    },
  ],
  filters: 'All',
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // addItem: {
    //   reducer: (state, action: PayloadAction<TodoItem>) => {
    //     state.items.push(action.payload);
    //   },
    //   prepare: ({ title }) => {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         completed: false,
    //         title,
    //       },
    //     };
    //   },
    // },
    checkedItem: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      item && (item.completed = !item.completed);
    },
    nameOfFilters: (state, action: PayloadAction<string>) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(deleteCompletedTodosAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => !action.payload.includes(item.id),
        );
      })
      .addCase(checkTodoAsync.fulfilled, (state, action) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        if (item) {
          item.completed = action.payload.completed;
        }
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const selectTodos = (state: RootState) => state.todos.items;
export const selectFilters = (state: RootState) => state.todos.filters;
export const selectFilteredTodos = (state: RootState) => {
  switch (state.todos.filters) {
    case 'All':
      return state.todos.items;
    case 'Completed':
      return state.todos.items.filter((item) => item.completed);
    case 'Active':
      return state.todos.items.filter((item) => !item.completed);
    default:
      return state.todos.items;
  }
};

export const { checkedItem, nameOfFilters } = todoSlice.actions;
export default todoSlice.reducer;
