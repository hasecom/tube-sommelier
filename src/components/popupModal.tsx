import React from 'react'
type Props = {
  popupMessage:string,
  reverseAnimate:boolean
}
const PopupModal:React.FC<Props> = ({popupMessage,reverseAnimate}) => {
  return (
    <>
        <div className="fixed top-20  inset-0  items-center justify-center z-50">
          <div className={`${reverseAnimate ? 'animate-slide-out-top':'animate-slide-in-top'} bg-red-100 mx-auto w-[20em]  px-4 py-3 rounded-lg shadow-lg text-center`}>
            <p>{popupMessage}</p>
          </div>
        </div>
    </>
  );
};

export default PopupModal;