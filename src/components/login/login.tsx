import React, { useState } from 'react';
import { auth } from './../../../firebase/clientApp';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //admin@gmail.com admin123

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (creationError: any) {
          setError(creationError.message);
        }
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <div className="bg-white text-black p-2 mb-2">
        <p className="">
          Merhaba! <br />
          Şimdilik üyelik oluşturamıyorsunuz. Ancak aşağıdaki bilgilerle projeyi
          deneyimleyebilirsiniz. Ayrıca projeyi bilgisayarınıza PWA olarak da
          inderebilirsiniz.
        </p>
        <ul className="text-grey-300 text-underline text-sm mt-2">
          <li>E-posta: admin@gmail.com</li>
          <li>Şifre: admin123</li>
        </ul>
        <p className="text-red-700 text-sm mt-2">
          Bu uygulamayı masa üstünde kullanabilmek için search barın içinde
          konumlanmış iconlardan indirme butonunu kullan.
        </p>
        <a
          href="https://github.com/idilTugba/PWA_To_Do"
          target="_blank"
          className="text-green-700 text-sm mt-4"
        >
          Projenin GitHub Linki
        </a>
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="mb-2"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login" type="submit">
          Giriş Yap
        </button>
      </form>
      {error && <p className="text-white text-sm mt-2">{error}</p>}
    </div>
  );
};

export default LoginPage;
