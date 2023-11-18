import { Avatar, Box, Button, Flex, Heading, Text, SkeletonCircle, SkeletonText} from '@chakra-ui/react';
import { UserData } from './userPageType';
import { FollowCardComponent } from '../userActionComponents/followCardComponent';
type Props = {
  userData:UserData | null
}
const UserProfileComponent:React.FC<Props> = ({userData}) => {
  if (!userData) {
    return (
    <Box padding='6' boxShadow='lg' bg='white'>
      <SkeletonCircle size='10' />
      <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
    </Box>
    )
  }
  return(
    <>
 <Flex
      direction="column"
      align="start" // ユーザ名、ユーザIDを左端に寄せる
      justify="center"
      p={4} // 全体にパディングを追加
      bg="white" // 背景を白に
    >
      {/* アイコンとフォロー中ボタン */}
      <Flex
        width="100%" // 親要素の幅に合わせる
        justifyContent="space-between" // アイコンとボタンを左右に配置
        mb={4} // 下部にマージンを追加
      >
        <Box>
          <Avatar size="lg" src="アイコンのURL" /> {/* アイコンを大きく */}
        </Box>
        {userData.IS_SELF == "0" && userData.IS_FOLLOWING != null && (
           <FollowCardComponent isFollow={userData.IS_FOLLOWING} userId={userData.USER_ID} />
        )}
      </Flex>

      {/* ユーザー名 */}
      <Heading mb={2}>{userData.USER_NAME }</Heading>

      {/* ユーザーID */}
      <Text mb={4} color="gray.500">
        {"@"+userData.USER_ID}
      </Text>

      {/* フォロー数とフォロワー数 */}
      <Flex>
        <Text fontSize="sm" color="gray.500" mr={4}>
          フォロー {userData.FOLLOWING_COUNT}
        </Text>
        <Text fontSize="sm" color="gray.500">
          フォロワー {userData.FOLLOWER_COUNT}
        </Text>
      </Flex>
    </Flex>
    </>
  )
}

export default UserProfileComponent;