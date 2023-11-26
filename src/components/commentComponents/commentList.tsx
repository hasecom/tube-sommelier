import { useState } from 'react';
import { Textarea, Button, VStack, Box, CloseButton } from '@chakra-ui/react';
import { requestDataWithUserAuth } from '@/func/axios'
type props = {
  showPostView: boolean,
  timestamp: number,
  closeViews: () => void,
  onOpenModal: () => void,
  page: number,
  handlePopup: (message: string) => void,
  handleEdit:(boolEdit:boolean) => void,
  playlistUid:string
}
type requestDataProps  = {
  message:string,
  playlistUid:string
}

const CommentList: React.FC<props> = (
  {
    showPostView,
    timestamp,
    closeViews,
    onOpenModal,
    page,
    handlePopup,
    handleEdit,
    playlistUid
  }
) => {
  const [comment, setComment] = useState('');
  const [regComment,setRegComment] = useState('');
  const [svErrorFlag,setSvErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (e) => {
    if(svErrorFlag){
      setErrorMessage('');
      setSvErrorFlag(false);
    }
    if(1 < (e.target.value).length){
      handleEdit(true);
    }else{
      handleEdit(false);
    }
    setComment(e.target.value);
  };
  const handleSubmit = () => {
    // 1文字以上かつ120文字以内のバリデーション
    if (comment.trim().length > 0 && comment.length <= 120) {
      setErrorMessage('');
      const formattedComment = comment.replace(/\s/g, '\n');
      setRegComment(formattedComment);
      fetch(formattedComment);
    } else {
      if (comment.trim().length < 1) {
        setErrorMessage('コメントを入力してください。');
      } else if (120 < comment.length) {
        setErrorMessage('120文字以内で入力してください。');
      } else {
        setErrorMessage('無効なコメントです。');
      }
    }
  };
  const fetch = async(formattedComment:string) => {
    const response = await requestDataWithUserAuth<requestDataProps>({'message':formattedComment,'playlistUid':playlistUid},'api/user/action/addComment');
    if(response && response.data){ 
      const responseData = response.data;
      if(responseData['CODE'] && responseData['CODE'] == "1"){
        setSvErrorFlag(false);
        setErrorMessage('');
        console.log(responseData);
        return;
      }
      setSvErrorFlag(true);
      setErrorMessage(responseData['MESSAGE']);
    }else{
      setSvErrorFlag(true);
      setErrorMessage('内部エラーが発生しました。');
    }

}
  return (
    <>
      <div className="relative w-full h-full">
        <div className={`${showPostView ? 'animate-slide-in-bottom' : 'animate-slide-out-bottom'}  z-30 bg-white w-full fixed  bottom-0 h-3/4 left-0 right-0 p-3`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">コメントを追加</span>
            <CloseButton />
          </div>
          <Textarea placeholder='ここにコメントを入力（120文字以内）' size="sm" resize="none" p={2} onChange={handleChange} />
          <div className="text-right p-2">
            <Button
              colorScheme="red"
              size="sm"
              className="bg-red-500 text-white hover:bg-red-600 active:bg-red-400 focus:outline-none"
              onClick={handleSubmit}
            >
              コメントを追加する
            </Button>
          </div>
          {errorMessage != "" &&
            <div className="text-center text-red-500 text-sm py-2">
              {errorMessage}
            </div>
          }
          <VStack spacing={4} overflowY="auto" maxHeight="calc(100% - 64px)">
            {/* 仮のコメントリスト */}
            {[...Array(10)].map((_, index) => (
              <Box key={index} border="1px" borderColor="gray.200" p={4} rounded="md">
                <span>ユーザ名:</span>
                <p>コメントの内容がここに表示されます。</p>
              </Box>
            ))}
          </VStack>
        </div>
      </div>
    </>
  );
}
export default CommentList;