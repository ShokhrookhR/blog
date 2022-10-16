import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Post } from '../components';
import { postsSelector } from '../redux/postsSlice';

const PostsOfCurrentTag = () => {
  const { posts } = useSelector(postsSelector);
  const { name } = useParams();
  const filterPosts = posts.items.filter((obj) => obj.tags.includes(name));
  console.log(filterPosts);

  return (
    <div>
      <h1>{name}</h1>
      {filterPosts.map((post) => (
        <Post id={post._id} {...post} />
      ))}
    </div>
  );
};

export default PostsOfCurrentTag;
