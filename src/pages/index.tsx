import TodoList from '@/components/todolist/';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Login from '@/components/login';
import { fetchTodos } from '@/redux/todoThunks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [user]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  //senkronizasyon
  // useEffect(() => {
  //   const unsubscribe = listenForTodosUpdates();

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <main className="font-sans flex flex-col items-center justify-between p-24">
      <div className="list-container flex flex-col">
        {user ? (
          <>
            <Header />
            <TodoList />
            <Footer />
          </>
        ) : (
          <Login />
        )}
      </div>
    </main>
  );
}
