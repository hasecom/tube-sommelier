'use client';
import { useParams } from 'next/navigation';
import MessageComponent from '@/components/messageComponent';

const componentMapping:{[key:string]:JSX.Element} = {
  "temp-regist-success":<MessageComponent message={`仮登録が完了しました。\n\n登録したメールアドレスに、本登録URLをお送りしました。\n 本登録URLの有効期限は30分です。`} isDisplayButton={false} />,
  "regist-success":<MessageComponent message={`登録が完了しました。\n 以下より、マイページにお進みください。 `} linkPath="/mypage" isDisplayButton={true} buttonMessage="マイページ"  />,
  "regist-failed":<MessageComponent message="URLの期限が切れています。再登録してください。" linkPath="/" isDisplayButton={true} buttonMessage="ホームに戻る"  />,
  "error": <MessageComponent  message="エラーが発生しました。" linkPath="/" isDisplayButton={true} buttonMessage="ホームに戻る" />,
  "404": <MessageComponent  message="このページは存在しません。" linkPath="/" isDisplayButton={true} buttonMessage="ホームに戻る" />,
  "login-failed": <MessageComponent  message={`ログイン期限が切れました。\n再ログインしてください。`} linkPath="/login" isDisplayButton={true} buttonMessage="ログイン" />,
  "user-does-not-exist": <MessageComponent  message={`ユーザの取得に失敗したか、ユーザが存在しません。`} linkPath="/" isDisplayButton={true} buttonMessage="ホームに戻る" />,
};
const SinglePage = () =>  {
  const useparams = useParams();
  const name =  useparams.type as string;
  // URLパラメータの値をもとにコンポーネントを選択
  const selectedComponent = componentMapping[name] || componentMapping['404'];
  return (
    <div>
      {selectedComponent}
    </div>
  );
}

export default SinglePage;
