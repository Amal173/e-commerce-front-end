import React from 'react'
import './AdminSideBar.css'
import { useNavigate } from 'react-router-dom'
function AdminSideBar() {
  const navigate=useNavigate();
  return (
    <div className="sidebar">
    <ul>
      <li onClick={()=>navigate('/admin ')}>Categories</li>
      <li onClick={()=>navigate('/admin-orders')}>Orders</li>
      <li onClick={()=>navigate('/customer-list')}>Customers</li>
    </ul>
  </div>
  )
}

export default AdminSideBar