import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SearchResult from './___searchResult';
import { videoType } from '@/components/postComponents/searchType'
type Props = {
  handleNextBtnClick: (isAvailableBool: boolean) => void,
  isNextBtnClickable: boolean,
  nextPage:()=>void,
  setSelectVideos:(video:videoType[]) => void,
  selectVideos:videoType[]
};
const PlayListAddLink:React.FC<Props> = ({ setSelectVideos,selectVideos,handleNextBtnClick, isNextBtnClickable,nextPage }) => {
  const [searchQuery, setSearchQuery] = useState('');//検索ワード
  const [oldsearchQuery, setOldSearchQuery] = useState('');//一つ前の検索ワード
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);//入力終了からデータ取得の待機時間
  const [isDataSuccessful, setIsDataSuccessful] = useState(false);//searchResultにデータが入ったか否か
  const [searchResult, setSearchResult] = useState<videoType[]>([]);//検索結果
  const [nextPageToken,setNextPageToken] = useState<string>('') ;//searchResultの続き
  const router = useRouter();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNextPageToken("") //入力イベントがあればNextPageTokenを空にする。
    setSearchQuery(value);
  };
  useEffect(() => {
    //必須条件をクリアした場合
    if (0 < selectVideos.length) {
      handleNextBtnClick(true);
    } else {
      handleNextBtnClick(false);
    }
  },[selectVideos]);

  const searchRequest = async (query: string) => {
    let params = new URLSearchParams();
    params.append('searchQuery', query);
    params.append('nextPageToken', nextPageToken);
    const isSameSearch = query === oldsearchQuery ? true : false;
    if(!isSameSearch){
      setSearchResult([]);
    }
    const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + 'api/tube/get/search', {
      method: 'POST',
      //  credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });
    if (response.ok) {
      const data = await response.json();
      try {
        if (!data.CODE) { throw new Error('データの取得に失敗しました') };
        if (!data.RESULT.items) { throw new Error('データの取得に失敗しました') };
        setNextPageToken(data.RESULT.nextPageToken);
        (data.RESULT.items).forEach((item: any) => {
          const newData: videoType = {
            videoId: item.id.videoId,
            videoTitle: item.snippet.title,
            videoDescription: item.snippet.description,
            channelId: item.snippet.channelId,
            channelTitle: item.snippet.channelTitle,
            ThumbnailsDefaultUrl: item.snippet.thumbnails.default.url,
            ThumbnailsMediumUrl: item.snippet.thumbnails.medium.url,
            ThumbnailsHighUrl: item.snippet.thumbnails.high.url,
          };
          if (!searchResult.some(existingData => existingData.videoId === newData.videoId)) {
            setSearchResult((prevDataList) => [...prevDataList, newData]);
          }
        });
        setIsDataSuccessful(true);
      } catch (e) {
        setIsDataSuccessful(false);
        setError(e instanceof Error ? e.message : '未知のエラーが発生しました');
        alert(error);
      }
      setOldSearchQuery(query);
    }
  }
  const delayedFunction = () => {
    // 2秒以上経過
    if (searchQuery) searchRequest(searchQuery);
  };
  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      delayedFunction();
    }, 2000);
    setTimer(newTimer);
  }, [searchQuery]);
  const handleReSearch = () => {
    searchRequest(searchQuery)
  }
  return (
    <div className={`animate-slide-in-right  w-full h-full bg-white py-2 flex flex-col `}>
      <div className="text-center w-full block pb-3 px-4 ">
        <label className="max-md:w-full max-2xl:w-[60%]  text-left mx-auto block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
          動画を追加
        </label>
        <input
          type="text"
          placeholder="YouTubeの動画を検索"
          className="border border-gray-300 p-2 rounded max-md:w-full max-2xl:w-[60%] focus:outline-none focus:ring focus:border-primary"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <div className="text-right py-2">
          <button type="button" className={` 
          ${isNextBtnClickable ? 'bg-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white 
           rounded-lg hover:bg-red-800 
          focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 
          dark:hover:bg-red-700 dark:focus:ring-red-800 `}
          disabled={!isNextBtnClickable}
          onClick={nextPage} >
            次へ
            <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
              {selectVideos.length}
            </span>
          </button>
        </div>
      </div>
      {isDataSuccessful ? (
        <SearchResult searchResult={searchResult} selectVideos={selectVideos} setSelectVideos={setSelectVideos} handleReSearch={handleReSearch} />
      ) : null}
    </div>
  )
}
export default PlayListAddLink;