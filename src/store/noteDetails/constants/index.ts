const userPath = (path?: string): string => (!path ? `/note-details` : `/note-details/${path}`);

export const Api = {
  NOTE_DETAILS: userPath(''),
  SEARCH: userPath('search'),
  UPLOAD_FILE: userPath('upload-file'),
};
