'use client';
const Mypage = () => {

  async function postData() {
    // let params = new URLSearchParams();
    // params.append('uid',"a");
    const jsonData = {
      key1: 'value1',
      key2: 'value2'
    };
    const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + 'api/auth/sync', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(jsonData)
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)
    }
}
postData();
  return (
    <div>
マイペー
    </div>
  )
}
export default Mypage;