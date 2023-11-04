import { useRef, useEffect, useState } from 'react'
import { Card, Center, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, IconButton, Text, Image, Heading, Button } from '@chakra-ui/react'
import { fetchDataUseAuth } from '@/func/axios'
import { playlistData } from './userPageType'
type playlist = {
  page: number
}
export const Post: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [stateScroll,setStateScroll] = useState(0);
  const [playlists, setPlaylists] = useState<playlistData[]>([]);
  const postedPlaylist = async () => {
    try {
      const response = await fetchDataUseAuth<playlist>({ 'page': page }, 'api/playlist/getPosted');
      if (response && response.data) {
        const responseData = response.data;
        if (responseData['CODE'] && responseData['CODE'] == 1 ) {
          setPlaylists(responseData['RESULT']['PLAYLISTS']);
          return;
        }
      }
      throw new Error();
    } catch (e) {
      console.log(e.message)
    }
  }
  //スクロール
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const parentElement = container.parentElement;
    if (!parentElement) return;
    const parentScrollTop = parentElement.scrollTop; // 親要素のscrollTopを取得
    console.log("ii")
    // 現在の要素の高さを取得
    const containerHeight = container.offsetHeight;
    if (parentScrollTop > containerHeight * 0.6) {//60%
      if(stateScroll === containerHeight) return;
      setStateScroll(containerHeight);
       //handleReSearch();
       console.log("aa")
    }
  };
  useEffect(() => {
    postedPlaylist();
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
    <div className="overflow-y-scroll" onScroll={handleScroll}>
      <div className="container" ref={scrollContainerRef}>
    {playlists.map((playlist) => (
      <Center className="my-3" key={playlist.ID} >
        <Card maxW='md' >
          <CardHeader>
            <Flex>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                <Box>
                  <Heading size='sm'>Segun Adebayo</Heading>
                  <Text>Creator, Chakra UI</Text>
                </Box>
              </Flex>
              <IconButton variant='ghost' colorScheme='gray' aria-label='See menu' />
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>{playlist.PLAYLIST_NAME}</Text>
          </CardBody>
          <Image
            objectFit='cover'
            src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Chakra UI'
          />
          <CardFooter
            justify='space-between'
            flexWrap='wrap'
            sx={{
              '& > button': {
                minW: '136px',
              },
            }}
          >
            <Button flex='1' variant='ghost' >Like</Button>
            <Button flex='1' variant='ghost' >Comment</Button>
            <Button flex='1' variant='ghost'>Share</Button>
          </CardFooter>
        </Card>
      </Center>
      ))}
      </div>
    </div>
  );
}


export const Favorite: React.FC = () => {
  return (
    <>
      <div>いいね</div>
    </>
  );
}
