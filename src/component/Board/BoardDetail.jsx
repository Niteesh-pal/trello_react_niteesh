import { Box, Button } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import BoardDetailHeader from './BoardDetailHeader';
import { useEffect, useState } from 'react';
import {
  archiveApiData,
  fetchApiData,
  getApiData,
  postApiData,
} from '../../ApiConfig/Api';
import List from '../List/List';
import pic2 from '../../assets/pic2.jpg';
import AddIcon from '@mui/icons-material/Add';
import EditInput from '../EditInput/EditInput';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { useDispatch, useSelector } from 'react-redux';
import {
  addList,
  deleteList,
  onError,
  onLoading,
  setLists,
  toggleOpen,
} from '../../app/Slices/ListSlices';

function BoardDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { boardName } = location.state;
  // const [lists, setLists] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [openAddList, setAddList] = useState(false);

  const dispatch = useDispatch();
  const { lists, loading, error, open } = useSelector((state) => state.lists);

  const fetchData = async () => {
    try {
      dispatch(onLoading());
      const response = await fetchApiData(`/boards/${id}/lists`);
      dispatch(setLists(response.data));
    } catch (error) {
      dispatch(onError());
    }
  };

  useEffect(() => {
    // getApiData(`/boards/${id}/lists`, setLists, setLoading, setError);
    fetchData();
  }, []);

  const handleOpenInput = () => {
    // setAddList(true);
    dispatch(toggleOpen(true));
  };
  const handleClose = () => {
    // setAddList(false);
    dispatch(toggleOpen(false));
  };



  const handleArchive = async (listId) => {
    const res = await archiveApiData(`/lists/${listId}?closed=true`);
    
    if(res){
      dispatch(deleteList(listId))
    }
  };

  const handleAddList = async (userInput) => {
    if (userInput === '') {
      return alert('please enter title');
    }
    if (userInput.length > 15) {
      return alert('Out of word limit');
    }

    const res = await postApiData(`/lists?name=${userInput}&idBoard=${id}`);

    if (res) {
      dispatch(addList(res));
    } else {
      alert('Unable to connect ot internet');
    }
  };

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }

  // console.log(board);

  return (
    <Box sx={{ backgroundImage: `url(${pic2})`, backgroundSize: 'cover' }}>
      <BoardDetailHeader>{boardName}</BoardDetailHeader>
      <Box
        className="boardDetail-content"
        height={'86.4vh'}
        sx={{
          display: 'flex',
          gap: '1rem',
          padding: '0.5rem',
          overflowX: 'scroll',
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
      >
        {lists.map(({ id, name }) => (
          <List
            key={id}
            listId={id}
            name={name}
            handleArchive={handleArchive}
          />
        ))}
        {/* addd list component */}
        {open ? (
          <Box
            sx={{
              width: '13rem',
              height: 'fit-content',
              padding: '0.5rem',
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius: '0.5rem',
            }}
          >
            <EditInput
              title={'Enter list title'}
              handleClose={handleClose}
              handleAdd={handleAddList}
              buttonName={'Add list'}
            />
          </Box>
        ) : (
          <Box sx={{ backgroundColor: 'rgbba(255,255,255,0.5)' }}>
            <Button
              onClick={handleOpenInput}
              startIcon={<AddIcon />}
              sx={{
                width: '13rem',
                justifyContent: 'start',
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.3)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.6)' },
              }}
            >
              Add List
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BoardDetail;
