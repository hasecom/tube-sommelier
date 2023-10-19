'use client';
import { useEffect } from 'react';
import { useParams,useRouter } from 'next/navigation';

const RegisterSuccessPage = () => {
  const router = useRouter();
  const useparams = useParams()
  const uid = typeof useparams.uid === 'string' ? useparams.uid : "";
  let params = new URLSearchParams();
  params.append('uid',uid);
  useEffect(() => {
    async function postData() {
      const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + 'api/regist/uid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:params,
      });
      if (response.ok) {
        const data = await response.json();
        if(data.CODE){
          router.push("/single/regist-success",{ scroll: false });
        }else{
          router.push("/single/regist-failed",{ scroll: false });
        }
      }else{
        router.push("/single/error",{ scroll: false });
      }
  }
  postData();
  }, []);
  return (
    <></>
  );
};

export default RegisterSuccessPage;
