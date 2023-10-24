

type Props = {
  handleNextBtnClick: ()=>void
  isNextBtnClickable:boolean,
  onOpenModal:()=>void
};

const Header:React.FC<Props> = ({handleNextBtnClick,isNextBtnClickable,onOpenModal}) => {
  const handleClick = () =>{
    handleNextBtnClick();
  }
  const handleCancelClick = ()=>{
    onOpenModal();
  }
  return (
    <header className="bg-white p-4 flex justify-between items-center">
      <button 
        className="p-2 bg-red-500 rounded-full text-white
                 flex items-center justify-center
                 hover:bg-red-600 active:bg-red-400 focus:outline-none
                 transition-all duration-300 ease-in-out
                 sm:bottom-8 sm:right-8"
        onClick={handleCancelClick}
        >
        <span className="i-lucide-x  text-2xl"></span>
      </button>
      <h2 className="text-2xl font-semibold mb-4 ">プレイリストを作成</h2>
      <button 
        className={`bg-${isNextBtnClickable ? 'primary' : 'gray-400'} text-white py-2 px-4 rounded-lg text-xl`}
        onClick={handleClick}
        disabled={!isNextBtnClickable}
      >
        次へ
      </button>
    </header>
  );
};

export default Header;