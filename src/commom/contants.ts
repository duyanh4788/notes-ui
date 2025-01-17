export const PATH_PARAMS = {
  REPLACE: '*',
  HOME: '/',
  SIGNIN: '/signin',
};

export enum StatusType {
  ACTIVE = 'active',
  PENDING = 'pending',
  INACTIVE = 'inactive',
  BANNED = 'banned',
  DELETED = 'deleted',
}

export enum NoteType {
  DOC = 'doc',
  FOLDER = 'folder',
  PDF = 'pdf',
  PINNED = 'pinned',
}

export enum NoteDetailType {
  STRING = 'string',
  CODE = 'code',
  SCHEDULE = 'schedule',
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
  GET_ALL = 'GET_ALL',
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

export const LangCodes = [
  { label: 'JavaScript', value: 'javascript', shortName: 'JS' },
  { label: 'TypeScript', value: 'typescript', shortName: 'TS' },
  { label: 'CSS', value: 'css', shortName: 'CSS' },
  { label: 'HTML', value: 'html', shortName: 'HTML' },
  { label: 'JSON', value: 'json', shortName: 'JSON' },
  { label: 'Markdown', value: 'markdown', shortName: 'MD' },
  { label: 'XML', value: 'xml', shortName: 'XML' },
  { label: 'YAML', value: 'yaml', shortName: 'YAML' },
  { label: 'Python', value: 'python', shortName: 'PY' },
  { label: 'Java', value: 'java', shortName: 'JAVA' },
  { label: 'C++', value: 'cpp', shortName: 'C++' },
  { label: 'C#', value: 'csharp', shortName: 'C#' },
  { label: 'Go', value: 'go', shortName: 'GO' },
  { label: 'PHP', value: 'php', shortName: 'PHP' },
  { label: 'Ruby', value: 'ruby', shortName: 'RB' },
  { label: 'Swift', value: 'swift', shortName: 'SW' },
  { label: 'Rust', value: 'rust', shortName: 'RS' },
  { label: 'Kotlin', value: 'kotlin', shortName: 'KT' },
  { label: 'SQL', value: 'sql', shortName: 'SQL' },
  { label: 'Shell/Bash', value: 'shell', shortName: 'SH' },
];

export enum TooltipTitle {
  VIEW = 'View',
  SAVE = 'Save',
  ADD = 'Add',
  DEL = 'Del',
  EDT = 'Edit',
  COPY = 'Copy',
  SEL_TYPE = 'Select type',
}

export enum PageType {
  MAIN = 'MAIN',
  MODAL = 'MODAL',
}

export enum TimerType {
  HOUR = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
}
