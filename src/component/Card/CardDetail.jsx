/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { useEffect, useReducer } from 'react';
import { deleteApiData, fetchApiData, postApiData } from '../../ApiConfig/Api';

import EditInput from '../EditInput/EditInput';
import CheckList from '../CheckList/CheckList';
import Error from '../Error/Error';
import { initialState, reducer } from '../../ReducerFunction/operation';
import { action } from '../../ReducerFunction/stateActionType';
import trelloSvg from "../../assets/trello_svg.svg"

function CardDetail({ name, cardId }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data: checkList, loading, error, open } = state;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        dispatch({ type: action.LOADING });
        fetchApiData(`/cards/${cardId}/checklists`, dispatch);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  const handleOpen = () => {
    dispatch({ type: action.TOGGLE_OPEN, payload: true });
  };
  const handleClose = () => {
    dispatch({ type: action.TOGGLE_OPEN, payload: false });
  };

  const handleAddChecklist = async (userInput) => {
    if (userInput === '') {
      return alert('Please enter title');
    }
    const res = await postApiData(
      `/checklists?name=${userInput}&idCard=${cardId}`
    );

    if (res !== undefined) {
      dispatch({ type: action.ADD_DATA, payload: res });
    }
  };

  const handleDeleteCheckList = async (checkListId) => {
    const res = await deleteApiData(`/checklists/${checkListId}`);
    if (res) {
      // const newData = checkList.filter(({ id }) => id !== checkListId);
      dispatch({ type: action.DELETE_DATA, payload: checkListId });
    }
  };

  if (error) {
    return (
      <Box
        border={'1px solid white'}
        sx={{
          textAlign: 'center',
          color: 'white',
          backgroundColor: 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(4px)',
          borderRadius: '0.5rem',
        }}
      >
        <Error />
        Unable to get your checklist
      </Box>
    );
  }

  if (loading ) {
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
          {/* <CircularProgress color="inherit" /> */}
          <img src={trelloSvg} alt=""  />
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
          {checkList.length > 0 ? (
            checkList.map(({ id, name }) => (
              <CheckList
                key={id}
                name={name}
                checkListId={id}
                cardId={cardId}
                onDeleteChecklist={handleDeleteCheckList}
              ></CheckList>
            ))
          ) : (
            <Box
              sx={{
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '1.2rem',
              }}
            >
              Create a checkList
            </Box>
          )}
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
                bgcolor: 'rgba(255,255,255,0.3)',
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
