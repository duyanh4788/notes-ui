import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LocalStorageKey, LocalStorageService } from './localStorage';
import { config } from 'utils/config';
import { TypeApi } from 'commom/contants';
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
  const { data, code, message, success, status } = response.data;
  if (code >= 400 && code <= 500) {
    throw Object.assign(new Error(message), { code });
  }
  return { data, message, code, success, status };
}

export function configResponseError(errors: AxiosError | any): any {
  if (!errors || !errors.response || !errors.response.data) {
    return { message: 'request server not found', code: 404 };
  }
  const { code, message, success, status } = errors.response.data;
  if (!message && code) {
    return { code, message: 'request server not found', status };
  }
  if (message && !code) {
    return { code: 404, message, status };
  }
  return { message, code, success, status };
}
