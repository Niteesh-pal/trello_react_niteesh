import { Box } from "@mui/material"
import errorImage from "../../assets/error3.png"


function Error() {
  return (
    <Box sx={{maxHeight:"90vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <img src={errorImage} alt="" style={{width:"50%", objectFit:"cover"}} />
        
   </Box>
  )
}

export default Error