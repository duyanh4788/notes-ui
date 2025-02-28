import React, { useEffect } from 'react';
import { Box, Tooltip } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { KeyFromData, MsgToast } from 'commom/contants';

export type UploadFileProps = {
  accept: string;
  idInput?: string;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
  onChange: (newFormData: FormData | null) => void;
};

export const UploadFile: React.FC<UploadFileProps> = ({ accept, idInput, onDrop, onChange }) => {
  const [labelText, setLabelText] = React.useState<string>(MsgToast.HOVER_LABEL);
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);

  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dragEvents = {
    onDragEnter: (e: React.DragEvent) => {
      e.preventDefault();
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(MsgToast.DROP_LABEL);
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e);
      setLabelText(MsgToast.HOVER_LABEL);
      setIsDragOver(false);
      onDrop(e);
    },
    onDragLeave: (e: React.DragEvent) => {
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      if (elementUnderCursor?.closest('.upload_label, .dragging')) {
        return;
      }
      if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node)) {
        stopDefaults(e);
        setIsDragOver(false);
        setLabelText(MsgToast.HOVER_LABEL);
      }
    },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files }: any = event.target;
    if (files !== null && files.length > 0) {
      const newFormData = new FormData();
      for (let i = 0; i < files.length; i++) {
        newFormData.append(KeyFromData.UPLOAD, files[i]);
      }
      onChange(newFormData);
    }
  };

  return (
    <Tooltip title={labelText} arrow open placement="right-start">
      <Box>
        <input onChange={handleChange} accept={accept} id={idInput} type="file" multiple hidden />
        <label
          htmlFor={idInput}
          {...dragEvents}
          className={isDragOver ? 'upload_label show' : 'upload_label'}
        >
          <CloudUpload fontSize="small" />
          {isDragOver && <span className="dragging">{MsgToast.DROP_LABEL}</span>}
        </label>
      </Box>
    </Tooltip>
  );
};
