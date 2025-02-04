import { SearchRounded } from '@mui/icons-material';
import { IconButton, InputBase, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as NoteDetailsSlice from 'store/noteDetails/shared/slice';

interface Props {
  textSearch: string | null;
  setTextSearch: (text: string | null) => void;
}

export const Search = (props: Props) => {
  const { textSearch, setTextSearch } = props;
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (!textSearch) return;
    dispatch(NoteDetailsSlice.actions.searchLoad(textSearch));
  };

  return (
    <Paper className="paper_search">
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search data' }}
        value={textSearch}
        onChange={e => {
          if (e.target.value === '') {
            setTextSearch(null);
          } else {
            setTextSearch(e.target.value);
          }
        }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <SearchRounded />
      </IconButton>
    </Paper>
  );
};
