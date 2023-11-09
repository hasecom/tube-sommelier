import { useState,useEffect } from 'react';
import {  Button } from '@chakra-ui/react';
import { userAuth } from '@/func/axios'
type Props = {
  likeCount:number
}
export const LikeCardComponent:React.FC<Props> =  ({likeCount}) => {
  const [isLike,setIsLike] = useState(false);
  const [viewLikeCount,setViewLikeCount] = useState(0);

  const handleLike = async() => {
    try{
      const response = await userAuth('api/user/action/liked');
      if(response && response.data){ 
        const responseData = response.data;
        if(responseData['CODE'] && responseData['CODE'] == 1){
          setIsLike(true)
          return;
        }
      }
      throw new Error();
    }catch(e){
      
    }
  }
  useEffect(()=>{
    setViewLikeCount(likeCount);
  })
  return (
    <Button flex='1' variant='ghost' onClick={handleLike} >いいね  {viewLikeCount}件</Button>
  )
}