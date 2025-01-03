import { useSortable } from '@dnd-kit/sortable';
import { AddRounded, DeleteRounded, EditRounded, SaveRounded } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { TreeItem } from '@mui/x-tree-view';
import { Notes } from 'interface/notes';

interface Props {
    note: Notes;
    noteId: number;
    isAddingChild: number | null;
    newNodeChildName: string;
    setNewNodeChildName: (value: string) => void;
    handleAddChild: (parentId: number) => void;
    onEdit: (id: number, title: string) => void;
    onDelete: (id: number) => void;
    onAddChild: (id: number) => void;
    onSave: (id: number) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    title: string;
    setTitle: (value: string) => void;
}
export const NoteItem = (props: Props) => {
    const {
        note,
        noteId,
        isAddingChild,
        newNodeChildName,
        setNewNodeChildName,
        handleAddChild,
        onEdit,
        onDelete,
        onAddChild,
        onSave,
        inputRef,
        title,
        setTitle,
    } = props;

    const { attributes, listeners, setNodeRef } = useSortable({
        id: `${note.id}`,
    });

    const renderNotes = (note: Notes) => {

        return (
            <TreeItem
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                key={note.id}
                itemId={`${note.title}_${note.id}`}
                label={
                    noteId === note.id ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                ref={inputRef}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="trees_text_field"
                                sx={{ marginRight: 1 }}
                                autoFocus
                            />
                            <IconButton size="small" onClick={() => onSave(note.id)}>
                                <SaveRounded />
                            </IconButton>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>{note.title}</span>
                            <Box>
                                <IconButton size="small" onClick={() => onEdit(note.id, note.title)}>
                                    <EditRounded />
                                </IconButton>
                                <IconButton size="small" onClick={() => onDelete(note.id)}>
                                    <DeleteRounded />
                                </IconButton>
                                <IconButton size="small" onClick={() => onAddChild(note.id)}>
                                    <AddRounded />
                                </IconButton>
                            </Box>
                        </Box>
                    )
                }
            >
                {note.childrens && note.childrens.length ? note.childrens.map(renderNotes) : null}
                {isAddingChild === note.id && (
                    <Box sx={{ marginLeft: 3, display: 'flex', alignItems: 'center' }}>
                        <TextField
                            className="trees_text_field"
                            value={newNodeChildName}
                            onChange={e => setNewNodeChildName(e.target.value)}
                            placeholder="Enter child node name"
                        />
                        <IconButton size="small" onClick={() => handleAddChild(note.id)}>
                            <SaveRounded />
                        </IconButton>
                    </Box>
                )}
            </TreeItem>
        );
    };

    return renderNotes(note);
};
