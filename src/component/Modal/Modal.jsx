import { Box, Modal } from '@mui/material';

function OpenModal({ handleClose, open, children }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'transparent',
    borderRadius:"0.5rem",
    border:"none",
    outline:"none",
    p: 3,
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ bgcolor: 'rgba(0,0,0,0.01)',}}
      >
        <Box sx={style} >
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex:5,
              margin: '0.5rem',
              color:"white",
              padding: '0.3rem 0.8rem',
              fontSize:"1.5rem",
              fontWeight:"400",
              borderRadius: '100%',
              cursor:'pointer',
              "&:hover":{backgroundColor:"rgb(97, 95, 95)"}
            }}
            
            onClick={handleClose}
          >
            &times;
          </Box>
          <Box >
          {children}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default OpenModal;
