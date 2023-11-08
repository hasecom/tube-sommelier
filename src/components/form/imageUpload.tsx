import React from 'react';

type Props = {
  file: File | null,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  handleImageFileChange:(file:File | null) => void,
};

export const ImageUploadForm: React.FC<Props> = ({ file, setFile,handleImageFileChange }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // 拡張子のチェック
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(`.${fileExtension}`)) {
        alert('許可されていない拡張子です');
        return;
      }
      // ファイルサイズのチェック (3MBまで)
      if (selectedFile.size > 3 * 1024 * 1024) {
        alert('ファイルサイズは3MB未満である必要があります');
        return;
      }
      
      // バリデーションが成功したらファイルをセット
      setFile(selectedFile);
      console.log(selectedFile)
      handleImageFileChange(selectedFile);
    }
  }
  return (
    <>
      <label className=" max-md:w-full max-2xl:w-[60%] text-left mx-auto block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        サムネイル（任意）
      </label>
      <div className="flex items-center justify-center w-full py-3">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          {file && (
            <div className="w-full h-64 relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Selected Image"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          {!file && (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">アップロード</span></p>
              <p className="text-xs text-gray-500 dark:text-gray-400">画像ファイル(最大 3MB)</p>
            </div>
          )}
          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </>
  )
}