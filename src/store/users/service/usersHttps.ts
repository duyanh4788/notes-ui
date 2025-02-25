import { Banners, Users } from 'interface/users';
import { httpRequest } from 'services/request';
import { Api } from '../constants';
import { TypeApi } from 'commom/contants';

export class UserHttps {
  public signIn = (): Promise<void> => {
    return httpRequest(TypeApi.API_USERS).post(Api.SIGN_IN);
  };

  public signOut = (): Promise<void> => {
    return httpRequest(TypeApi.API_USERS).post(Api.SIGN_OUT);
  };

  public getById = (): Promise<Users> => {
    return httpRequest(TypeApi.API_USERS).get(Api.GET_BY_ID);
  };

  public getBanner = (): Promise<Banners[]> => {
    return httpRequest(TypeApi.API_USERS).get(Api.BANNERS);
  };
}
