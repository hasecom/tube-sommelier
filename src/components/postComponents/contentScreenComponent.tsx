'use client';
import React, { useState } from 'react';
import Content from '@/components/postComponents/contentComponent';
const ContentScreen = () => {
  const [showA, setShowA] = useState(false);
  const [animationStart, setAnimationStart] = useState(false);
  const toggleA = () => {
    setShowA(!showA);
    setAnimationStart(true);
  };

  const closeA = () => {
    setShowA(false);
    setAnimationStart(false);
  };

  return (
    <div>
      <button
        className="fixed bottom-4 right-4 p-4 bg-red-500 rounded-full text-white z-10"
        onClick={toggleA}
      >
        ボタン
      </button>

      {showA && animationStart && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-20 animate-slide-in-bottom"
          onClick={closeA}
        >
          <div
            className="bg-white w-full max-w-screen-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 要素Aの内容 */}
            <Content />
            
            {/* <div className="p-4">
              <p>要素A</p>
              <button onClick={closeA} className="bg-red-500 text-white p-2 m-2">
                閉じる
              </button>
            </div> */}
          </div>
        </div>
      )
      }
    </div>
  );
};

export default ContentScreen;
