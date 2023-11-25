import { useState,useEffect } from 'react';
import {  Button } from '@chakra-ui/react';
import { requestDataWithUserAuth } from '@/func/axios'
import { ListItem } from '@/components/userPageComponents/userPageType'
import ListModalComponent from '@/components/modalComponents/listModalComponent'
type Props = {
  likeCount:number,
  playlistUid:string,
  isLiked:string
}
type requestDataProps =  {
  playlistUid:string,
}
const lists:ListItem[] = [
  {
    TAB_TITLE:"いいねしたユーザ",
    API_ENDPOINT:'api/list/liked'
  }
]
export const LikeCardComponent:React.FC<Props> =  ({likeCount,playlistUid,isLiked}) => {
  const [isLikedState,setIsLikedState] = useState(false);
  const [viewLikeCount,setViewLikeCount] = useState(0);
  const [showListModal,setShowListModal] = useState(false);
  const [page,setPage] = useState(0);

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
  const handleFollowButton = (argPage:number) => {
    setPage(argPage);
    setShowListModal(true);
  }
  useEffect(()=>{
    setViewLikeCount(likeCount);
    setIsLikedState(isLiked == "1");
  }, [likeCount, isLiked])
  return (
    <>
    <Button flex='1' variant='ghost' onClick={()=>{handleLike()}}>
      {!isLikedState ? (
        <span className="i-lucide-heart text-2xl" ></span>
      ) : (
        <span className="i-mdi-heart text-2xl bg-red-500"></span>
      )}
      <span className="ml-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleFollowButton(0); }}>
        {viewLikeCount}件
      </span>
    </Button>
        {showListModal && (
          <ListModalComponent page={page} lists={lists} requestId={playlistUid} showListModal={showListModal} setShowListModal={setShowListModal} />
        )}
    </>
  )
}