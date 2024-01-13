import { Box } from '@mui/material';

export default function Header() {
  return (
    <Box
      p={2}
      sx={{
        color: 'white',
        fontFamily: 'sans-serif',
        bgcolor:"#1d2125",
        borderBottom:"0.5px solid gray"
      }}
    >
      <Box sx={{bgcolor:"#1d2125"}}>Trello</Box>
    </Box>
  );
}
