import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';

export const TreesNotes = () => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [newNodeName, setNewNodeName] = useState('');
  const [parentNode, _] = useState<string | null>(null);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  const handleAddNode = () => {
    if (!newNodeName.trim()) return;

    const newNode = {
      id: Date.now().toString(),
      name: newNodeName,
      children: [],
    };

    if (parentNode) {
      const updatedNodes = nodes.map(node => {
        if (node.id === parentNode) {
          return { ...node, children: [...node.children, newNode] };
        }
        return node;
      });
      setNodes(updatedNodes);
    } else {
      setNodes([...nodes, newNode]);
    }

    setNewNodeName('');
    setEditingNodeId(null);
  };

  const handleEditNode = (nodeId: string) => {
    setEditingNodeId(nodeId);
  };

  const handleSaveNode = (nodeId: string, newName: string) => {
    const updatedNodes = nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, name: newName };
      }
      return node;
    });
    setNodes(updatedNodes);
    setEditingNodeId(null);
  };

  const renderTree = (node: any) => {
    return (
      <TreeItem
        key={node.id}
        itemId={node.id}
        label={
          editingNodeId === node.id ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                value={newNodeName}
                onChange={e => setNewNodeName(e.target.value)}
                onBlur={() => handleSaveNode(node.id, newNodeName)}
                autoFocus
                size="small"
              />
              <Button onClick={() => handleSaveNode(node.id, newNodeName)}>Save</Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <span>{node.name}</span>
              <Button onClick={() => handleEditNode(node.id)}>Edit</Button>
            </Box>
          )
        }
      >
        {node.children && node.children.length > 0 ? node.children.map(renderTree) : null}
      </TreeItem>
    );
  };

  return (
    <Box sx={{ width: '300px', margin: 'auto' }}>
      <SimpleTreeView>{nodes.map(renderTree)}</SimpleTreeView>
      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="File Name"
          value={newNodeName}
          onChange={e => setNewNodeName(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button onClick={handleAddNode} variant="contained" sx={{ marginLeft: 1 }}>
          Add File
        </Button>
      </Box>
    </Box>
  );
};
