import { httpRequest } from 'services/request';
import { Api } from '../constants';
import { TypeApi } from 'commom/contants';
import { Notes, ParamsGetNotes, ResNotes } from 'interface/notes';

export class NotesHttps {
  public created = (payload: { title: string }): Promise<void> => {
    return httpRequest(TypeApi.API_NOTES).post(Api.NOTES, payload);
  };

  public createdChild = (payload: { title: string; parrentId: number }): Promise<void> => {
    return httpRequest(TypeApi.API_NOTES).post(Api.NOTE_CHILD, payload);
  };

  public updated = (payload: { title: string }): Promise<void> => {
    return httpRequest(TypeApi.API_NOTES).put(Api.NOTES, payload);
  };

  public deleted = (id: number): Promise<void> => {
    return httpRequest(TypeApi.API_NOTES).delete(`${Api.NOTES}/${id}`);
  };

  public getById = (id: number): Promise<Notes> => {
    return httpRequest(TypeApi.API_NOTES).get(`${Api.NOTES}/${id}`);
  };

  public getAll = (params: ParamsGetNotes): Promise<ResNotes> => {
    const { skip, limit } = params;
    const param = `?skip=${skip}&limit=${limit}`;
    return httpRequest(TypeApi.API_NOTES).get(`${Api.NOTES}${param}`);
  };
}
