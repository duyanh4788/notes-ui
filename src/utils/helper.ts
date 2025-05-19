import { MsgToast, NoteDetailType, TimerType } from 'commom/contants';
import { Notes, PayloadCreateNote } from 'interface/notes';
import moment from 'moment';
import { toast } from 'react-toastify';
import { faker } from '@faker-js/faker';
import { FakeNoteDetails } from 'interface/noteDetails';
export class Helper {
  static deepFind(notes: Notes[], noteId: string): Notes | null {
    for (const note of notes) {
      if (note.id === noteId) {
        return note;
      }
      if (note.children) {
        const found = Helper.deepFind(note.children, noteId);
        if (found) return found;
      }
    }
    return null;
  }

  static createChild(notes: Notes[], data: Notes) {
    return notes
      .map(note => {
        if (note.id === data.parentId) {
          const updatedNote = {
            ...note,
            _count: {
              children: (note?._count?.children || 0) + 1,
              noteDetails: note?._count?.noteDetails || 0,
            },
            children:
              note.children && note.children.length
                ? [...note.children, { ...data }]
                : [{ ...data }],
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
      })
      .sort((a, b) => a.sorting - b.sorting);
  }

  static addChildToChild(children: Notes[], data: Notes): Notes[] {
    return children
      .map(child => {
        if (child.id === data.parentId) {
          return {
            ...child,
            _count: {
              children: (child?._count?.children || 0) + 1,
              noteDetails: child?._count?.noteDetails || 0,
            },
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
      })
      .sort((a, b) => a.sorting - b.sorting);
  }

  static updateChild(notes: Notes[], data: Notes) {
    return notes
      .map(note => {
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
      })
      .sort((a, b) => a.sorting - b.sorting);
  }

  static updateChildInChild(children: Notes[], data: Notes): Notes[] {
    return children
      .map(child => {
        if (child.id === data.id) {
          return { ...child, ...data };
        } else if (child.children) {
          return {
            ...child,
            children: this.updateChildInChild(child.children, data),
          };
        }

        return child;
      })
      .sort((a, b) => a.sorting - b.sorting);
  }

  static delChild(notes: Notes[], data: Notes) {
    return notes
      .map(note => {
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
      })
      .sort((a, b) => a.sorting - b.sorting);
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
      .filter((child): child is Notes => child !== null && child !== undefined)
      .sort((a, b) => a.sorting - b.sorting);
  }

  static updateOrderRing(notes: Notes[], data: Notes, payload: any): Notes[] {
    try {
      let newNotes = structuredClone(notes);
      const oldSorting = payload.oldPosition;
      const newSorting = data.sorting;

      const targetNode = newNotes.find(note => note.id === data.id && !data.parentId);
      if (targetNode) {
        targetNode.sorting = newSorting;

        newNotes.forEach(note => {
          if (note.id !== data.id) {
            if (
              oldSorting < newSorting &&
              note.sorting > oldSorting &&
              note.sorting <= newSorting
            ) {
              note.sorting -= 1;
            } else if (
              oldSorting > newSorting &&
              note.sorting >= newSorting &&
              note.sorting < oldSorting
            ) {
              note.sorting += 1;
            }
          }
        });

        return newNotes.sort((a, b) => a.sorting - b.sorting);
      } else if (!targetNode && !data.parentId) {
        const { newTree, movedNode } = Helper.removeNode(newNotes, data.id);
        newNotes = newTree;
        if (movedNode) {
          newNotes.push(movedNode);
        }
        return newNotes.sort((a, b) => a.sorting - b.sorting);
      } else if (data.parentId) {
        const { newTree, movedNode } = Helper.removeNode(newNotes, data.id);
        newNotes = newTree;
        if (movedNode) {
          movedNode.sorting = data.sorting;
          movedNode.parentId = data.parentId;

          function insertIntoParent(tree: Notes[], parentId: string): boolean {
            for (const node of tree) {
              if (node.id === parentId) {
                const children = [...(node.children || [])];

                children.forEach(child => {
                  if (child.sorting >= newSorting) {
                    child.sorting += 1;
                  }
                });

                if (movedNode) {
                  children.push(movedNode);
                }
                node.children = children.sort((a, b) => a.sorting - b.sorting);
                return true;
              }
              if (node.children && insertIntoParent(node.children, parentId)) return true;
            }
            return false;
          }

          insertIntoParent(newNotes, data.parentId);
        }
      }

      return newNotes;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(MsgToast.ORDERING_FAILD);
      }
      return notes;
    }
  }

  static removeNode(tree: Notes[], nodeId: string): { newTree: Notes[]; movedNode: Notes | null } {
    let movedNode: Notes | null = null;
    function recursiveRemove(nodes: Notes[]): Notes[] {
      return nodes
        .filter(node => {
          if (node.id === nodeId) {
            movedNode = { ...node };
            return false;
          }
          if (node.children) {
            node.children = recursiveRemove(node.children);
          }
          return true;
        })
        .sort((a, b) => a.sorting - b.sorting);
    }

    return { newTree: recursiveRemove(tree), movedNode };
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

  static truncateString(str: string, maxLength: number = 50) {
    if (!str) return '...';
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
  }

  static payloadUpdateNote(payload: PayloadCreateNote) {
    const newPayload: Record<string, any> = {
      id: payload.id,
    };
    if (payload.label) {
      newPayload.label = payload.label;
    }
    if (payload.status) {
      newPayload.status = payload.status;
    }
    if (payload.parentId || payload.parentId === null) {
      newPayload.parentId = payload.parentId;
    }
    if (payload.sorting) {
      newPayload.sorting = payload.sorting;
    }

    return newPayload;
  }

  static fakeNoteDetails(noteId: string) {
    const type = faker.helpers.arrayElement(['string', 'code']) as NoteDetailType;

    const faKe: FakeNoteDetails = {
      title: faker.lorem.sentence(),
      noteId,
      type,
      content: '',
    };

    switch (type) {
      case NoteDetailType.SCHEDULE:
        faKe.scheduleTime = moment()
          .add(faker.number.int({ min: 1, max: 30 }), 'days')
          .toISOString();
        faKe.content = faker.lorem.paragraph();
        break;

      case NoteDetailType.CODE:
        faKe.content = faker.hacker.phrase();
        break;

      case NoteDetailType.STRING:
        faKe.content = faker.lorem.paragraph();
        break;
    }

    return faKe;
  }
}
