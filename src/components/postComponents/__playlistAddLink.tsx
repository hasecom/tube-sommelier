import { useState,useEffect } from 'react';
import { useParams,useRouter } from 'next/navigation';
import SearchResult from './___searchResult';
const PlayListAddLink = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const router = useRouter();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const searchRequest = async(query: string) => {
    // let params = new URLSearchParams();
    // params.append('uid',"a");
      const jsonData = {
        key1: 'value1',
        key2: 'value2'
      };
      const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + 'api/tube/get/search', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(jsonData)
      });
      if (response.ok) {
        const data = await response.json();
        if(data.CODE){
          console.log(data)
        }else{
          alert('エラーが発生しました。')
        }
  };
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
  return (
    <div className={`animate-slide-in-right  w-full h-full bg-white py-2 p-8 flex flex-col `}>
      <div className="text-center w-full block pt-1">
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
      </div>
      <SearchResult />
    </div>
  )
}
export default PlayListAddLink;