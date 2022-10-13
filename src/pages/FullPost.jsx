import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from '../axios';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchCommentText, commentsSelector } from '../redux/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const FullPost = () => {
  const [data, setData] = React.useState([]);
  const [commentValue, setCommentValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();

  const { id } = useParams();
  const onSubmitChild = async (value) => {
    dispatch(fetchCommentText({ text: value }));
    setCommentValue(value);
  };
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        window.sessionStorage.setItem('postId', id);
      })
      .catch((err) => {
        console.log('Не удалось загрузить пост');
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={true} />;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data?.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock commentValue={commentValue}>
        <Index onSubmit={onSubmitChild} />
      </CommentsBlock>
    </>
  );
};;
