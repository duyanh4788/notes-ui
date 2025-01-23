import { TimerType } from 'commom/contants';
import { Notes } from 'interface/notes';
import moment from 'moment';

export class Helper {
  static createChild(notes: Notes[], data: Notes) {
    return notes.map(note => {
      if (note.id === data.parentId) {
        const updatedNote = {
          ...note,
          _count: { children: note._count.children + 1, noteDetails: note._count.noteDetails },
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
          _count: { children: child._count.children + 1, noteDetails: child._count.noteDetails },
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
        return {
          ...note,
          _count: { children: note._count.children - 1, noteDetails: note._count.noteDetails },
          children: updatedChildren,
        };
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

  static formatDateTime(date: Date | string | undefined) {
    return moment(date || new Date()).format('DD/MM/YYYY HH:mm:ss');
  }

  static getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return { hours, minutes, seconds };
  }

  static changeTime(scheduleTime: string, unit: TimerType, value: number) {
    const currentTime = new Date(scheduleTime);
    switch (unit) {
      case TimerType.HOUR:
        currentTime.setHours(value);
        break;
      case TimerType.MINUTE:
        currentTime.setMinutes(value);
        break;
      case TimerType.SECOND:
        currentTime.setSeconds(value);
        break;
      default:
        break;
    }
    return currentTime.toISOString();
  }

  static newDateToString() {
    const newDate = new Date();
    return newDate.toISOString();
  }
}
