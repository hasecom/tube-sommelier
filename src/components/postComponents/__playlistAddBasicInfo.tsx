import React, { ReactNode, useState, useEffect } from 'react'
type Props = {
  handleNextBtnClick: (isAvailableBool: boolean) => void,
  isNextBtnClickable: boolean,
  nextPage:()=>void
};
const PlayListAddBasicInfo: React.FC<Props> = ({ handleNextBtnClick, isNextBtnClickable,nextPage }) => {
  const [animate, setAnimate] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handle = () => {
    setAnimate(!animate)
  }
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    //入力値の必須条件をクリアした場合
    if (selectedOption !== '' && inputValue.trim() !== '') {
      handleNextBtnClick(true);
    } else {
      handleNextBtnClick(false);
    }
  });


  return (
    <>
      <div className={`animate-slide-in-left  w-full h-full bg-white p-8 flex flex-col `}>
        <div className="text-center w-full block pt-10">
          <label className="max-md:w-full max-2xl:w-[60%]  text-left mx-auto block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
            プレイリスト名
          </label>
          <input
            type="text"
            placeholder="プレイリスト名"
            className="border border-gray-300 p-2 rounded max-md:w-full max-2xl:w-[60%] focus:outline-none focus:ring focus:border-primary"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="text-center w-full block pt-10">
          <label className=" max-md:w-full max-2xl:w-[60%] text-left mx-auto block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
            カテゴリー
          </label>
          <select
            id="selectMenu"
            name="selectMenu"
            value={selectedOption}
            onChange={handleSelectChange}
            className="border border-gray-300 p-2 rounded  max-md:w-full max-2xl:w-[60%]  focus:outline-none focus:ring focus:border-primary appearance-none rounded  bg-transparent "
          >
            <option value="" disabled>
              選択してください
            </option>
            <option value="option1">オプション1</option>
            <option value="option2">オプション2</option>
            <option value="option3">オプション3</option>
          </select>

          <div className="text-center w-full block pt-10">
            <button
              className={`${isNextBtnClickable ? 'bg-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} text-white p-2 max-md:w-full max-2xl:w-[60%]  rounded-lg text-xl`}
              disabled={!isNextBtnClickable}
              onClick={nextPage} >次へ
            </button>
          </div>
        </div>

      </div>
    </>
  )
}
export default PlayListAddBasicInfo;