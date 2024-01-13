import { Box, LinearProgress, Typography } from '@mui/material'



export default function ProgressBar({value}) {




  return (
    <Box display={"flex"} alignItems={"center"} gap={"1rem"} margin={1}>
            <Typography component={"p"} sx={{fontSize:"10px",}}>{value}%</Typography>
            <Box sx={{width:"100%"}}>
            <LinearProgress  variant="determinate" value={value} sx={{borderRadius:"0.5rem"}}/>
            </Box>
        </Box>
  )
}
