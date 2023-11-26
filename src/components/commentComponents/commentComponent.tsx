'use client';
import React, { useState } from 'react';
import { Button } from '@chakra-ui/react'
import CommentList from '@/components/commentComponents/commentList';
import Background from '@/components/commentComponents/_background';
import PostModal from '@/components/commentComponents/_postModal';
import PopupModal from '@/components/popupModal';
type Props =  {
  commentCount:number,
  playlistUid:string
}
const CommentComponent:React.FC<Props> = ({commentCount,playlistUid}) => {
  const [showPostView, setShowPostView] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [isModalView, setModalView] = useState(false);
  const [page, setPage] = useState(0);
  const [isPopupModalView,setPopupModalView] = useState(false);//ポップアップ
  const [popupMessage,setPopupMessage] = useState('');//ポップアップ
  const [reverseAnimate,setreverseAnimate] = useState(false);//ポップアップ
  const [isEdit,setIsEdit] = useState(false);
  const [timestamp,setTimestamp] = useState(0);
  const toggleView = () => { //投稿画面開閉
    setShowPostView(!showPostView);
    setAnimation(!animation);
    setTimestamp(Date.now())
  };
  const handleEdit = (boolEdit:boolean) =>  {
    setIsEdit(boolEdit);
  }
  const handlePopup = (message:string) => {
    setPopupMessage(message);
    setPopupModalView(!isModalView);
    setTimeout(() => {
      setreverseAnimate(true);
    }, 3000);
    setTimeout(() => {
      setPopupModalView(false);
    }, 5000);
  } 
  const closeViews = () => { //投稿画面閉じる
    setAnimation(false);
    setTimeout(() => {
      setShowPostView(false);
    }, 400);
  };
  const onModalClose = () => {//警告モーダル閉じる(投稿画面も併せて)
    setModalView(false)
    closeViews();
  }
  const onOpenModal = () => {//警告モーダルを開く
    if(isEdit){
      setModalView(true)
    }else{
      closeViews();
    }
  }
  const onModalCancel = () => {//警告モーダルを閉じる(キャンセル)
    setTimeout(() => {
      setModalView(false);
    }, 800);
  }

  return (
    <>
      <Button flex='1' variant='ghost' onClick={toggleView} >コメント  {commentCount}件</Button>
      {isPopupModalView && ( <PopupModal popupMessage={popupMessage}  reverseAnimate={reverseAnimate}></PopupModal> )}
      {showPostView && (
        <>
          {isModalView && (
            <PostModal onModalClose={onModalClose} onModalCancel={onModalCancel} />
          )}
          <CommentList showPostView={animation} timestamp={timestamp} closeViews={closeViews} onOpenModal={onOpenModal} page={page} handlePopup={handlePopup} handleEdit={handleEdit} playlistUid={playlistUid} />
          <Background onOpenModal={onOpenModal} showPostView={animation} />
        </>
      )
      }
    </>
  );
};

export default CommentComponent;
