type Props = {
  onOpenModal:()=>void,
  pageNumber:number,
  returnPage:()=>void
};

const Header:React.FC<Props> = ({onOpenModal,pageNumber,returnPage}) => {
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
        <span className="i-lucide-x  text-lg"></span>
      </button>
      <h2 className="font-semibold mb-4 text-2xl max-sm:text-lg">プレイリストを作成</h2>
      <button
          className={`${1 < pageNumber ? 'bg-white text-primary' : 'cursor-not-allowed text-white'}  p-2  rounded-lg text-xl`}
          onClick={returnPage}
          >
          戻る
      </button>
    </header>
  );
};

export default Header;