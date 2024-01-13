import { Box } from '@mui/material';
import EditCard from './EditCard';

function Card({ name }) {
  return (
    <Box
      className="card-container"
      sx={{
        // border: '1px solid white',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem',
        margin: '0.5rem 0rem',
        borderRadius:"0.3rem",
        backgroundColor:"rgba(0,0,0,0.2)"
      }}
    >
      <Box sx={{color:"white"}}>{name}</Box>
      <EditCard />
    </Box>
  );
}

export default Card;
