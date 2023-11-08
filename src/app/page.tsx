'use client'
import PostViewComponent from '@/components/postComponents/postViewComponent';
import axios, { AxiosResponse } from 'axios';
import {useEffect} from 'react';
export default function Home() {
  useEffect(()=>{
    let data = {"aa":"b"};
    const response =  axios.post(
      process.env.NEXT_PUBLIC_API_PATH + "top",
      data,
      {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
    )
  })

  return (
    <>
      <main>
      </main>
      <PostViewComponent />
    </>
  )
}
