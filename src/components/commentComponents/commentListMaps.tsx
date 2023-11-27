import { useState,useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { requestDataWithUserAuth } from '@/func/axios'
import { CommentListType } from './commentListType';
type Props = {
  playlistUid:string
}
const CommentListMaps:React.FC<Props> = ({playlistUid}) => {
  const [page, setPage] = useState(0);
  const commentList = useGetCommentList(playlistUid,page);
  if(!commentList){
    return (
      <></>
    )
  }
  return (
    <>
      {commentList.map((comment, index) => (
        <Box key={index} border="1px" borderColor="gray.200" p={4} rounded="md">
          <span>{comment.USER_ID}</span>
          <p>{comment.CONTENT}</p>
        </Box>
      ))}
    </>
  )
}
type requestDataProps = {
  playlistUid: string,
  page:number
}

const useGetCommentList = (playlistUid:string,page:number) => {
  const [commentList,setCommentList] = useState<CommentListType[] | null>(null);
  useEffect(() => {
  const fetch = async() => {
    const response = await requestDataWithUserAuth<requestDataProps>({'playlistUid': playlistUid,'page':page }, 'api/list/comment');
    if (response && response.data) {
      const responseData = response.data;
      if (responseData['CODE'] && responseData['CODE'] == "1") {
        setCommentList(responseData['RESULT']['COMMENT_LIST']);
      }
    }
  }
  fetch();
},[page]);
  return commentList;
}
export default CommentListMaps;