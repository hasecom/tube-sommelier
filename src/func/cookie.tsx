'use client';
import  Cookies  from 'universal-cookie';
export const uacStatus = ():number => {
    // Cookieから認証トークンを取得
    const cookies = new Cookies();
    const uacStatus = cookies.get('uac');
    return uacStatus;
}
