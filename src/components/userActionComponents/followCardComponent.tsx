import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react'
type Props = {
  isFollow: string,
  userId: string
}
export const FollowCardComponent: React.FC<Props> = ({ isFollow, userId }) => {
  const [isFollowState, setIsFollowState] = useState(false);
  useEffect(() => {
    setIsFollowState(isFollow == "1");
  }, [isFollow])
  return (
    <>
      {!isFollowState ? (
        <Button
          borderRadius='full'
          variant='outline'
          colorScheme="red"
          fontSize='13px'
          fontWeight='light'
          px='9px'
        >フォローする</Button>
      ) : (
        <Button
        variant='solid'
        borderRadius='full'
        colorScheme='red'
        fontSize='13px'
        fontWeight='light'
        px='9px'
        className="bg-red-500 text-white
        hover:bg-red-600 active:bg-red-400 focus:outline-none"
      >フォロー中</Button> 
)}
    </>
  )
}