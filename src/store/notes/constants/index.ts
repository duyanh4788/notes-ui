const userPath = (path?: string): string => (!path ? `/notes` : `/notes/${path}`);

export const Api = {
  NOTES: userPath(''),
  NOTE_CHILD: userPath('child'),
  COUNTS: userPath('counts'),
};
