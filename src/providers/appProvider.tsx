'use client'
import React, { createContext, useState, useEffect } from 'react';

const ScrollYContext = createContext(0);

function AppProvider({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
    const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <ScrollYContext.Provider value={scrollY}>
        {children}
    </ScrollYContext.Provider>
  )
}
export {AppProvider,ScrollYContext}