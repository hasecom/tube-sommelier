'use client'
import React, { createContext, useState, useEffect,useContext } from 'react';
import { requestDataWithUserAuth } from '@/func/axios'
import { UserList } from '@/components/cardComponents/cardListType';
const UserListContext = createContext<UserList[] | null>(null);
type userListProvider =  {
  children:React.ReactNode,
  userId:string,
  apiEndpoint:string
}
const  UserListProvider = ({ children,userId,apiEndpoint }:userListProvider)=>{
  const [page, setPage] = useState(0);
  const [oldGodBodyHeight,setOldGodBodyHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const userList =useGetUserList({userId, page, apiEndpoint});
  
  const handleScroll = (e) => {
    // スクロール位置を取得して state を更新
    const height = e.target.clientHeight;
    if (scrollY > (height*0.4) && height !== oldGodBodyHeight ) { //ボディ全体の60%を超えたら
      setOldGodBodyHeight(height)
      setPage(page+1);
    }
    setScrollY(e.target.scrollTop);
  };
  return (
    <UserListContext.Provider value={ userList }>
      <div
          style={{ overflowY: 'scroll', height: '60vh' }}
          onScroll={handleScroll}>
        {children}
      </div>
    </UserListContext.Provider>
  )
}
export {UserListProvider,UserListContext}

type UseGetUserList = {
  userId:string,
  page:number,
  apiEndpoint:string
}
type requestDataProps =  {
  userId:string,
  page:number
}
const useGetUserList = ({userId,page,apiEndpoint}:UseGetUserList) =>  {
  const [userList,setUserList] = useState<UserList[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
    const response = await requestDataWithUserAuth<requestDataProps>({'userId':userId,'page':page},apiEndpoint);
    if(response && response.data){ 
      const responseData = response.data;
      if(responseData['CODE'] && responseData['CODE'] == "1"){
        if(page !== 0 &&  userList){//0(初回ロード以外)
          const additionUserList = responseData['RESULT']['USERS'];
          setUserList([...userList, ...additionUserList]);
        }else{
          setUserList(responseData['RESULT']['USERS']);
        }
        
        return;
      }
    }
  }
  fetchData();
},[page]);
  return userList;
}