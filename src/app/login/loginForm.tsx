'use client';
import { useState } from 'react';

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    if (!userId || !password) {
      alert('ユーザIDとパスワードは入力必須です。');
    } else {
      const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + 'api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId,password}),
      });

      if (response.ok) {
        // ログイン成功時の処理
        window.location.href = '/mypage'; // マイページへの遷移
      } else {
        // ログイン失敗時の処理
        alert('ログインに失敗しました。');
      }
    }
  };

  return (
    <div className="py-10 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-theme">ログイン</h2>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-600">
            ユーザID
          </label>
          <input
            type="text"
            id="userId"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-theme"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            パスワード
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-theme"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-theme text-white p-3 rounded-md bg-red-500 hover:bg-red-300 focus:outline-none focus:ring focus:bg-red-300 mb-4"
        >
          ログイン
        </button>
        <p className="text-center text-theme">
          <a href="#">パスワードを忘れた</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
