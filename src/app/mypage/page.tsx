'use client';

import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'; 

import {userAuth} from '@/func/axios';
import TabComponent from '@/components/userPageComponents/tabComponent'
import { TabData } from '@/components/userPageComponents/userPageType';
import {Post,Favorite} from '@/components/userPageComponents/userTabs';
type responseType = {
  CODE:number,
  RESULT:any,
  MESSAGE:string
}
const Mypage = () => {
  const router = useRouter();
  const [available,setAvailable] = useState(false);
  const tabsData: TabData[] = [
    {
      name: 'ポスト',
      content: <Post />,
    },
    {
      name: 'お気に入り',
      content:<Favorite />,
    },
  ];
  async function auth() { 
    try{
      const response = await userAuth<responseType>('api/mypage');
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
      <TabComponent tabsData={tabsData} />
      )}
    </div>
  )
}
export default Mypage;