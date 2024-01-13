import { Box, TextField } from '@mui/material';

function OpenInputField() {
  return (
    <Box
      border={'1px solid red'}
      sx={{
        height: 'fit-content',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        backgroundColor:"rgba(255,255,255,0.4)"
      }}
    >
      <Box
        component={'form'}
        sx={{ width: '15rem' }}
        border={'1px solid white'}
      >
        <TextField />
      </Box>
    </Box>
  );
}

export default OpenInputField;
