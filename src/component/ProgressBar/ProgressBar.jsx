import { Box, LinearProgress, Typography } from '@mui/material';

export default function ProgressBar({ value }) {
  return (
    <Box display={'flex'} alignItems={'center'} gap={'1rem'} margin={1}>
      <Typography component={'p'} sx={{ fontSize: '10px',color:"white"}} >
        {value}%
      </Typography>
      <Box sx={{ width: '100%',background:"rgba(0,0,0,0.2)" ,color:value ===100?"#4bce97":"rgba(255,255,255,0.5)" }}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{ borderRadius: '0.5rem' }}
          color="inherit"
        />
      </Box>
    </Box>
  );
}
