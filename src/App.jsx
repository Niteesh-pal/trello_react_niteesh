import './App.css';

import Header from './component/Header';
import { Route, Routes } from 'react-router-dom';
import Board from './component/Board';
import BoardDetail from './component/Board/BoardDetail';

function App() {
  
  return (
    <>
     <Header/>
     <Routes>
      <Route path="/" element={<Board/>}/>
      <Route path="/boards/:id" element={<BoardDetail/>}/>
     </Routes>
    </>
  );
}

export default App;
