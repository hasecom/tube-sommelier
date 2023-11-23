'use client'
import React, { createContext, useState, useEffect } from 'react';
import { requestDataWithUserAuth } from '@/func/axios'
import { UserList } from '@/components/cardComponents/cardListType';
const UserListContext = createContext<UserList[] | null>(null);
type userListProvider =  {
  children:React.ReactNode,
  userId:string,
  apiEndpoint:string
}
const  UserListProvider = ({ children,userId,apiEndpoint }:userListProvider)=>
{
  const [page, setPage] = useState(0);
  
  const userList = useGetUserList({userId, page, apiEndpoint});

  return (
    <UserListContext.Provider value={ userList }>
        {children}
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
        setUserList(responseData['RESULT']['USERS']);
        return;
      }
    }
  }
  fetchData();
},[userId]);
  return userList;
}