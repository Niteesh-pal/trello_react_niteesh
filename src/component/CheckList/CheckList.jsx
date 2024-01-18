/* eslint-disable react/prop-types */
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useEffect, useState } from 'react';
import EditInput from '../EditInput/EditInput';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import {
  Box,
  Button,
  Checkbox,
  FormGroup,
  LinearProgress,
} from '@mui/material';
import {
  archiveApiData,
  deleteApiData,
  getApiData,
  postApiData,
} from '../../ApiConfig/Api';

function CheckList({ name, checkListId, cardId, onDeleteChecklist }) {
  const [checkItem, setCheckItem] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await getApiData(`/checklists/${checkListId}/checkItems`);
      setCheckItem(res.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCheckItem = async (userInput) => {
    if (userInput === '') {
      return alert('please enter title');
    }
    const res = await postApiData(
      `/checklists/${checkListId}/checkItems?name=${userInput}`
    );
    if (res) {
      setCheckItem((value) => [...value, res]);
    }
  };

  const handleDeleteCheckItem = (itemId) => {
    deleteApiData(
      `/checklists/${checkListId}/checkItems/${itemId}`,
      setCheckItem,
      itemId
    );
  };

  const progressValue = () => {
    if (checkItem.length === 0) {
      return 0;
    }

    let count = 0;
    for (let key of checkItem) {
      if (key.state === 'complete') {
        count++;
      }
    }

    return Math.floor(((count / checkItem.length) * 100).toFixed(2));
  };

  const handleChange = async (checkItemId, state) => {
    const checkboxState = state === 'complete' ? 'incomplete' : 'complete';
    // console.log(checkItemId, name,checkboxState)
    const res = await archiveApiData(
      `/cards/${cardId}/checkItem/${checkItemId}?state=${checkboxState}`
    );
    setCheckItem((data) => {
      const newData = data.map((obj) => {
        if (obj.id === res.id) {
          obj.state = checkboxState;
        }
        return obj;
      });
      return newData;
    });
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress size="small" sx={{ height: '2px' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ marginBottom: '1rem' }}>
      <Box
        className="checklist-heading"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',

          padding: '0.5rem 0rem',
          borderRadius: '0.5rem',
        }}
      >
        <Box
          className="heading"
          component={'p'}
          sx={{
            color: 'white',
            fontSize: '1rem',
            fontWeight: '500',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckBoxOutlinedIcon sx={{ width: '1.2rem' }} />
          </Box>
          <Box>{name}</Box>
        </Box>
        <Box sx={{ marginRight: '0.5rem' }}>
          <Button
            size="small"
            sx={{
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.2)',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              },
            }}
            onClick={() => onDeleteChecklist(checkListId)}
          >
            Delete
          </Button>
        </Box>
      </Box>
      {error ? (
        <Box sx={{ width: '100%', color: 'white' }}>
          something went wrong!! Please try again
        </Box>
      ) : (
        <>
          <Box>
            <ProgressBar value={progressValue()} />
          </Box>
          <Box className="check-item">
            <FormGroup>
              {checkItem.map(({ id, name, state }) => (
                <Box
                  key={id}
                  sx={{
                    margin: '0.2rem 0rem',
                    display: 'flex',
                    borderRadius: '0.2rem',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '90%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}
                  >
                    <Box sx={{ cursor: 'pointer' }}>
                      <Checkbox
                        checked={state === 'complete' ? true : false}
                        size="small"
                        sx={{ color: 'white' }}
                        color="default"
                        onChange={() => handleChange(id, state, name)}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        padding: '0.55rem 0.4rem',
                        color: 'white',
                        borderBottom: '1px solid rgba(255,255,255,1)',
                      }}
                    >
                      {name}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      //   width: '10%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',

                      cursor: 'pointer',
                      borderRadius: '0.5rem',
                      padding: '0.2rem 0.2rem',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': {
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                      },
                    }}
                    onClick={() => handleDeleteCheckItem(id)}
                  >
                    <RemoveCircleOutlineOutlinedIcon sx={{ color: 'white' }} />
                  </Box>
                </Box>
              ))}
            </FormGroup>
            <Box sx={{ marginLeft: '3rem' }}>
              {open ? (
                <EditInput
                  handleClose={handleClose}
                  title={'add item'}
                  handleAdd={handleAddCheckItem}
                />
              ) : (
                <Button
                  onClick={handleOpen}
                  sx={{
                    color: 'white',
                    marginTop: '0.5rem',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  Add item
                </Button>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default CheckList;
