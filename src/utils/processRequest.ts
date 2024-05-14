import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export async function processRequest(url: string, method: string, body?: any): Promise<AxiosResponse> {
  const headers = {
    Accept: "application/json",
    "X-VTEX-API-AppKey": process.env.VTEX_API_APPKEY,
    "X-VTEX-API-AppToken": process.env.VTEX_API_APPTOKEN,
  };

  const options: AxiosRequestConfig = { headers, method };

  if (body) {
    options.data = body;
  }

  return await axios (url, options);
}
