import { AppDispatch } from '@/redux/store';
import { nameOfFilters, selectFilters, selectTodos } from '@/redux/todoSlice';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const filtersName = ['All', 'Completed', 'Active'];

function Footer() {
  const activeFilter = useSelector(selectFilters);
  const items = useSelector(selectTodos);
  const dispatch: AppDispatch = useDispatch();

  return (
    <footer className="flex justify-between container-yellow mt-6 items-center px-6 ">
      <span>{items.filter((item) => !item.completed).length} active</span>
      <span>{items.filter((item) => item.completed).length} complated</span>
      <ul>
        {filtersName.map((item) => (
          <li className="inline-block" key={item}>
            <button
              onClick={(e) => dispatch(nameOfFilters(item))}
              className={`p-4 rounded-sm ${
                activeFilter == item ? 'active ring ring-violet-300' : ''
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
