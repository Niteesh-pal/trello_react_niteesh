/* eslint-disable react/prop-types */
import { Box } from '@mui/material';

function BoardCard({ children, bg, onClickModal }) {
  return (
    <Box
      sx={{
        height: '100%',
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: bg?.backgroundBottomColor
          ? bg.backgroundBottomColor
          : 'gray',

        fontSize: '1.2rem',
        color: 'white',
        cursor: 'pointer',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      }}
      onClick={onClickModal}
    >
      {children}
    </Box>
  );
}

export default BoardCard;
