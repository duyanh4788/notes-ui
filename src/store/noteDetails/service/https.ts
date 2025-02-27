import { httpRequest } from 'services/request';
import { Api } from '../constants';
import { TypeApi } from 'commom/contants';
import {
  CNoteDetails,
  GetNoteDetails,
  NoteDetails,
  ParamsNoteDetails,
  ResNoteDetails,
  UNoteDetails,
} from 'interface/noteDetails';

export class NoteDetailsHttps {
  public created = (payload: CNoteDetails): Promise<void> => {
    return httpRequest(TypeApi.API_NOTES).post(Api.NOTE_DETAILS, payload);
  };

  public uploadFile = (payload: FormData): Promise<void> => {
    return httpRequest(TypeApi.API_NOTES).post(Api.UPLOAD_FILE, payload);
  };

  public updated = (payload: UNoteDetails): Promise<void> => {
    return httpRequest(TypeApi.API_NOTES).put(Api.NOTE_DETAILS, payload);
  };

  public deleted = (param: ParamsNoteDetails): Promise<void> => {
    const { id, noteId } = param;
    return httpRequest(TypeApi.API_NOTES).delete(`${Api.NOTE_DETAILS}/${id}?noteId=${noteId}`);
  };

  public getById = (param: ParamsNoteDetails): Promise<NoteDetails> => {
    const { id, noteId } = param;
    return httpRequest(TypeApi.API_NOTES).get(`${Api.NOTE_DETAILS}/${id}?noteId=${noteId}`);
  };

  public getAll = (params: GetNoteDetails): Promise<ResNoteDetails> => {
    const { skip, limit, noteId } = params;
    const param = `?noteId=${noteId}&skip=${skip}&limit=${limit}`;
    return httpRequest(TypeApi.API_NOTES).get(`${Api.NOTE_DETAILS}${param}`);
  };

  public search = (text: string): Promise<ResNoteDetails> => {
    return httpRequest(TypeApi.API_NOTES).get(`${Api.SEARCH}?text=${text.toLocaleLowerCase()}`);
  };
}
