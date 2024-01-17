import React, { useEffect, useState } from 'react'
import './UserLogin.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchAsyncUsersLogin } from '../../../Redux/Slices/UserSlice';
function UserLogin() {
    const dispatch = useDispatch();
    const { userInfo ,userToken} = useSelector((state) => state.users)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();
    const submitForm = (data) => {
        dispatch(fetchAsyncUsersLogin(data))
    }


    useEffect(() => {
        if (userToken) {
            navigate('/home')
        }
    }, [navigate, userInfo])



    return (
        <div className='user-login'>
            <div className="wrapper">
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            className='form-input'
                            {...register('email')}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className='form-input'
                            {...register('password')}
                            required
                        />
                    </div>
                    <button type='submit' className='button'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserLogin