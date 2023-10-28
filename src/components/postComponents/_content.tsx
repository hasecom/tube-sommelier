import React, { useState, useEffect } from 'react';
import Header from "./_header";
import PlayListAddBasicInfo from "./__playlistAddBasicInfo";
import PlayListAddLink from './__playlistAddLink';
import PlayListSortVideos from './__playlistSortVideos';
import { videoType, formType } from '@/components/postComponents/searchType'
type Props = {
  showPostView: boolean,
  onOpenModal: () => void,
  pageNumber: number,
  nextPage: () => void,
  returnPage: () => void
};

const Content: React.FC<Props> = ({ showPostView, onOpenModal, pageNumber, nextPage, returnPage }) => {
  const [isNextBtnClickable, setIsNextBtnClickable] = useState(false);//次へ
  const handleNextBtnClick = (isAvailableBool: boolean): void => {//ボタンクリックを可能状態に変更
    setIsNextBtnClickable(isAvailableBool);
  };
  const [selectVideos, setSelectVideos] = useState<videoType[]>([]);//選択したvideo
  const [searchRequestData, setSearchRequestData] = useState<formType>({ playlistTitle: '', categoryCode: '', videos: [] });
  const handlePlaylistTitleChange = (newTitle: string) => {
    setSearchRequestData((prevData) => ({ ...prevData, playlistTitle: newTitle, }));
  };
  const handlePlaylistCategoryChange = (newCategory: string) => {
    setSearchRequestData((prevData) => ({ ...prevData, categoryCode: newCategory, }));
  };
  const handlePlaylistVideoChange = (newVideos: videoType[]) => {
    setSearchRequestData((prevData) => ({ ...prevData, videos: newVideos, }));
  };
  useEffect(() => {
    handlePlaylistVideoChange(selectVideos)
  }, [selectVideos]);
  const handleRegistPlayList = async() => {

    const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + 'api/playlist/add', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(searchRequestData),
      });
      try {
        if (!response.ok) { throw new Error('データの取得に失敗しました') };
        const data = await response.json();
        if (!data.CODE) { throw new Error('データの取得に失敗しました') };
      } catch (e) { 
        console.log(e.message)
        alert(e.message);
      }
  }
  return (
    <>
      <div className={`${showPostView ? 'animate-slide-in-bottom' : 'animate-slide-out-bottom'}  z-30 bg-white w-full fixed  bottom-0 h-3/4 left-0 right-0 `}>
        <Header onOpenModal={onOpenModal} pageNumber={pageNumber} returnPage={returnPage} />
        {pageNumber === 1 && <PlayListAddBasicInfo
          handleNextBtnClick={handleNextBtnClick}
          isNextBtnClickable={isNextBtnClickable}
          nextPage={nextPage}
          handlePlaylistTitleChange={handlePlaylistTitleChange}
          handlePlaylistCategoryChange={handlePlaylistCategoryChange}
          searchRequestData={searchRequestData} />}
        {pageNumber === 2 && <PlayListAddLink
          selectVideos={selectVideos}
          setSelectVideos={setSelectVideos}
          handleNextBtnClick={handleNextBtnClick}
          isNextBtnClickable={isNextBtnClickable}
          nextPage={nextPage} />}
        {pageNumber === 3 && <PlayListSortVideos
          selectVideos={selectVideos}
          setSelectVideos={setSelectVideos}
          handleRegistPlayList={handleRegistPlayList} />}
      </div>
    </>
  );
};


export default Content;
