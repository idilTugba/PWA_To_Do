import { AppDispatch } from '@/redux/store';
import { addTodoAsync } from '@/redux/todoThunks';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function Header() {
  const [todoValue, setTodoValue] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();

  const handleAddTodo = () => {
    if (todoValue) {
      dispatch(
        addTodoAsync({
          title: todoValue,
          completed: false,
        }),
      );
    }

    setTodoValue('');
  };

  return (
    <div className="list-container__form container-yellow">
      <input
        name=""
        type="text"
        placeholder="list item"
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
      />
      <button className="add-item" onClick={handleAddTodo}>
        Add
      </button>
    </div>
  );
}

export default Header;
