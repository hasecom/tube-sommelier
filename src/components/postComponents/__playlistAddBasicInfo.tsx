import React, { useState, useEffect } from 'react'
import { formType } from '@/components/postComponents/searchType'
import { heightInherit } from '@/assets/styleComponents/style'
import { ImageUploadForm } from '../form/imageUpload';

type Props = {
  handleNextBtnClick: (isAvailableBool: boolean) => void,
  handlePlaylistTitleChange: (playlistTitle: string) => void,
  handlePlaylistCategoryChange: (playlistCategory: string) => void,
  handleImageFileChange:(file:File | null) => void,
  searchRequestData: formType,
  isNextBtnClickable: boolean,
  nextPage: () => void
};
const PlayListAddBasicInfo: React.FC<Props> = ({ 
  handleNextBtnClick, 
  isNextBtnClickable, 
  nextPage,
  handlePlaylistTitleChange, 
  handlePlaylistCategoryChange, 
  searchRequestData,
  handleImageFileChange
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState<string>('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategory() {
      const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + 'api/playlist/get/category', {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
      });
      try {
        if (!response.ok) { throw new Error('データの取得に失敗しました') };
        const data = await response.json();
        if (!data.CODE) { throw new Error('データの取得に失敗しました') };
        setCategories(data.RESULT);
      } catch (e) { alert(e.message); }
    }
    getCategory();
    if (searchRequestData.categoryCode != "") {
      setSelectedOption(searchRequestData.categoryCode);
    }
    if (searchRequestData.playlistTitle != "") {
      setInputValue(searchRequestData.playlistTitle);
    }
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    handlePlaylistCategoryChange(e.target.value);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    handlePlaylistTitleChange(e.target.value);
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
      <div className={`animate-slide-in-left  w-full  bg-white pt-3 px-3 flex flex-col overflow-y-scroll absolute  bottom-0`} style={heightInherit}>
        <div className="text-center w-full block">
          <button
            className={`${isNextBtnClickable ? 'bg-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} text-white p-2 max-md:w-full max-2xl:w-[60%]  rounded-lg text-xl`}
            disabled={!isNextBtnClickable}
            onClick={nextPage} >次へ
          </button>
        </div>
        <div className="overflow-y-scroll">
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
              {categories.map((category) => (
                <option key={category?.CATEGORY_CODE} value={category?.CATEGORY_CODE}>
                  {category?.CATEGORY_NAME}
                </option>
              ))}
            </select>
            <div className="text-center w-full block pt-10">
              <ImageUploadForm file={file} setFile={setFile} handleImageFileChange={handleImageFileChange} />
            </div>

            {/* <div className="flex items-center justify-center  w-full block pt-10">
            <label className="relative inline-flex items-center cursor-pointer ">
              <input type="checkbox" value="" className="sr-only peer"
                onChange={(e) => setIsChecked(e.target.checked)}
                checked={isChecked}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">有料販売　　</span>
            </label>
            <input
              type="number"
              className="px-5 ml-2 w-20 h-8 rounded-md border border-gray-300 text-sm text-center"
              placeholder="0"
              id="numInput"
              disabled={!isChecked}
            />
            <span className="text-sm ml-1">円</span>
          </div> */}
          </div>
        </div>
      </div>

    </>
  )
}



export default PlayListAddBasicInfo;