type Props = {
  onOpenModal: () => void;
  showPostView:boolean
};
const Background:React.FC<Props> = ({onOpenModal,showPostView}) => {
  return (
    <div
      className={`${showPostView ? 'animate-fade-in' :'animate-fade-out'} z-10 fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-20`}
      onClick={onOpenModal}>
      <div
        className="bg-white w-full max-w-screen-md"
        onClick={(e) => e.stopPropagation()}>
      </div>
    </div>
  )
}

export default Background