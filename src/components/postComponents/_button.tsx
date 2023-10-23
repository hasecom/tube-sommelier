import React from 'react';
type Props = {
  toggleView: () => void;
};
const FixedButton:React.FC<Props> = ({toggleView}) => {
  return (
    <button onClick={toggleView}
      className="fixed bottom-4 right-4 p-4 bg-red-500 rounded-full text-white
                 hover:bg-red-600 active:bg-red-400 focus:outline-none
                 transition-all duration-300 ease-in-out
                 sm:bottom-8 sm:right-8" >ボタン</button>
  );
};

export default FixedButton;
