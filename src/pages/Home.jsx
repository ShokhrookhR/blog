import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import TagsBlock from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllComments, fetchPosts, fetchTags, postsSelector } from '../redux/postsSlice';
import { selectData } from '../redux/authSlice';
import { Box } from '@mui/system';
export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(postsSelector);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const userData = useSelector(selectData);
  const [sortBy, setSortBy] = React.useState(0);
  const itemsCopy = [...posts.items];
  const sorting = itemsCopy.sort((a, b) => b.viewsCount - a.viewsCount);
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchAllComments());
  }, []);
  const onClickSort = (event, value) => {
    setSortBy(value);
  };

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          onChange={onClickSort}
          style={{ marginBottom: 15 }}
          value={sortBy}
          aria-label="basic tabs example">
          <Tab label="Новые" style={{ marginBottom: 15 }} />
          <Tab label="Популярные" style={{ marginBottom: 15 }} />
        </Tabs>
      </Box>

      <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid xs={8} item>
          {posts.status === 'loading' && <h1>Loading...</h1>}
          {sortBy === 0
            ? posts.items.map((obj) => (
                <Post
                  key={obj._id}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                  isLoading={isPostsLoading}
                />
              ))
            : sorting.map((obj) => (
                <Post
                  key={obj._id}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                  isLoading={isPostsLoading}
                />
              ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
