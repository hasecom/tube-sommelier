import { videoType } from '@/components/postComponents/searchType'
type Props = {
  handleRegistPlayList: () => void,
  selectVideos: videoType[],
};
const PlayListSortVideos:React.FC<Props> =  ({selectVideos,handleRegistPlayList}) => {
  return (
    <>
      <div className="text-center w-full block py-10 px-5">
        <button
          className="bg-primary text-white p-2 max-md:w-full  rounded-lg text-xl
          hover:bg-red-600 active:bg-red-400 focus:outline-none"
          onClick={handleRegistPlayList}
           >作成完了
        </button>
      </div>
    <div className="text-gray-600 body-font overflow-y-scroll">
      <div className="container py-1 px-2 mx-auto pb-24">
        <div className="flex flex-wrap -m-2">
          {selectVideos.map((video) => (
            <div key={video.videoId} className="lg:w-1/3 md:w-1/2 w-full hover:bg-gray-100 focus:ring-4">
              <div className="h-full flex items-center border-gray-200 border py-3 px-1 rounded-lg">
                {/* Image */}
                <div className="relative w-35 h-auto max-h-80 bg-gray-100 object-cover object-center flex-shrink-0  rounded-lg mr-2">
                  <img alt="team" className="w-full h-full object-cover object-center rounded-tl-lg rounded-lg" src={video.ThumbnailsDefaultUrl} />
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
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
export default PlayListSortVideos