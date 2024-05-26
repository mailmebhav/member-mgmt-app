import axios, { AxiosResponse} from "axios";

export async function httpPostRequest(url: string, payload: object, headers: object)
: Promise<AxiosResponse<any, any>>
{
   return await axios.post(url,payload,headers)
}

export async function httpGetRequest(url: string, headers: object)
: Promise<AxiosResponse<any, any>>
{
   return await axios.get(url,headers)
}

export async function httpPutRequest(url: string, payload: object, headers: object)
: Promise<AxiosResponse<any, any>>
{
   return await axios.put(url, payload, headers)
}

export async function httpDeleteRequest(url: string, headers: object)
: Promise<AxiosResponse<any, any>>
{
   return await axios.delete(url,headers)
}