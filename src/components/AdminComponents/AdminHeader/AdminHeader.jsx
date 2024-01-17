import React from 'react'
import './AdminHeader.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../../Redux/Slices/UserSlice'
function AdminHeader() {
  const dispatch=useDispatch()
  return (
    <header className="admin-header">
    <div className="brand-logo">
    <img src="https://1000logos.net/wp-content/uploads/2022/08/Myntra-Logo.png" alt="Myntra Logo" />
    <h1>Admin</h1>
    </div>
    <nav>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li><button onClick={()=>dispatch(logout())}>Logout</button></li>
      </ul>
    </nav>
  </header>
  )
}

export default AdminHeader