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
  const [pageNumber, setPageNumber] = useState(1);//ページ数
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
      {showPostView && (
        <>
          {isModalView && (
            <PostModal onModalClose={onModalClose} onModalCancel={onModalCancel} />
          )
          }
          <Content showPostView={animation} onOpenModal={onOpenModal} pageNumber={pageNumber} nextPage={nextPage} returnPage={returnPage} />
          <Background onOpenModal={onOpenModal} showPostView={animation} />
        </>
      )
      }
    </div>
  );
};

export default PostViewComponent;
