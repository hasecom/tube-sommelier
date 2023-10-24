'use client';
import React, { useEffect, useState } from 'react';
import Content from '@/components/postComponents/_content';
import Background from './_background';
import FixedButton from './_button';
import PostModal from './_postModal';
const PostViewComponent = () => {

  const [showPostView, setShowPostView] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [isModalView, setModalView] = useState(false);
  const toggleView = () => { //投稿画面開閉
      setShowPostView(!showPostView);
      setAnimation(!animation);
  };
  const closeViews = () => { //投稿画面閉じる
    setAnimation(false);
    setTimeout(() => {
      setShowPostView(false);
    }, 400); 
  };
  const onModalClose = () =>{
    setModalView(false)
    closeViews();
  }
  const onOpenModal = () =>{
    setModalView(true)
  }
  const onModalCancel = () =>{
    setTimeout(() => {
      setModalView(false);
    },800);
  }
  return (
    <div>
      <FixedButton toggleView={toggleView}/>

      {showPostView && (
        <>
            {isModalView && (
              <PostModal onModalClose={onModalClose} onModalCancel={onModalCancel} />
            )
            }
            <Content showPostView={animation} onOpenModal={onOpenModal}  />
            <Background onOpenModal={onOpenModal} showPostView={animation} />
            </>
            )
            }
    </div>
  );
};

export default PostViewComponent;
