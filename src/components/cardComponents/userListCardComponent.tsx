import { useEffect, useContext } from "react"
import { Stack, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { UserListContext } from '@/providers/userListProvider';
import { UserList } from '@/components/cardComponents/cardListType';
import { FollowCardComponent } from '../userActionComponents/followCardComponent';
type Props = {

}
const UserListCardComponent: React.FC = () => {
  const userList = useContext<UserList[] | null>(UserListContext);
  if (!userList) {
    return (
      <Stack>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </Stack>
    )
  }
  return (
    <>
    {userList ?
    userList.map(user => (
    <div className="flow-root" key={user.USER_ID}>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {user.USER_NAME}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {user.USER_ID}
              </p>
            </div>
            {user.IS_FOLLOW != null && (
           <FollowCardComponent isFollow={user.IS_FOLLOW} userId={user.USER_ID} handleFollowed={(isFollowState) => {}}
            />
           )}
          </div>
        </li>
      </ul>
    </div>
    )):null}
    </>
    )}

export default UserListCardComponent;