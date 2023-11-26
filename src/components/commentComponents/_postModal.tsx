import {useState} from 'react';
interface PostModalProps {
  onModalClose: () => void;
  onModalCancel: () => void;
}

const PostModal:React.FC<PostModalProps> = ({ onModalClose, onModalCancel }) => {
  const [animate,setAnimate] = useState(false);
  const cancelHandle = ()=>{
    setAnimate(!animate);
    onModalCancel();
  }
  return (
    <>
    <div className={`${animate ? 'animate-slide-in-fwd-center-reverse':''} z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-80`}>
      <div className="animate-slide-in-fwd-center  bg-white p-6 rounded-lg shadow-lg text-center">
      <p className="text-lg mb-4">編集内容を破棄しますか？</p>
        <div className="flex justify-center">
          <button
            className="bg-primary text-white p-2 rounded-lg mr-4
            hover:bg-red-600 active:bg-red-400 focus:outline-none
            transition-all duration-300 ease-in-out"
            onClick={onModalClose}
          >
            破 棄
          </button>
          <button
            className="bg-gray-200 text-gray-800 p-2 rounded-lg
            hover:bg-gray-300 active:bg-gray-400 focus:outline-none
            transition-all duration-300 ease-in-out"
            onClick={cancelHandle}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default PostModal;
