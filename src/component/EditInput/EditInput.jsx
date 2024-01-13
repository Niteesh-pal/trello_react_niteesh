import { Box, Button, Popover, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function EditInput({ handleClose, handleAdd, title }) {
  let userInput = '';
  return (
    <div>
      <Box
        component={'form'}
        py={'0.5rem'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          background: 'transparent',
          outline: 'none',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleClose();
          handleAdd(userInput.trim());
        }}
      >
        <TextField
          size="small"
          id="outlined-basic"
          variant="outlined"
          autoFocus={true}
          placeholder={title}
          sx={{
            input: {
              // width:"12.3rem",
              color: 'white',
              border: '1px solid rgba(255,255,255,0.8)',
              borderRadius: '0.2rem',
              fontSize: '15px',
              '&:hover': { border: '1px solid white' },
              '&:focus': { border: 'none', backgroundColor: 'rgba(0,0,0,0.1)' },
              '&::placeholder': { color: 'white', fontWeight: '400' },
            },
            label: {
              color: 'white',
            },
          }}
          onChange={(e) => (userInput = e.target.value)}
        />
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}
        >
          <Button
            type="submit"
            size="small"
            sx={{
              padding: '0.4rem 0.5rem',
              marginRight: '0.2rem',
              backgroundColor: '#579dff',
              color: 'black',
              '&:hover': {
                backgroundColor: '#69a5fa',
              },
            }}
          >
            Add card
          </Button>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.2rem',
              color: 'white',
              borderRadius: '0.3rem',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
            }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: '1.5rem' }} />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default EditInput;
