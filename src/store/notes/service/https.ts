import { httpRequest } from 'services/request';
import { Api } from '../constants';
import { TypeApi } from 'commom/contants';
import { CountRes, Notes, PayloadCreateNote, ResNotes } from 'interface/notes';
import { Paging } from 'interface/paging';
import { Helper } from 'utils/helper';

export class NotesHttps {
  public created = (payload: { title: string }): Promise<void> => {
    return httpRequest(TypeApi.API_NOTES).post(Api.NOTES, payload);
  };

  public createdChild = (payload: { title: string; parrentId: string }): Promise<void> => {
    return httpRequest(TypeApi.API_NOTES).post(Api.NOTE_CHILD, payload);
  };

  public updated = (payload: PayloadCreateNote): Promise<void> => {
    const newPayload = Helper.payloadUpdateNote(payload);
    return httpRequest(TypeApi.API_NOTES).put(Api.NOTES, newPayload);
  };

  public deleted = (id: number): Promise<void> => {
    return httpRequest(TypeApi.API_NOTES).delete(`${Api.NOTES}/${id}`);
  };

  public getById = (id: number): Promise<Notes> => {
    return httpRequest(TypeApi.API_NOTES).get(`${Api.NOTES}/${id}`);
  };

  public getAll = (params: Paging): Promise<ResNotes> => {
    const { skip, limit } = params;
    const param = `?skip=${skip}&limit=${limit}`;
    return httpRequest(TypeApi.API_NOTES).get(`${Api.NOTES}${param}`);
  };

  public countByUserId = (id: string): Promise<CountRes> => {
    const param = `?noteId=${id}`;
    return httpRequest(TypeApi.API_NOTES).get(`${Api.COUNTS}/${param}`);
  };
}
