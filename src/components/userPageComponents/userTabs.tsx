import { useEffect, useState, useContext } from 'react'
import { axiosFormDataUseAuth } from '@/func/axios'
import { playlistData } from './userPageType'
import { ScrollYContext } from '@/providers/appProvider';
import  PostCardComponent  from '@/components/cardComponents/postCardComponent';
type playlist = {
  page: number,
  userId:string
}
type Props =  {
  apiEndPoint:string,
  userId:string
}


//投稿
export const Post: React.FC<Props> = ({apiEndPoint,userId}) => {
  const { playlists } = useUserTabsData(apiEndPoint,userId);
  return (
    <div>
    {playlists.map((playlist:playlistData) => (
      <PostCardComponent playlist={playlist} key={playlist.ID} />
      ))}
    </div>
  );
}
//お気に入り
export const Favorite: React.FC<Props> = ({apiEndPoint,userId}) => {
  const { playlists } = useUserTabsData(apiEndPoint,userId);
  return (
    <div>
    {playlists.map((playlist:playlistData) => (
      <PostCardComponent playlist={playlist} key={playlist.ID} />
      ))}
    </div>
  );
}
type userTabsDataProps = {
  playlists:playlistData[]
}
const useUserTabsData =  (apiEndpoint:string,userId:string):userTabsDataProps =>  {
  const scrollY = useContext(ScrollYContext);
  const [page, setPage] = useState(0);
  const [godBodyHeight,setGodBodyHeight] = useState(0);
  const [oldGodBodyHeight,setOldGodBodyHeight] = useState(0);
  const [playlists, setPlaylists] = useState<playlistData[]>([]);
  const postedPlaylist = async () => {
    try {
      const response = await axiosFormDataUseAuth<playlist>({ 'page': page,'userId':userId}, apiEndpoint);
      if (response && response.data) {
        const responseData = response.data;
        if (responseData['CODE'] && responseData['CODE'] == 1 ) {
          if(page !== 0){//0(初回ロード以外)
            const additionPlaylists = responseData['RESULT']['PLAYLISTS'] as playlistData[];
            setPlaylists([...playlists, ...additionPlaylists]);
          }else{
            setPlaylists(responseData['RESULT']['PLAYLISTS'] as playlistData[]);
          }
          return;
        }
      }
      const bodyHeight = document.body.offsetHeight;
      setOldGodBodyHeight(godBodyHeight);
      setGodBodyHeight(bodyHeight);
      throw new Error();
    } catch (e) {
      console.log(e.message)
    }
  }
  useEffect(() => {
    const bodyHeight = document.body.offsetHeight;
   if (scrollY > (bodyHeight*0.6) && bodyHeight !== godBodyHeight ) { //ボディ全体の60%を超えたら
    if(godBodyHeight  !== 0 ){
      if(oldGodBodyHeight == godBodyHeight){
        setPage(page+1);
      }
    }else{
      setPage(page+1);
    }
    }
  },[scrollY]);
  useEffect(() => {
    if(page === 0) return;
    postedPlaylist();
  }, [page]);

  useEffect(() => {
    postedPlaylist();
  }, []);
  return {playlists};
}
