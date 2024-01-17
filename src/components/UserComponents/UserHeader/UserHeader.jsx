import React from 'react'
import './UserHeader.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../../Redux/Slices/UserSlice'
import { useNavigate } from 'react-router-dom'
function UserHeader() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const HandleCart = () => {
        navigate('/cart')
    }
    const HandleOrders = () => {
        navigate('/orders')
    }

    const HandleLogout=()=>{
        dispatch(logout())
        navigate('/')
    }
    return (
        <header>
            <div className='container'>
                <div className="header">
                    <div className="brand-logo">
                        <img src="https://1000logos.net/wp-content/uploads/2022/08/Myntra-Logo.png" alt="Myntra Logo" />
                    </div>
                    <input type="search" placeholder='search' />
                    <div className='buttons'>
                        <button onClick={() => HandleOrders()}>Orders</button>
                        <button onClick={() => HandleLogout()}>Logout</button>
                        <button onClick={() => HandleCart()}>cart</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default UserHeader