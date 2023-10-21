'use client';
import { useState } from 'react';
import { useParams,useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  let params = new URLSearchParams();

  const handleLogin = async() => {
    params.append('userId',userId);
    params.append('password',password);
    if (!userId || !password) {
      setErrorMessage('ユーザIDとパスワードは入力必須です。');
    } else {
      const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + 'api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:params,
      });
      if (response.ok) {
        // ログイン成功時の処理
        const data = await response.json();
        if(data.CODE){
          setErrorMessage('');
        //  router.push("/mypage",{ scroll: false });
        }else{
          setErrorMessage(data.MESSAGE);
        }
      } else {
        setErrorMessage('サーバーエラーが発生しました。再試行してください。');
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
        {errorMessage && <p className="text-red-500 text-sm py-2 text-center">{errorMessage}</p>}
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
