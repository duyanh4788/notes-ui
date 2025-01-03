import { StatusType } from 'commom/contants';

export interface Users {
  id?: number;
  userName?: string;
  avatar?: string;
  tokenData?: string;
  tokenGg?: string;
  role?: UserRole;
  email?: string;
  notesCount?: number;
  status?: StatusType;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
