import React from 'react';
type Props = {
  toggleView: () => void;
};
const FixedButton:React.FC<Props> = ({toggleView}) => {
  return (
    <>
 <button onClick={toggleView} 
      className="fixed bottom-4 right-4 w-14 h-14 bg-red-500 rounded-full text-white
                 flex items-center justify-center
                 hover:bg-red-600 active:bg-red-400 focus:outline-none
                 transition-all duration-300 ease-in-out
                 sm:bottom-8 sm:right-8">
  <span className="i-lucide-send  text-2xl"></span>
</button>
 
</>
  );
};

export default FixedButton;
