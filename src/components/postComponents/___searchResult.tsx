import React, { useRef, useState, useEffect } from 'react';
import { videoType } from '@/components/postComponents/searchType'

type Props = {
  searchResult: videoType[],
  selectVideos: videoType[],
  setSelectVideos: (video: videoType[]) => void,
  handleReSearch: () => void
}

const SearchResult: React.FC<Props> = ({ searchResult, selectVideos, setSelectVideos, handleReSearch }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [stateScroll,setStateScroll] = useState(0);
  const handleClick = (video: videoType) => {
    // videoId がすでに selectVideos に存在するか確認
    const videoIndex = selectVideos.findIndex((v) => v.videoId === video.videoId);
    if (videoIndex !== -1) {
      // すでに存在する場合は削除
      const updatedSelectVideos = [...selectVideos];
      updatedSelectVideos.splice(videoIndex, 1);
      setSelectVideos(updatedSelectVideos);
    } else {
      // 存在しない場合は追加
      const updatedSelectVideos = [...selectVideos, video];
      setSelectVideos(updatedSelectVideos);
    }
  }
  const isSelect = (videoId: string): boolean => {
    const videoIndex = selectVideos.findIndex((v) => v.videoId === videoId);
    if (videoIndex !== -1) {
      return true;
    } else {
      return false;
    }
  }
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const parentElement = container.parentElement;
    if (!parentElement) return;
    const parentScrollTop = parentElement.scrollTop; // 親要素のscrollTopを取得

    // 現在の要素の高さを取得
    const containerHeight = container.offsetHeight;
    if (parentScrollTop > containerHeight * 0.6) {//60%
      if(stateScroll === containerHeight) return;
      setStateScroll(containerHeight);
      if(50 < searchResult.length) return;//searchResultの最大保持数
       handleReSearch();
    }
  };
  useEffect(() => {
    // スクロールイベントを監視
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.addEventListener('scroll', handleScroll);
    }
    // コンポーネントがアンマウントされたときにイベントリスナーをクリーンアップ
    return () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  return (
    <div className="text-gray-600 body-font overflow-y-scroll"
      onScroll={handleScroll}
    >
      <div className="container py-1 px-2 mx-auto pb-24"
        ref={scrollContainerRef}
      >
        <div className="flex flex-wrap -m-2">
          {searchResult.map((video) => (
            <div key={video.videoId} className="lg:w-1/3 md:w-1/2 w-full hover:bg-gray-100 focus:ring-4" onClick={() => handleClick(video)}>
              <div className="h-full flex items-center border-gray-200 border py-3 px-1 rounded-lg">
                {/* Image */}
                <div className="w-35 h-auto max-h-80 bg-gray-100 object-cover object-center flex-shrink-0  rounded-lg mr-2">
                  <img alt="team" className="w-full h-full object-cover object-center rounded-tl-lg rounded-lg" src={video.ThumbnailsDefaultUrl} />
                  {/* Video ID */}
                  <div className="absolute bottom-0 left-0 bg-black opacity-80 text-white px-2 py-1 text-xs">{video.videoId}</div>
                </div>
                {/* Title */}
                <div className="flex-grow relative w-full h-full overflow-x-hidden">
                  <h2 className="text-gray-900 absolute  top-0 left-0 title-font font-medium text-sm">
                    {video.videoTitle.length > 50 ? video.videoTitle.slice(0, 50) + '...' : video.videoTitle}
                  </h2>

                  <p className="text-gray-500 absolute  bottom-0 left-0 text-xs">
                    {video.channelTitle}
                  </p>

                </div>
              </div>
              {isSelect(video.videoId) ? (
                <div className="relative">
                  <span
                    className="absolute bottom-10 right-4 w-10 h-10 bg-red-500 rounded-full text-white
                  flex items-center justify-center
                  hover:bg-red-600 active:bg-red-400 focus:outline-none
                  transition-all duration-300 ease-in-out
                  sm:bottom-8 sm:right-8 animate-fade-in">
                    <span className="i-lucide-check  text-2xl"></span>
                  </span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default SearchResult;


