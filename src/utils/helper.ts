import { Notes } from 'interface/notes';

export class Helper {
  static createChild(notes: Notes[], data: Notes) {
    return notes.map(note => {
      if (note.id === data.parentId) {
        const updatedNote = {
          ...note,
          children:
            note.children && note.children.length ? [...note.children, { ...data }] : [{ ...data }],
        };
        return updatedNote;
      }

      if (note.children) {
        return {
          ...note,
          children: this.addChildToChild(note.children, data),
        };
      }

      return note;
    });
  }

  static addChildToChild(children: Notes[], data: Notes): Notes[] {
    return children.map(child => {
      if (child.id === data.parentId) {
        return {
          ...child,
          children:
            child.children && child.children.length
              ? [...child.children, { ...data }]
              : [{ ...data }],
        };
      } else if (child.children) {
        return {
          ...child,
          children: this.addChildToChild(child.children, data),
        };
      }
      return child;
    });
  }

  static updateChild(notes: Notes[], data: Notes) {
    return notes.map(note => {
      if (note.id === data.parentId) {
        const updatedChildren = this.updateChildInChild(note.children, data);
        return { ...note, children: updatedChildren };
      }

      if (note.children) {
        return {
          ...note,
          children: this.updateChildInChild(note.children, data),
        };
      }

      return note;
    });
  }

  static updateChildInChild(children: Notes[], data: Notes): Notes[] {
    return children.map(child => {
      if (child.id === data.id) {
        return { ...child, ...data };
      } else if (child.children) {
        return {
          ...child,
          children: this.updateChildInChild(child.children, data),
        };
      }

      return child;
    });
  }

  static delChild(notes: Notes[], data: Notes) {
    return notes.map(note => {
      if (note.id === data.parentId) {
        const updatedChildren = this.delChildInChild(note.children, data);
        return { ...note, children: updatedChildren };
      }

      if (note.children) {
        return {
          ...note,
          children: this.delChildInChild(note.children, data),
        };
      }

      return note;
    });
  }

  static delChildInChild(children: Notes[], data: Notes): Notes[] {
    return children
      .map(child => {
        if (child.id === data.id) {
          return null;
        } else if (child.children) {
          return {
            ...child,
            children: this.delChildInChild(child.children, data),
          };
        }

        return child;
      })
      .filter((child): child is Notes => child !== null && child !== undefined);
  }

  static randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
