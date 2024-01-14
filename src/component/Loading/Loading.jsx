import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
function Loading() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '86vh',
        color: 'white',
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        // border: '1px solid white',
      }}
    
    >
     <CircularProgress sx={{color:"white"}}/> 
    </Box>
  );
}

export default Loading;
