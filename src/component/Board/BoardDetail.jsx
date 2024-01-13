import { Box, Button } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import BoardDetailHeader from './BoardDetailHeader';
import { useEffect, useState } from 'react';
import { archiveApiData, getApiData, postApiData } from '../../ApiConfig/Api';
import List from '../List/List';
import pic2 from '../../assets/pic2.jpg';
import OpenInputField from '../Input/OpenInputField';
import AddIcon from '@mui/icons-material/Add';
import EditInput from '../EditInput/EditInput';

function BoardDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { boardName } = location.state;
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [openAddList, setAddList] = useState(false);

  useEffect(() => {
    getApiData(`/boards/${id}/lists`, setLists, setLoading, setError);
  }, []);

  const handleArchive = async (listId) => {
    await archiveApiData(`/lists/${listId}?closed=true`);
    const newData = lists.filter(({ id }) => listId !== id);
    setLists(newData);
  };

  const handleOpenInput = () => {
    setAddList(true);
  };
  const handleClose = ()=>{
    setAddList(false)
  }

  const handleAddList = async(userInput)=>{
    if(userInput === ""){
     return alert("please enter title")
    }

    const res = await postApiData(`/lists?name=${userInput}&idBoard=${id}`)
    setLists((lists)=>[...lists, res])

  }

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <>Loading</>;
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
        {openAddList ? (
          <Box
            sx={{
              border:"1px solid red",
              width: '25rem',
              height: 'fit-content',
              padding: '0.5rem',
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius:"0.5rem"
            }}
          >
            <EditInput title={"Enter list title"} handleClose={handleClose} handleAdd={handleAddList}/>
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
