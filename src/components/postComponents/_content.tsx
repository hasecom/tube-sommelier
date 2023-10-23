
type Props = {
  showPostView:boolean
};
const Content:React.FC<Props> = ({showPostView}) => {
  return (
    <div className={`${showPostView ? 'animate-slide-in-bottom' :'animate-slide-out-bottom'}  z-30 bg-white w-full fixed  bottom-0 h-3/4 left-0 right-0 `}>
      {/* コンテンツ */}
    </div>
  );
};

export default Content;
