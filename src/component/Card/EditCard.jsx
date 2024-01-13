import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box } from '@mui/material';

function EditCard() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.2rem',
        borderRadius: '100%',
        color: 'white',
        cursor:"pointer",
        // border: '1px solid black',
        "&:hover":{backgroundColor:"rgba(255,255,255,0.1)"}
      }}
    >
      <EditNoteIcon />
    </Box>
  );
}

export default EditCard;
