import { SearchRounded } from '@mui/icons-material';
import { IconButton, InputBase, Paper } from '@mui/material';

export const Search = () => {
  return (
    <Paper className="paper_search">
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search data' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchRounded />
      </IconButton>
    </Paper>
  );
};
