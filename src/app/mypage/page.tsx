'use client';
import { useParams,useRouter } from 'next/navigation';
const Mypage = () => {
  const router = useRouter();
  async function postData() {
    // let params = new URLSearchParams();
    // params.append('uid',"a");
    const jsonData = {
      key1: 'value1',
      key2: 'value2'
    };
    const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + 'api/mypage', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(jsonData)
    });
    if (response.ok) {
      // 認証成功時の処理
      const data = await response.json();
      console.log(data.CODE)
      if(data.CODE){

      
      }else{
        router.push("/login",{ scroll: false });
      }
    } else {
      router.push("/login",{ scroll: false });
    }
}
postData();
  return (
    <div>
マイペー
    </div>
  )
}
export default Mypage;