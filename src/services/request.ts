import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LocalStorageKey, LocalStorageService } from './localStorage';
import { config } from 'utils/config';
import { PATH_PARAMS, TypeApi } from 'commom/contants';
import { toast } from 'react-toastify';

class Requests {
  static request: AxiosInstance;
  static initRequest(typeUrl: TypeApi): AxiosInstance {
    this.request = axios.create({
      baseURL: config[typeUrl],
      headers: {
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '***',
        Accept: '*/*',
      },
      timeout: 25000,
    });
    return this.request;
  }
}

export const httpRequest = (typeUrl: TypeApi) => {
  const request = Requests.initRequest(typeUrl);
  const userToken: any = LocalStorageService.getItem(LocalStorageKey.userToken);
  const userId: any = LocalStorageService.getItem(LocalStorageKey.userId);
  if (userToken && userId) {
    request.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    request.defaults.headers.common['userId'] = userId;
  }
  return request;
};

export function configResponse(response: AxiosResponse<any>): any {
  if (!response.data) {
    return { message: 'server not found', code: 401 };
  }
  const { data, statusCode, message, success, status } = response.data;
  if (statusCode >= 400 && statusCode <= 500) {
    throw Object.assign(new Error(message), { statusCode });
  }
  return { data, message, statusCode, success, status };
}

export function configResponseError(errors: AxiosError | any): any {
  if (!errors || !errors.response || !errors.response.data) {
    return { message: 'request server not found', statusCode: 404 };
  }
  const { statusCode, message, success, status } = errors.response.data;
  const newMsg = Array.isArray(message) && message.length ? message[0] : message;
  toast.error(newMsg || 'request server not found');
  console.log(statusCode);
  if (statusCode && statusCode === 401) {
    LocalStorageService.clearLocalStorage();
    return (window.location.href = PATH_PARAMS.SIGNIN);
  }
  if (!message && statusCode) {
    return { statusCode, message: 'request server not found', status };
  }
  if (message && !statusCode) {
    return { statusCode: 404, message: newMsg, status };
  }
  return { message: newMsg, statusCode, success, status };
}
