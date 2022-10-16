import React from 'react';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { CommentsBlock, Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { fetchAuthMe } from './redux/authSlice';
import PostsOfCurrentTag from './pages/PostsOfCurrentTag';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/comments/:id" element={<CommentsBlock />} />
          <Route path="/tags/:name" element={<PostsOfCurrentTag />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
