import axios, { AxiosResponse } from 'axios';



export async function axiosFormDataUseAuth<T>(data:T,path:string):Promise<AxiosResponse> {
  try {
    const axiosInstance = axios.create({
      withCredentials: true,
    });
    const response:AxiosResponse<T> = await axiosInstance.post(
      process.env.NEXT_PUBLIC_API_PATH + path,
      data,
      {headers:{'Content-Type': 'multipart/form-data'}}
    )
    return response;
  } catch (error) {
    throw error;
  }
}
/*
export async function fetchDataUseAuth<T>(data:T,path:string):Promise<AxiosResponse> {
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
*/


export async function userAuth<T>(path:string):Promise<AxiosResponse> {
  try {
    const axiosInstance = axios.create({
      withCredentials: true,
    });
    const response:AxiosResponse<T>= await axiosInstance.post(
      process.env.NEXT_PUBLIC_API_PATH + path,
      {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
    )
    return response;
  } catch (error) {
    throw error;
  }
}
