import React, { useState } from 'react';
import Header from "./_header";
import PlayListAddBasicInfo from "./__playlistAddBasicInfo";
import PlayListAddLink from './__playlistAddLink';
import PlayListSortVideos from './__playlistSortVideos';
import { videoType } from '@/components/postComponents/searchType'
type Props = {
  showPostView: boolean,
  onOpenModal:()=>void,
  pageNumber:number,
  nextPage:()=>void,
  returnPage:()=>void
};

const Content: React.FC<Props> = ({ showPostView,onOpenModal,pageNumber,nextPage,returnPage }) => {
  const [isNextBtnClickable, setIsNextBtnClickable] = useState(false);//次へ
  const handleNextBtnClick = (isAvailableBool:boolean):void => {//ボタンクリックを可能状態に変更
      setIsNextBtnClickable(isAvailableBool);
  };
  const [selectVideos,setSelectVideos] = useState<videoType[]>([]) ;//選択したvideo

  return (
    <>
      <div className={`${showPostView ? 'animate-slide-in-bottom' : 'animate-slide-out-bottom'}  z-30 bg-white w-full fixed  bottom-0 h-3/4 left-0 right-0 `}>
        <Header onOpenModal={onOpenModal} pageNumber={pageNumber} returnPage={returnPage} />
        {pageNumber === 1 && <PlayListAddBasicInfo handleNextBtnClick={handleNextBtnClick} isNextBtnClickable={isNextBtnClickable} nextPage={nextPage} /> }
        {pageNumber === 2 && <PlayListAddLink selectVideos={selectVideos} setSelectVideos={setSelectVideos}  handleNextBtnClick={handleNextBtnClick} isNextBtnClickable={isNextBtnClickable} nextPage={nextPage} /> }
        {pageNumber === 3 && <PlayListSortVideos  /> }
      </div>
    </>
  );
};


export default Content;
