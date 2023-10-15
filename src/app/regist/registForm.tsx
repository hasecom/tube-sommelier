'use client';
import { useState } from 'react';

const RegistForm = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (userId.length < 5) {
      alert('ユーザIDは5文字以上必要です。');
    } else if (!email.includes('@')) {
      alert('有効なメールアドレスを入力してください。');
    } else if (password.length < 5 || !/^[0-9a-zA-Z]+$/.test(password)) {
      alert('パスワードは5文字以上の英数字で入力してください。');
    } else {
      // 登録処理をここに追加
    }
  };

  return (
    <div className="py-10 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-theme">新規登録</h2>
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-theme"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleRegister}
          className="w-full bg-theme text-white p-3 rounded-md bg-red-500 hover:bg-red-300 focus:outline-none focus:ring focus:bg-red-300 mb-4"
        >
          登録する
        </button>
      </div>
    </div>
  );
};

export default RegistForm;
