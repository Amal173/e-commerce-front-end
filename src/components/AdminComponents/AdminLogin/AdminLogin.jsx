import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncAdmin, fetchAsyncAdminLogin, getAdminToken } from '../../../Redux/Slices/AdminSlice';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'

function AdminLogin() {
    const dispatch = useDispatch();
    const [data, setData] = useState({ email: '', password: '' })
    // const adminData = useSelector(getAdmin);
    const navigate=useNavigate();
    const token = useSelector(getAdminToken);

    if(token){
        navigate('/admin')
    }


    // useEffect(() => {
    //     dispatch(fetchAsyncAdmin());
    // }, [dispatch])

    const HandleSubmit = async (data) => {
      await dispatch(fetchAsyncAdminLogin(data))
    }
    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    return (
        <div className='adminlogin'>
            <div className="wrapper">
                <div className="login-box">
                    <form action="">
                        <h2>Login</h2>

                        <div className="input-box">
                            <span className="icon">
                                <ion-icon className="mail"></ion-icon>
                            </span>
                            <input value={data.email} onChange={handleInputChange} name='email' type="text" required />
                            <label>Email</label>
                        </div>

                        <div className="input-box">
                            <span className="icon">
                                <ion-icon className="lock-closed"></ion-icon>
                            </span>
                            <input value={data.password} onChange={handleInputChange} type="password" name='password' required />
                            <label>Password</label>
                        </div>

                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="/">Forgot Password?</a>
                        </div>

                        <button type="button" onClick={() => HandleSubmit(data)}>Login</button>

                        <div className="register-link">
                            <p>
                                Don't have an account? <a href="/">Register</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin