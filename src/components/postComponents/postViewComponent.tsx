'use client';
import React, { useEffect, useState } from 'react';
import Content from '@/components/postComponents/_content';
import Background from './_background';
import FixedButton from './_button';
const PostViewComponent = () => {

  const [showPostView, setShowPostView] = useState(false);
  const [animation, setAnimation] = useState(false);
  
  const toggleView = () => {
      setShowPostView(!showPostView);
      setAnimation(!animation);
  };

  const closeViews = () => {
    setAnimation(false);
    setTimeout(() => {
      setShowPostView(false);
    }, 800); 
  };

  return (
    <div>
      <FixedButton toggleView={toggleView}/>

      {showPostView && (
        <>
            {/* 要素Aの内容 */}
            <Content showPostView={animation} />
            <Background closeViews={closeViews} showPostView={animation} />
            {/* <div className="p-4">
              <p>要素A</p>
              <button onClick={closeA} className="bg-red-500 text-white p-2 m-2">
                閉じる
              </button>
            </div> */}
            </>
            )
            }
    </div>
  );
};

export default PostViewComponent;
