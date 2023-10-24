import React, { useState } from 'react';
import Header from "./_header";
import PlayListAddBasicInfo from "./__playlistAddBasicInfo";
import PlayListAddLink from "./__playlistAddLink";

type Props = {
  showPostView: boolean,
  onOpenModal:()=>void
};

const Content: React.FC<Props> = ({ showPostView,onOpenModal  }) => {
  const aa = 1;
  const [isNextBtnClickable, setIsNextBtnClickable] = useState(false);//次へ
  const handleNextBtnClick = () => {
    // 一定の条件を満たしたらクリック可能にする
    if (aa == 1) {
      setIsNextBtnClickable(true);
    }
  };
  return (
    <>
      <div className={`${showPostView ? 'animate-slide-in-bottom' : 'animate-slide-out-bottom'}  z-30 bg-white w-full fixed  bottom-0 h-3/4 left-0 right-0 `}>
        <Header handleNextBtnClick={handleNextBtnClick} isNextBtnClickable={isNextBtnClickable} onOpenModal={onOpenModal} />
        <PlayListAddBasicInfo />
      </div>
    </>
  );
};

export default Content;
