import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncUserRegister } from '../../../Redux/Slices/UserSlice'
import { useNavigate } from 'react-router-dom'
function UserRegister() {
    const { success } = useSelector(
        (state) => state.users
      )
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const submitForm = (data) => {
        dispatch(fetchAsyncUserRegister(data))
      }


      useEffect(() => {
        if (success) navigate('/home')

      }, [navigate, success])

      

  return (
    <form onSubmit={handleSubmit(submitForm)}>
        {/* {error && <Error>{error}</Error>} */}
    <div className='form-group'>
      <label htmlFor='username'>First Name</label>
      <input
        type='text'
        className='form-input'
        {...register('username')}
        required
      />
    </div>
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
    <div className='form-group'>
      <label htmlFor='email'>phone number</label>
      <input
        type='text'
        className='form-input'
        {...register('phonenumber')}
        required
      />
    </div>
    <button type='submit' className='button' >Register </button>
  </form>
  )
}

export default UserRegister