import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from './../../firebase/clientApp';
import {
  getDocs,
  query,
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import store, { RootState } from './store';
import { TodoItem } from './todoSlice';

//pull data from firebase
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const q = query(collection(db, 'todos'));
  const querySnapshot = await getDocs(q);
  const todos: TodoItem[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    todos.push({
      id: doc.id,
      title: data.title,
      completed: data.completed,
    });
  });
  return todos;
});

//add new item to data in firebase
export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (todo: Omit<TodoItem, 'id'>) => {
    const docRef = await addDoc(collection(db, 'todos'), todo);
    // Firestore'dan geri dönen ID ile todo'yu döndür.
    return { id: docRef.id, ...todo };
  },
);

//checked items
export const checkTodoAsync = createAsyncThunk(
  'todos/checkTodoAsync',
  async (id: string) => {
    const docRef = doc(db, 'todos', id);
    const todoSnapshot = await getDoc(docRef);
    const currentTodo = todoSnapshot.data() as TodoItem;

    if (currentTodo) {
      const updatedTodo = { ...currentTodo, completed: !currentTodo.completed };
      await updateDoc(docRef, updatedTodo);
      return updatedTodo;
    }

    throw new Error('Todo not found');
  },
);

//delete item from data
export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (id: string) => {
    const docRef = doc(db, 'todos', id);
    await deleteDoc(docRef);
    return id;
  },
);

//delete all complated todos
export const deleteCompletedTodosAsync = createAsyncThunk(
  'todos/deleteCompletedTodosAsync',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const completedTodos = state.todos.items.filter((todo) => todo.completed);

    for (const todo of completedTodos) {
      const docRef = doc(db, 'todos', todo.id);
      await deleteDoc(docRef);
    }

    return completedTodos.map((todo) => todo.id);
  },
);

//senkronization
export const listenForTodosUpdates = () => {
  const q = query(collection(db, 'todos'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const todos: TodoItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<TodoItem, 'id'>;
      todos.push({
        id: doc.id,
        title: data.title,
        completed: data.completed,
      });
    });

    const todosUpdatedAction = {
      type: fetchTodos.fulfilled.type,
      payload: todos,
    };
    store.dispatch(todosUpdatedAction);
  });

  return unsubscribe;
};
