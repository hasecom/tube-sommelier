import { useState, useEffect } from 'react';
import { Button,useDisclosure } from '@chakra-ui/react'
import { requestDataWithUserAuth } from '@/func/axios'
import ConsentModal from '@/components/consentModal'
import PopupModal from '../popupModal';
type Props = {
  isFollow: string,
  userId: string,
  handleFollowed:(isFollowState:boolean)=>void;
}
type requestDataProps =  {
  userId:string,
}
export const FollowCardComponent: React.FC<Props> = ({ isFollow, userId, handleFollowed }) => {
  const [isFollowState, setIsFollowState] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showModal,animateFlag,handleOpenModal } = useOpenModal();
  const doSomething = async() => {
      const response = await requestDataWithUserAuth<requestDataProps>({'userId':userId},'api/user/action/follow');
      if(response && response.data){ 
        const responseData = response.data;
        if(responseData['CODE'] && responseData['CODE'] == "1"){
          setIsFollowState(!isFollowState);
          handleOpenModal();
          handleFollowed(isFollowState);
          onClose();
          return;
        }
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
       {showModal && <PopupModal popupMessage={!isFollowState ? 'フォローを解除しました。' : 'フォローしました。' } reverseAnimate={animateFlag} />}
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
const useOpenModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [animateFlag, setAnimateFlag] = useState(false);
  const handleOpenModal = () =>  {
    setShowModal(true);
  }
  useEffect(()=>{
    if(!showModal) return;
    const handleAnimate = setTimeout(() => {
      setAnimateFlag(true);
    }, 1000);
    const closeModal = setTimeout(() => {
      setShowModal(false);
      setAnimateFlag(false);
    }, 2000);
    return () => {
      clearTimeout(handleAnimate);
      clearTimeout(closeModal);
    };
  },[showModal]);
  return {
    showModal,
    animateFlag,
    handleOpenModal
  }
}