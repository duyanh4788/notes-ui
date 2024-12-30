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

export enum StatusType {
  ACTIVE = 'active',
  PENDING = 'pending',
  INACTIVE = 'inactive',
  BANNED = 'banned',
  DELETED = 'deleted',
}
