/* eslint-disable react/prop-types */
import { Box, Button, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  archiveApiData,
  fetchApiData,
  getApiData,
  postApiData,
} from '../../ApiConfig/Api';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '../Card/Card';
import EditInput from '../EditInput/EditInput';
import Error from '../Error/Error';
import { useDispatch, useSelector } from 'react-redux';
import { setCards, addCards, deleteCard } from '../../app/Slices/cardSlice';

function List({ listId, name, handleArchive }) {
  // const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { cards } = useSelector((state) => state.cards);

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetchApiData(`/lists/${listId}/cards`);
      dispatch(setCards(res.data));
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    // getApiData(`/lists/${listId}/cards`, setCards, setLoading, setError);
    fetchData();
  }, []);


  const handleAddCard = async (userInput) => {
    if (userInput === '') {
      return alert('please specify card name');
    }
    if (userInput.length > 15) {
      return alert('out of word limit');
    }
    const res = await postApiData(`/cards?name=${userInput}&idList=${listId}`);

    if (res !== undefined) {
      dispatch(addCards(res));
    }
  };

  const handleDeleteCard = async (cardId) => {
    const res = await archiveApiData(`/cards/${cardId}?closed=true`);

    if (res) {
      dispatch(deleteCard(cardId));
    }
  };
  if (error) {
    return <Error />;
  }

  if (loading) {
    return (
      <Box sx={{ width: '15rem', color: '#32a889' }}>
        <LinearProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: 'fit-content',
        minWidth: '15rem',
        padding: '0.5rem',
        width: '15rem',
        borderRadius: '0.5rem',
        backgroundColor: 'rgba(255,255,255,0.3)',
      }}
    >
      <Box
        className="heading"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.2rem',
          borderBottom: '1px solid rgba(255,255,255,0.3)',
        }}
      >
        <Box
          component={'h3'}
          sx={{
            padding: '0.5rem',
            width: '100%',
            borderRadius: '0.5rem',
            color: 'white',
            fontWeight: '600',
            fontSize: '1.2rem',
          }}
        >
          {name}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '0.2rem 0.45rem',
            borderRadius: '100%',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
          onClick={() => handleArchive(listId)}
        >
          <DeleteIcon sx={{ color: 'white', width: '1rem' }} size={'small'} />
        </Box>
      </Box>
      <Box
        sx={{
          maxHeight: '60vh',
          overflowY: 'scroll',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {cards.map(({ id, name, idList }) => {
          if (listId === idList) {
            return (
              <Card
                key={id}
                name={name}
                cardId={id}
                handleDelete={handleDeleteCard}
              ></Card>
            );
          }
        })}
      </Box>
      <Box my={1}>
        {open ? (
          <EditInput
            handleClose={handleClose}
            handleAdd={handleAddCard}
            title={'Enter a title for this card'}
            buttonName={'Add card'}
          />
        ) : (
          <Button
            color="primary"
            sx={{
              bgcolor: 'rgba(255,255,255,0.5)',
              width: '100%',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.6)' },
              color: 'black',
            }}
            onClick={handleClick}
          >
            Add Card
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default List;
