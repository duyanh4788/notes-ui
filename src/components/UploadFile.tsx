import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { KeyFromData } from 'commom/contants';

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    color: '#ff6a0057',
    padding: '5px',
    '&:hover p,&:hover svg,& img': {
      opacity: 1,
    },
    '& p, svg': {
      opacity: 0.4,
    },
    '&:hover img': {
      opacity: 0.3,
    },
  },
  iconText: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  hidden: {
    display: 'none',
  },
  onDragOver: {
    '& img': {
      opacity: 0.3,
    },
    '& p, svg': {
      opacity: 1,
    },
  },
});

export type UploadFileProps = {
  accept?: string;
  hoverLabel?: string;
  dropLabel?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  image?: {
    url: string;
    imageStyle?: {
      width?: string;
      height?: string;
    };
  };
  idInput?: string;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
  onChange: (newFormData: FormData | null) => void;
};

export const UploadFile: React.FC<UploadFileProps> = ({
  accept,
  hoverLabel = 'Click or drag to upload file',
  dropLabel = 'Drop file here',
  width = '60px',
  height = '60px',
  backgroundColor = 'none',
  idInput,
  onDrop,
  onChange,
}) => {
  const classes = useStyles();
  const [labelText, setLabelText] = React.useState<string>(hoverLabel);
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);
  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const dragEvents = {
    onDragEnter: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLabel);
    },
    onDragLeave: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e);
      setLabelText(hoverLabel);
      setIsDragOver(false);
      onDrop(e);
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
    <React.Fragment>
      <input
        onChange={handleChange}
        accept={accept}
        className={classes.hidden}
        id={idInput}
        type="file"
        multiple
      />
      <label
        htmlFor={idInput}
        {...dragEvents}
        className={clsx(classes.root, isDragOver && classes.onDragOver)}
      >
        <Box width={width} height={height} bgcolor={backgroundColor}>
          <Box height={height} width={width} className={classes.iconText}>
            <Tooltip title={labelText} arrow open placement="right-start">
              <CloudUpload fontSize="small" />
            </Tooltip>
          </Box>
        </Box>
      </label>
    </React.Fragment>
  );
};
