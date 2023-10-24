import React, { useState } from 'react'

const PlayListAddBasicInfo = () => {
  const [animate, setAnimate] = useState(false);
  const handle = () => {
    setAnimate(!animate)
  }
  return (
    <>
      
      <div className={`animate-slide-in-bottom  w-full h-full bg-white p-8 flex justify-center `}>
        <div className="text-center">
          
          <input
            type="text"
            placeholder="プレイリスト名"
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:border-primary"
          />
        </div>
      </div>
    </>
  )
}
export default PlayListAddBasicInfo;