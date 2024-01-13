/* eslint-disable react/prop-types */
import { Box, Button, TextField } from '@mui/material';
import createImage from '../../assets/modal-image.svg';

function CreateBoard({ handleCreateBoard, open }) {
  let userInput = '';

  return (
    <Box sx={{backgroundColor:"rgb(81, 79, 79)", padding:"1rem", borderRadius:"0.5rem"}}>
      <Box
        className="heading"
        sx={{ textAlign: 'center', color: 'white', marginBottom: '1rem' }}
      >
        {' '}
        Create Board
      </Box>
      <Box
        className="image"
        sx={{
          minWidth: '15rem',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url("https://images.unsplash.com/photo-1508313157893-34fe6176c189?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
          backgroundSize: 'cover',
        }}
      >
        <img src={createImage} alt="" style={{ width: '90%' }} />
      </Box>
      <Box
        className="form-content"
        my={2}
        component={'form'}
        onSubmit={(e) => {
          e.preventDefault(), handleCreateBoard(userInput);
        }}
      >
        <TextField
          size="small"
          id="outlined-basic"
          label="Board Title"
          variant="outlined"
          autoFocus={open}
          sx={{
            width: '100%',
            input: {
              color: 'white',
              border: '1px solid white',
              borderRadius: '0.2rem',
              '&:hover': { border: '1px solid white' },
              '&:focus': { border: 'none' },
              '&::placeholder': { color: 'white' },
            },
            label: {
              color: 'white',
            },
          }}
          onChange={(e) => (userInput = e.target.value)}
        />
        <Button
          type="submit"
          sx={{
            width: '100%',
            marginTop: '1rem',
            backgroundColor: '#595858',
            color: 'white',
            '&:hover': { backgroundColor: '#696868' },
          }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}

export default CreateBoard;
