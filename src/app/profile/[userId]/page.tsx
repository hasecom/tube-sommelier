'use client';

import { useEffect,useState } from 'react'
import { useParams,useRouter } from 'next/navigation';

import { requestDataWithUserAuth } from '@/func/axios';
import TabComponent from '@/components/userPageComponents/tabComponent'
import { TabData } from '@/components/userPageComponents/userPageType';
import {Post,Favorite} from '@/components/userPageComponents/userTabs';
type requestDataProps = {
  userId:string,
}
const ProfilePage = () => {
  const router = useRouter();
  const useparams = useParams()
  const userid = typeof useparams.userId === 'string' ? useparams.userId : "";

  const tabsData: TabData[] = [
    {
      name: 'ポスト',
      content: <Post apiEndPoint={"api/playlist/getOtherUserPosted"} />,
    },
    {
      name: 'お気に入り',
      content:<Favorite apiEndPoint={"api/playlist/getOtherUserLiked"} />,
    },
  ];
  async function getUserProfile() { 
    try{
      const response = await requestDataWithUserAuth<requestDataProps>({'userId':userid},'api/user/profile');
      if(response && response.data){ 
        const responseData = response.data;
        if(responseData['CODE'] && responseData['CODE'] == 1){
          return;
        }
      }else{
        throw new Error("エラーが発生しました。");
      }
    }catch(e){
      alert(e.message);
    }
}
useEffect(() => {
  getUserProfile();
});

  return (
    <div className="relative">
      <TabComponent tabsData={tabsData} />
    </div>
  )
}
export default ProfilePage;