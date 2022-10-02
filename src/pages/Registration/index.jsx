import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/authSlice';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const onSubmit = async (value) => {
    const data = await dispatch(fetchRegister(value));
    console.log(value);
    if (!data.payload) {
      alert('Вы не смогли зарегистрироваться!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to={'/'} />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          error={errors.fullName?.message}
          helperText={errors.fullName?.message}
          label="Полное имя"
          {...register('fullName', { required: 'Укажите имя!' })}
          fullWidth
        />
        <TextField
          type="email"
          className={styles.field}
          error={errors.email?.message}
          helperText={errors.email?.message}
          label="E-Mail"
          {...register('email', { required: 'Укажите почту!' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          error={errors.password?.message}
          helperText={errors.password?.message}
          label="Пароль"
          {...register('password', { required: 'Укажите пароль!' })}
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
