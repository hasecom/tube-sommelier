import axios, { AxiosResponse } from 'axios';



async function fetchDataUseAuth<T>(data:T,path:string):Promise<AxiosResponse<T>> {
  try {
    const axiosInstance = axios.create({
      withCredentials: true,
    });
    const response:AxiosResponse<T> = await axiosInstance.post(
      process.env.NEXT_PUBLIC_API_PATH + path,
      data,
      {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
    )
    return response;
  } catch (error) {
    throw error;
  }
}

export default fetchDataUseAuth;
