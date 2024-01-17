import React from 'react'
import './AdminSideBar.css'
import { useNavigate } from 'react-router-dom'
function AdminSideBar() {
  const navigate=useNavigate();
  return (
    <div className="sidebar">
    <ul>
      <li>Dashboard</li>
      <li>Categories</li>
      <li onClick={()=>navigate('/admin/products')}>Products</li>
    </ul>
  </div>
  )
}

export default AdminSideBar