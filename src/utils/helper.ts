import { Notes } from 'interface/notes';

export class Helper {
  static createChild(notes: Notes[], data: Notes) {
    return notes.map(note => {
      if (note.id === data.parentId) {
        const updatedNote = {
          ...note,
          childrens: note.childrens ? [...note.childrens, { ...data }] : [{ ...data }],
        };
        return updatedNote;
      }
      return { ...note };
    });
  }

  static updateChild(notes: Notes[], data: Notes) {
    return notes.map(note => {
      if (note.id === data.parentId) {
        const updatedChildren = note.childrens?.map(child =>
          child.id === data.id ? { ...child, ...data } : child,
        );
        return { ...note, childrens: updatedChildren };
      }
      return { ...note };
    });
  }

  static delChild(notes: Notes[], data: Notes) {
    return notes.map(note => {
      if (note.id === data.parentId) {
        const updatedChildren = note.childrens?.filter(child => child.id !== data.id);
        return { ...note, childrens: updatedChildren };
      }
      return { ...note };
    });
  }
}
