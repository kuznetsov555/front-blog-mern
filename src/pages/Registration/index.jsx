import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from "react-redux";
import styles from './Login.module.scss';
import { requestRegistration, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { see } from "../../utilities/myUtils";

export const Registration = () => {

    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Хук useForm от React:
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: {
            fullName: '', email: '', password: ''
        },
        mode: 'all'
        });

    if (isAuth) {
        return navigate('/');
    }

    const onSubmit = async (values) => {

        try {
            const data = await dispatch(requestRegistration(values));

            if ('token' in data.payload) {
                window.localStorage.setItem('token', data.payload.token);
            }

        } catch (e) {
            see('Ошибка регистрации: ' + e);
        }
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создайте аккаунт
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="ФИО"
                    type='text'
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', { required: 'Введите ваше ФИО!' })}
                    fullWidth
                />

                <TextField
                    className={styles.field}
                    label="Электронная почта"
                    type='email'
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Введите электронную почту!' })}
                    fullWidth
                />

                <TextField
                    className={styles.field}
                    label="Пароль"
                    type='password'
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', { required: 'Введите пароль!' })}
                    fullWidth
                />

                <Button
                    disabled={!isValid} // Условное включение кнопки, если форма заполнена
                    size="large"
                    variant="contained"
                    type='submit'
                    fullWidth>
                    Зарегистрироваться
                </Button>

            </form>
        </Paper>
    );
};
