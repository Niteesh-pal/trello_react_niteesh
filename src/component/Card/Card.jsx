/* eslint-disable react/prop-types */
import { Box } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import OpenModal from '../Modal/Modal';
import { useState } from 'react';
import CardDetail from './CardDetail';

function Card({ name, cardId, handleDelete }) {

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  return (
    <div>
    <Box
      className="card-container"
      sx={{
        
        display: 'flex',
        alignItems:"center",
        justifyContent: 'space-between',
        padding: '0.5rem',
        margin: '0.5rem 0rem',
        borderRadius: '0.3rem',
        backgroundColor: 'rgba(0,0,0,0.2)',
        cursor:"pointer"
      }}
      onClick={handleOpen}
    >
      <Box sx={{ color: 'white', width:"11rem",}}>{name}</Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.2rem 0.4rem',
          borderRadius: '100%',
          color: 'white',
          cursor: 'pointer',
          // border: '1px solid black',
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(cardId);
        }}
      >
        <DeleteIcon sx={{ width: '1rem' }} />
      </Box>
    </Box>
    <OpenModal open={open} handleClose={handleClose}>
      <CardDetail name={name} cardId={cardId}/>
    </OpenModal>
    </div>
  );
}

export default Card;
