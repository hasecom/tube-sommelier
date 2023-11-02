'use client';
import React, { useState } from 'react';
import Content from '@/components/postComponents/_content';
import Background from './_background';
import FixedButton from './_button';
import PostModal from './_postModal';
import PopupModal from '@/components/popupModal';
const PostViewComponent = () => {
  const [showPostView, setShowPostView] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [isModalView, setModalView] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);//ページ数
  const [isPopupModalView,setPopupModalView] = useState(false);//ポップアップ
  const [popupMessage,setPopupMessage] = useState('');//ポップアップ
  const [reverseAnimate,setreverseAnimate] = useState(false);//ポップアップ
  const [timestamp,setTimestamp] = useState(0);
  const toggleView = () => { //投稿画面開閉
    setShowPostView(!showPostView);
    setAnimation(!animation);
    setTimestamp(Date.now())
    setPageNumber(1);
  };
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
    setModalView(true)
  }
  const onModalCancel = () => {//警告モーダルを閉じる(キャンセル)
    setTimeout(() => {
      setModalView(false);
    }, 800);
  }
  const nextPage = () => {
    setPageNumber(pageNumber+1);
  }
  const returnPage = () => {
    if(pageNumber < 2) return;
    setPageNumber(pageNumber-1);
  }
  return (
    <div>
      <FixedButton toggleView={toggleView} />
      {isPopupModalView && ( <PopupModal popupMessage={popupMessage}  reverseAnimate={reverseAnimate}></PopupModal> )}
      {showPostView && (
        <>
          {isModalView && (
            <PostModal onModalClose={onModalClose} onModalCancel={onModalCancel} />
          )}
          <Content showPostView={animation} timestamp={timestamp} closeViews={closeViews} onOpenModal={onOpenModal} pageNumber={pageNumber} nextPage={nextPage} returnPage={returnPage} handlePopup={handlePopup} />
          <Background onOpenModal={onOpenModal} showPostView={animation} />
        </>
      )
      }
    </div>
  );
};

export default PostViewComponent;
