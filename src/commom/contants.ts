export const PATH_PARAMS = {
  REPLACE: '*',
  HOME: '/',
  SIGNIN: '/signin',
};

export const NoteType = [];

export enum StatusType {
  ACTIVE = 'active',
  PENDING = 'pending',
  INACTIVE = 'inactive',
  BANNED = 'banned',
  DELETED = 'deleted',
}

export enum TypeApi {
  API_USERS = 'API_USERS',
  API_NOTES = 'API_NOTES',
}

export enum TypeSaga {
  CREATED = 'CREATED',
  CREATED_CHILD = 'CREATED_CHILD',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export const LIMIT = 5;
