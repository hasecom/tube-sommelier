'use client';

import { useEffect,useState } from 'react'
import { useParams,useRouter } from 'next/navigation';

import { requestDataWithUserAuth } from '@/func/axios';
import TabComponent from '@/components/userPageComponents/tabComponent'
import { TabData,UserData } from '@/components/userPageComponents/userPageType';
import {Post,Favorite} from '@/components/userPageComponents/userTabs';
import UserProfileComponent from '@/components/userPageComponents/userProfileComponent';
type requestDataProps = {
  userId:string,
}
const ProfilePage = () => {
  const useparams = useParams();
  const userid = typeof useparams.userId === 'string' ? useparams.userId : "";
  const  userData  = UseGetUserProfile(userid);

  const tabsData: TabData[] = [
    {
      name: 'ポスト',
      content: <Post apiEndPoint={"api/playlist/getOtherUserPosted"} userId={userid} />,
    },
    {
      name: 'お気に入り',
      content:<Favorite apiEndPoint={"api/playlist/getOtherUserLiked"} userId={userid} />,
    },
  ];
 
  return (
    <div className="relative">
      <UserProfileComponent userData={userData} />
      <TabComponent tabsData={tabsData} />
    </div>
  )
}
const UseGetUserProfile = (userid:string):UserData | null => {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
      useEffect(()=>{
      getUserProfile();
    },[])
    const getUserProfile = async () => {
    try{
      const response = await requestDataWithUserAuth<requestDataProps>({'userId':userid},'api/user/profile');
      if(response && response.data){ 
        const responseData = response.data;
        if(responseData['CODE'] && responseData['CODE'] == 1){
          setUserData(response.data['RESULT'] as UserData)
        }else{
          throw new Error("");
        }
      }else{
        throw new Error("");
      }
    }catch(e){
      router.push("/single/user-does-not-exist",{ scroll: false });
      setUserData(null)
    }
  }
    return userData;
}
export default ProfilePage;