/* eslint-disable react/prop-types */
import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { deleteApiData, getApiData, postApiData } from '../../ApiConfig/Api';

import EditInput from '../EditInput/EditInput';
import CheckList from '../CheckList/CheckList';
import Error from '../Error/Error';

function CardDetail({ name, cardId }) {
  const [checkList, setCheckList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getApiData(
      `/cards/${cardId}/checklists`,
      setCheckList,
      setLoading,
      setError
    );
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddChecklist = async (userInput) => {
    if (userInput === '') {
      return alert('enter title');
    }
    const res = await postApiData(
      `/checklists?name=${userInput}&idCard=${cardId}`
    );

    if (res) {
      setCheckList((checklist) => [...checklist, res]);
    }
  };

  const handleDeleteCheckList = async (checkListId) => {
    deleteApiData(`/checklists/${checkListId}?`, setCheckList, checkListId);
  };

  if (error) {
    return <Error />;
  }

  if (loading) {
    return (
      <Box
        sx={{
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Box
          sx={{
            width: '15rem',
            height: '15rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      className="card-container"
      sx={{
        padding: '1rem',
        width: '40rem',
        borderRadius: '0.5rem',
        backgroundColor: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Box
        className="cards-container"
        component={'h2'}
        // border={'1px solid green'}
        sx={{ color: 'white', width: '90%', padding: '0.2rem' }}
      >
        {name}
      </Box>
      <Box
        className="card-content"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          //   border: '1px solid red',
          margin: '0.5rem 0rem',
          padding: '0.5rem 0rem',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxHeight: '75vh',
            overflowY: 'scroll',
            padding: '0.5rem 0rem',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {checkList.length > 0
            ? checkList.map(({ id, name }) => (
                <CheckList
                  key={id}
                  name={name}
                  checkListId={id}
                  cardId={cardId}
                  onDeleteChecklist={handleDeleteCheckList}
                ></CheckList>
              ))
            : 'Create a checklist'}
        </Box>
        <Box
          sx={{
            //  border: '1px solid black',
            width: '40%',
          }}
          className="card-add-checkList"
        >
          <Box
            component={'span'}
            sx={{
              fontSize: '0.9rem',
              color: 'rgba(0,0,0,0.7)',
              fontWeight: '500',
            }}
          >
            Add to
          </Box>
          {open ? (
            <EditInput
              handleClose={handleClose}
              title={'add checklist'}
              handleAdd={handleAddChecklist}
            />
          ) : (
            <Box
              component={'h4'}
              sx={{
                //   border: '1px solid green',
                padding: '0.5rem 0.4rem',
                color: 'rgba(255,255,255,1)',
                margin: '0.1rem 0rem',
                borderRadius: '0.2rem',
                bgcolor: 'rgba(0,0,0,0.3)',
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' },
              }}
              onClick={handleOpen}
            >
              CheckList
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default CardDetail;
