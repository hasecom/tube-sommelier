import { useState } from 'react';
import { Avatar, Box, Button, Flex, Heading, Text, SkeletonCircle, SkeletonText} from '@chakra-ui/react';
import { UserData,ListItem } from './userPageType';
import { FollowCardComponent } from '../userActionComponents/followCardComponent';
import ListModalComponent from '@/components/modalComponents/listModalComponent'
type Props = {
  userData:UserData | null,
}

const lists:ListItem[] = [
  {
    TAB_TITLE:"フォロー"
  },
  {
    TAB_TITLE:"フォロワー"
  }
]
const UserProfileComponent:React.FC<Props> = ({userData}) => {
  const [isFollowed, setFollowed] = useState(0);
  const [showListModal,setShowListModal] = useState(false);
  const handleFollowed = (isFollowState:boolean) => {
    if(userData == null) return;
    if(userData.IS_FOLLOWING == "0"){
      setFollowed(isFollowState ? 0 : 1);
    }else{
      setFollowed(isFollowState ? -1 : 0);
    }
    
  }
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
      align="start"
      justify="center"
      p={4}
      bg="white"
    >
      <Flex
        width="100%"
        justifyContent="space-between"
        mb={4}
      >
        <Box>
          <Avatar size="lg" src="アイコンのURL" />
        </Box>
        {userData.IS_SELF == "0" && userData.IS_FOLLOWING != null && (
           <FollowCardComponent isFollow={userData.IS_FOLLOWING} userId={userData.USER_ID} handleFollowed={handleFollowed} />
        )}
      </Flex>
      <Heading mb={2}>{userData.USER_NAME }</Heading>
      <Text mb={4} color="gray.500">
        {"@"+userData.USER_ID}
      </Text>
      <Flex>
        <Text fontSize="sm" color="gray.500" mr={4} onClick={()=>{setShowListModal(true)}} >
          フォロー {Number(userData.FOLLOWING_COUNT)}
        </Text>
        <Text fontSize="sm" color="gray.500" onClick={()=>{setShowListModal(true)}}>
          フォロワー {Number(userData.FOLLOWER_COUNT) + isFollowed}
        </Text>
      </Flex>
    </Flex>
    {showListModal && (
      <ListModalComponent lists={lists} showListModal={showListModal} setShowListModal={setShowListModal} />
    )}
    </>
  )
}

export default UserProfileComponent;