import { useState, useEffect } from 'react';
import { Button,useDisclosure } from '@chakra-ui/react'
import { requestDataWithUserAuth } from '@/func/axios'
import ConsentModal from '@/components/consentModal'
type Props = {
  isFollow: string,
  userId: string
}
type requestDataProps =  {
  userId:string,
}
export const FollowCardComponent: React.FC<Props> = ({ isFollow, userId }) => {
  const [isFollowState, setIsFollowState] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const doSomething = async() => {
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
    onClose();
  }
  const handleFollow = () => {
    if(isFollowState){
        onOpen();
      }else{
        doSomething();
      }
  }
  useEffect(() => {
    setIsFollowState(isFollow == "1");
  }, [isFollow])
  return (
    <>
      <ConsentModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} doSomething={doSomething} />
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