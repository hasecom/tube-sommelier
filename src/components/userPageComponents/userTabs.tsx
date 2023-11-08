import { useEffect, useState, useContext } from 'react'
import { Card, Center, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, IconButton, Text, Image, Heading, Button } from '@chakra-ui/react'
import { fetchDataUseAuth } from '@/func/axios'
import { playlistData } from './userPageType'
import { ScrollYContext } from '@/providers/appProvider';
type playlist = {
  page: number
}
export const Post: React.FC = () => {
  const scrollY = useContext(ScrollYContext);
  const [page, setPage] = useState(0);
  const [godBodyHeight,setGodBodyHeight] = useState(0);
  const [oldGodBodyHeight,setOldGodBodyHeight] = useState(0);
  const [playlists, setPlaylists] = useState<playlistData[]>([]);
  const postedPlaylist = async () => {
    try {
      const response = await fetchDataUseAuth<playlist>({ 'page': page }, 'api/playlist/getPosted');
      if (response && response.data) {
        const responseData = response.data;
        if (responseData['CODE'] && responseData['CODE'] == 1 ) {
          if(page !== 0){//0(初回ロード以外)
            setPlaylists([...playlists, ...responseData['RESULT']['PLAYLISTS']]);
          }else{
            setPlaylists(responseData['RESULT']['PLAYLISTS']);
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

  return (
    <div>
    {playlists.map((playlist) => (
      <Center className="my-3" key={playlist.ID} >
        <Card maxW='md' >
          <CardHeader>
            <Flex>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                <Box>
                  <Heading size='sm'>{playlist.USER_NAME}</Heading>
                  <Text>@{playlist.USER_ID}</Text>
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
            <Button flex='1' variant='ghost' >いいね  {playlist.LIKE_COUNT}件</Button>
            <Button flex='1' variant='ghost' >コメント   {playlist.COMMENT_COUNT}件</Button>
            <Button flex='1' variant='ghost'>Share {playlist.VIDEO_COUNT} </Button>
          </CardFooter>
        </Card>
      </Center>
      ))}
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
