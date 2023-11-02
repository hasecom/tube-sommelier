import React, { useState, useEffect } from 'react';
import Header from "./_header";
import PlayListAddBasicInfo from "./__playlistAddBasicInfo";
import PlayListAddLink from './__playlistAddLink';
import PlayListSortVideos from './__playlistSortVideos';
import { videoType, formType } from '@/components/postComponents/searchType'
import fetchDataUseAuth from '@/func/axios';
type Props = {
  showPostView: boolean,
  timestamp:number
  closeViews:() => void,
  onOpenModal: () => void,
  pageNumber: number,
  nextPage: () => void,
  returnPage: () => void
  handlePopup:(message:string)=>void
};

const Content: React.FC<Props> = ({ showPostView,timestamp,closeViews,onOpenModal, pageNumber, nextPage, returnPage,handlePopup }) => {
  const [isNextBtnClickable, setIsNextBtnClickable] = useState(false);//次へ
  const handleNextBtnClick = (isAvailableBool: boolean): void => {//ボタンクリックを可能状態に変更
    setIsNextBtnClickable(isAvailableBool);
  };
  const [selectVideos, setSelectVideos] = useState<videoType[]>([]);//選択したvideo
  const [searchRequestData, setSearchRequestData] = useState<formType>({ playlistTitle: '', categoryCode: '', videos: [] ,CODE:0,MESSAGE:'',postTimestamp:0});
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
    setSearchRequestData((prevData) => ({ ...prevData,postTimestamp: timestamp, }));
  }, [timestamp]);

  useEffect(() => {
    handlePlaylistVideoChange(selectVideos)
  }, [selectVideos]);

  const handleRegistPlayList = async() => {
    try {
      const response = await fetchDataUseAuth<formType>(searchRequestData, 'api/playlist/add');
      const resData = response.data;
      if (resData['CODE'] === 1) {
        closeViews();
        handlePopup('プレイリストが作成されました。');
      } else {
        throw new Error(resData['MESSAGE']);
      }
    } catch (e) {
      handlePopup(e.message || "エラーが発生しました。");
    }
  }
  return (
    <div className="relative w-full h-full">
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
          handleRegistPlayList={handleRegistPlayList} />}
      </div>
    </div>
  );
};


export default Content;
