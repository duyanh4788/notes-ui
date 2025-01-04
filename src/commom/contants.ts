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

export enum SECOND {
  TWO = 200,
  THREE = 400,
  FOUR = 700,
  SIX = 2000,
  SEVEN = 2200,
  HOLD = 10000,
}

export const TitleTech = [
  'Build on NestJS',
  '*Microservice with source turbo',
  '*RabbitMQ, Redis, Elasticsearch, Postgres',
  '*Github: https://github.com/duyanh4788',
  '*Email: duyanh4788@gmail.com',
];

export const TitleProject = [
  'Notes for Everything You Need',
  '*Personal notes',
  '*Code snippets',
  '*Scheduling (e.g., send emails based on a time schedule)',
];
