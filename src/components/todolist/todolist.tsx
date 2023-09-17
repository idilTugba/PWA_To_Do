import React from 'react';
import ListItems from './listitem';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { selectTodos } from '@/redux/todoSlice';
import { deleteCompletedTodosAsync } from '@/redux/todoThunks';

const TodoList = () => {
  const list = useSelector(selectTodos);

  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="list-container__list-content">
      <h2>
        TODO LIST{' '}
        <button
          onClick={() => dispatch(deleteCompletedTodosAsync())}
          className={`${
            list.filter((item) => item.completed === true).length > 0
              ? `visible`
              : 'invisible'
          }`}
        >
          Delete All
        </button>
      </h2>
      <ListItems />
    </div>
  );
};

export default TodoList;
