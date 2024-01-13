import { Box} from '@mui/material';

function BoardDetailHeader({ children }) {
  return (
    <Box
      sx={{
        padding: '1rem',
        bgcolor: 'rgba(0,0,0,0.3)',
        color:"white"
      }}
      
    >{
        children
    }
    </Box>
  );
}

export default BoardDetailHeader;
