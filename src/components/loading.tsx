import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIsLoading } from 'store/loading/selectors';

export const LoaderFallBack = () => ({
  fallback: <Loading />,
});

export const Loading = () => {
  const loading = useSelector(selectIsLoading);
  if (!loading) return;

  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
};
