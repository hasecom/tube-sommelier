'use client';
import { useState } from 'react';
import { useParams,useRouter } from 'next/navigation';

const RegistForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async() => {
    if(userName == ""){
      setErrorMessage('ユーザ名を入力してください。');
    }else if (userId.length < 5) {
      setErrorMessage('ユーザIDは5文字以上必要です。');
    } else if (!email.includes('@')) {
      setErrorMessage('有効なメールアドレスを入力してください。');
    } else if (password.length < 5 || !/^[0-9a-zA-Z]+$/.test(password)) {
      setErrorMessage('パスワードは5文字以上の英数字で入力してください。');
    } else {
      let params = new URLSearchParams();
      params.append('email',email);
      params.append('password',password);
      params.append('userId',userId);
      params.append('userName',userName);
      const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + 'api/regist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:params,
      });
      if (response.ok) {
        const data = await response.json();
        if(data.CODE){
          router.push("/single/temp-regist-success",{ scroll: false });
        }else{
          setErrorMessage(data.MESSAGE);
        }
      } else {
        router.push("/single/error",{ scroll: false });
      }
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
          <label htmlFor="userName" className="block text-sm font-medium text-gray-600">
            ユーザ名
          </label>
          <input
            type="text"
            id="userName"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-theme"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
        {errorMessage && <p className="text-red-500 text-sm py-2 text-center">{errorMessage}</p>}
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
