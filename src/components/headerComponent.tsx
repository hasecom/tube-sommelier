'use client';
import Link from 'next/link'
import {useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollYContext } from '@/providers/appProvider';

import { metaConstType } from '@/assets/constants/metaConst';
import { uacStatus } from '@/func/cookie';
const HeaderComponent = ({ title, description }: metaConstType) => {
  const scrollY = useContext(ScrollYContext);
  useEffect(()=>{
    if (scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  },[scrollY])
  const [uacStatusFlag, setUacStatusFlag] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  return (
    <>
    <AnimatePresence initial={false}>
    {scrolling && (
      <motion.div
        key="header"
        initial={{ y: -100 }} // 初期位置
        animate={{ y: 0 }} // スクロール時の位置
        exit={{ y: -100 }} // スクロール後の位置
        transition={{ duration: 0.3 }} // アニメーションの速度
        className="text-gray-600 body-font bg-white fixed top-0 left-0 right-0 z-10"
      >
    <header className="text-gray-600 body-font fixed top-0 left-0 right-0 z-10" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
      <div className="container mx-auto flex flex-wrap px-5 pt-2 pb-1 flex-col md:flex-row items-center">
        <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-red-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">{title}</span>
        </a>
      </div>
    </header>
    </motion.div>
      )}
    </AnimatePresence>
    <header className="text-gray-600 body-font bg-white  'fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-red-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">{title}</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <button className="mr-5 inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">プレイリスト</button>
          {uacStatusFlag == undefined || uacStatusFlag != 1 ? (
            <>
              <Link href="/regist">
                <button className="mr-5 inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">新規登録</button>
              </Link>
              <Link href="/login">
                <button className="mr-5 inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">ログイン</button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/mypage">
                <button className="mr-5 inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">マイページ</button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  </>
  )
}


export default HeaderComponent;