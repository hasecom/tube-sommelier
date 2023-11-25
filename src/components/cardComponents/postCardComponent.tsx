import { useRouter } from 'next/navigation';
import { Card, Center, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, IconButton, Text, Image, Heading, Button } from '@chakra-ui/react'
import { playlistData } from '@/components/userPageComponents/userPageType';
import { LikeCardComponent } from '../userActionComponents/likeCardComponent';

type Props = {
  'playlist': playlistData
}
const PostCardComponent: React.FC<Props> = ({ playlist }) => {
  const router = useRouter();
  const profileClickHandle = () => {
    router.push("/profile/"+playlist.USER_ID,{ scroll: false });
  }
  return (
    <Center className="my-3" key={playlist.ID} >
      <Card maxW='md' >
      <CardHeader onClick={profileClickHandle}>
      <Flex justifyContent='space-between'>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
          <Box>
            <Heading size='sm'>{playlist.USER_NAME}</Heading>
            <Text>@{playlist.USER_ID}</Text>
          </Box>
        </Flex>
      </Flex>
    </CardHeader>
        <CardBody>
          <Text>{playlist.PLAYLIST_NAME}</Text>
        </CardBody>
        <Box pos="relative" display="inline-block">
          <Image
            objectFit="cover"
            src={
              (playlist.PLAYLIST_THUMBNAIL &&
                (playlist.PLAYLIST_THUMBNAIL.startsWith("http://") ||
                  playlist.PLAYLIST_THUMBNAIL.startsWith("https://")))
                ? playlist.PLAYLIST_THUMBNAIL
                : process.env.NEXT_PUBLIC_ASSETS_PATH +
                "Image/playlistThumbnails/" +
                (playlist.PLAYLIST_THUMBNAIL || "default.jpg")
            }
            alt={playlist.PLAYLIST_THUMBNAIL || "default.jpg"}
          />
          <Box
            pos="absolute"
            top="0px"
            left="0px"
            right="0px"
            bottom="0px"
            border="13px solid rgba(0, 0, 0, 0.4)"
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Box
              bg="rgba(0, 0, 0, 0.5)"
              color="white"
              px="2"
              py="1"
              fontWeight="bold"
              borderRadius="8px"
            >
              {playlist.VIDEO_COUNT}本の動画
            </Box>
          </Box>
        </Box>
        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >     
          
            <LikeCardComponent likeCount={playlist.LIKE_COUNT} playlistUid={playlist.PLAYLIST_UID} isLiked={playlist.IS_LIKED} />
          <Button flex='1' variant='ghost' >コメント  {playlist.COMMENT_COUNT}件</Button>
          <Button flex='1' variant='ghost'>Share  </Button>
        </CardFooter>
      </Card>
    </Center>
  )
}
export default PostCardComponent;