import { Users } from 'interface/users';
import { httpRequest } from 'services/request';
import { Api } from '../constants';

export class UserHttps {
  public signIn = (): Promise<void> => {
    return httpRequest().post(Api.SIGN_IN);
  };

  public signOut = (): Promise<void> => {
    return httpRequest().post(Api.SIGN_OUT);
  };

  public getById = (): Promise<Users> => {
    return httpRequest().get(Api.GET_BY_ID);
  };
}
