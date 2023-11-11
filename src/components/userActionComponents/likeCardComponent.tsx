import { useState,useEffect } from 'react';
import {  Button } from '@chakra-ui/react';
import { requestDataWithUserAuth } from '@/func/axios'
type Props = {
  likeCount:number,
  playlistUid:string,
  isLiked:string
}
type requestDataProps =  {
  playlistUid:string,
}
export const LikeCardComponent:React.FC<Props> =  ({likeCount,playlistUid,isLiked}) => {
  const [isLikedState,setIsLikedState] = useState(false);
  const [viewLikeCount,setViewLikeCount] = useState(0);

  const handleLike = async() => {
    try{
      const response = await requestDataWithUserAuth<requestDataProps>({'playlistUid':playlistUid},'api/user/action/liked');
      if(response && response.data){ 
        const responseData = response.data;
        if(responseData['CODE'] && responseData['CODE'] == 1){
          setIsLikedState(!isLikedState);
          setViewLikeCount(isLikedState ? Number(viewLikeCount) - 1 : Number(viewLikeCount) + 1);
          return;
        }
      }
      throw new Error();
    }catch(e){
      
    }
  }
  useEffect(()=>{
    setViewLikeCount(likeCount);
    setIsLikedState(isLiked == "1");
  }, [likeCount, isLiked])
  return (
    <Button flex='1' variant='ghost' onClick={handleLike}>
      {!isLikedState ? (
        <span className="i-lucide-heart text-2xl"></span>
      ) : (
        <span className="i-mdi-heart text-2xl bg-red-500"></span>
      )}
      {viewLikeCount}件
    </Button>
  )
}