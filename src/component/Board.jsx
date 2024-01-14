import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { getApiData, postApiData } from '../ApiConfig/Api';
import BoardCard from './Board/BoardCard';
import OpenModal from './Modal/Modal';
import CreateBoard from './Board/CreateBoard';
import { Link } from 'react-router-dom';
import Loading from './Loading/Loading';
import Error from './Error/Error';

function Board() {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getApiData('/members/me/boards', setBoards, setLoading, setError);
  }, []);

  // console.log(boards);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleCreateBoard = async (userInput) => {
    userInput.trim()
    if(userInput === ""){
      return alert("please provide title")
    }
    setOpen(false);
    const data = await postApiData(`/board?name=${userInput}`);
    setBoards((board) => [...board, data]);
  };

  if (error) {
    return <Error/>;
  }
  if (loading) {
    return<Loading/>
  }
  return (
    <>
      <Box
        width={'100%'}
        height={'93vh'}
        padding={'3rem'}
        display={'grid'}
        sx={{ gridTemplateColumns: 'repeat(4,1fr)' }}
        gap={3}
      >
        {boards.map(({ id, name, prefs }) => (
          <Link
            key={id}
            to={`/boards/${id}`}
            state={{ boardName: name }}
            style={{
              textDecoration: 'none',
              height: '100%',
            }}
          >
            <BoardCard bg={prefs}>{name}</BoardCard>
          </Link>
        ))}
        <BoardCard onClickModal={handleOpen}>Create new Board</BoardCard>
        <OpenModal handleClose={handleClose} open={open}>
          <CreateBoard handleCreateBoard={handleCreateBoard} open={open} />
        </OpenModal>
      </Box>
    </>
  );
}

export default Board;
