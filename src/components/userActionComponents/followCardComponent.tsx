import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react'
import { requestDataWithUserAuth } from '@/func/axios'
type Props = {
  isFollow: string,
  userId: string
}
type requestDataProps =  {
  userId:string,
}
export const FollowCardComponent: React.FC<Props> = ({ isFollow, userId }) => {
  const [isFollowState, setIsFollowState] = useState(false);
  const handleFollow = async() => {
    try{
      const response = await requestDataWithUserAuth<requestDataProps>({'userId':userId},'api/user/action/follow');
      if(response && response.data){ 
        const responseData = response.data;
        if(responseData['CODE'] && responseData['CODE'] == 1){
          setIsFollowState(!isFollowState);
          return;
        }
      }
      throw new Error();
    }catch(e){
      
    }
  }
  useEffect(() => {
    setIsFollowState(isFollow == "1");
  }, [isFollow])
  return (
    <>
      {!isFollowState ? (
        <Button
          onClick={handleFollow}
          variant='solid'
          borderRadius='full'
          colorScheme='red'
          fontSize='13px'
          fontWeight='light'
          px='9px'
          className="bg-red-500 text-white
     hover:bg-red-600 active:bg-red-400 focus:outline-none"
        >フォローする</Button>
      ) : (
        <Button
          onClick={handleFollow}
          borderRadius='full'
          variant='outline'
          colorScheme="red"
          fontSize='13px'
          fontWeight='light'
          px='9px'
        >フォロー中</Button>
      )}
    </>
  )
}