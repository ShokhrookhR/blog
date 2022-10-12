import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  await axios.delete(`/posts/${id}`);
});
export const fetchComments = createAsyncThunk('posts/fetchComments', async (id) => {
  const { data } = await axios.get(`/comments/${id}`);
  return data;
});
export const fetchAllComments = createAsyncThunk('posts/fetchAllComments', async () => {
  const { data } = await axios.get('/comments');
  return data;
});
export const fetchCommentText = createAsyncThunk('posts/fetchCommentText', async (text) => {
  await axios.post(`/comments`, text);
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comments: {
    items: [],
    status: 'loading',
    newCommentText: '',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    onChangeCommentText: (state, action) => {
      state.comments.newCommentText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    });
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    });

    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    });
    builder.addCase(fetchComments.pending, (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    });
    builder.addCase(fetchAllComments.pending, (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    });
    builder.addCase(fetchAllComments.fulfilled, (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    });

    builder.addCase(fetchAllComments.rejected, (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    });
    builder.addCase(fetchCommentText.pending, (state) => {
      state.comments.status = 'loading';
    });
    builder.addCase(fetchCommentText.fulfilled, (state, action) => {
      state.comments.newCommentText = '';
      state.comments.status = 'loaded';
    });

    builder.addCase(fetchCommentText.rejected, (state) => {
      state.comments.status = 'error';
    });
  },
});

export const postsSelector = (state) => state.posts;
export const commentsSelector = (state) => state.posts.comments;
export const { onChangeCommentText } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
// export default postsReducer;
