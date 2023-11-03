'use client';
import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation';
import {userAuth} from '@/func/axios';
import TabComponent from '@/components/userPageComponents/tabComponent'
type responseType = {
  CODE:number,
  RESULT:any,
  MESSAGE:string
}
const Mypage = () => {
  const router = useRouter();
  const [available,setAvailable] = useState(false);
  async function auth() { 
  const response = await userAuth<responseType>('api/mypage');
    try{
      if(response && response.data){ 
        const responseData = response.data;
        if(responseData['CODE'] && responseData['CODE'] == 1){
          setAvailable(true)
          return;
        }
      }
      throw new Error();
    }catch(e){
      router.push("/single/login-failed",{ scroll: false });
    }
}
useEffect(() => {
  auth();
}, []);

  return (
    <div className="relative">
      {available && (
      <TabComponent />
      )}
    </div>
  )
}
export default Mypage;