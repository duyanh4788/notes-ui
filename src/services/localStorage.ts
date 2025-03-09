import { config } from 'utils/config';

export enum TypeLocal {
  GET = 'GET',
  SET = 'SET',
  CLEAR = 'CLEAR',
  REMOVE = 'REMOVE',
}

export type LocalStorageItem = {
  key: string;
  value: string;
};

export enum LocalStorageKey {
  userId = '_userId',
  userToken = '_userToken',
  offAdd = '_off_add',
}

export class LocalStorageService {
  static setItem({ key, value }: LocalStorageItem): LocalStorageService {
    localStorage.setItem(key, JSON.stringify(value));
    return this;
  }

  static getItem(key: string): null {
    const value = localStorage.getItem(key);
    if (value === null || value === 'undefined') return null;
    return JSON.parse(value);
  }

  static clearLocalStorage() {
    if (config.NODE_ENV === 'production') {
      localStorage.clear();
    }
  }

  static removeLocalStorageByKey(key: string) {
    localStorage.removeItem(key);
  }
}
