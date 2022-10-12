import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { commentsSelector, onChangeCommentText } from '../../redux/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectData } from '../../redux/authSlice';

export const Index = (props) => {
  const { newCommentText } = useSelector(commentsSelector);
  const { data } = useSelector(selectData);
  const dispatch = useDispatch();
  const onSendComment = () => {
    if (newCommentText) {
      props.onSubmit(newCommentText);
    }
  };
  const onChange = (event) => {
    dispatch(onChangeCommentText(event.target.value));
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={data?.avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={newCommentText}
            onChange={(e) => onChange(e)}
          />
          <Button onClick={onSendComment} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
