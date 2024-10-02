
import { Backdrop, CircularProgress } from '@mui/material';

export default function BackdropProgress({isLoading}) {
  return (
    <Backdrop sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1000 }}
      open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}