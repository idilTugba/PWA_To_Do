import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { TodoItem, checkedItem, selectFilteredTodos } from '@/redux/todoSlice';
import { deleteTodoAsync, checkTodoAsync } from '@/redux/todoThunks';

const ListItems = () => {
  const selectedTodos = useSelector(selectFilteredTodos);
  const dispatch: AppDispatch = useDispatch();
  const handleCheckItem = (id: string) => {
    dispatch(checkedItem({ id }));
    dispatch(checkTodoAsync(id));
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are You Sure?')) dispatch(deleteTodoAsync(id));
  };

  return (
    <>
      {selectedTodos.map((item: TodoItem) => (
        <div
          className={`list-container__list-item ${
            item.completed ? 'completed' : ''
          }`}
          key={item.id}
        >
          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={(e) => handleCheckItem(item.id)}
            />
            <span className="checkmark"></span>
          </label>

          <div>{item.title}</div>
          <span
            onClick={(e) => handleDeleteItem(item.id)}
            className="icon icon-close"
          >
            X
          </span>
        </div>
      ))}
    </>
  );
};

export default ListItems;
