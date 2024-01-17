import React from 'react'
import './AdminDashbord.css'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import AdminCategoryList from '../AdminCategoryList/AdminCategoryList'
import './AdminDashbord.css'
import OrderList from '../OrderList/OrderList'
function AdminDashbord() {
  return (
    <div className="dashboard">
      <AdminHeader />
      <div className="content-container">
        <AdminSideBar />
        <div className="main-content">
        <AdminCategoryList/>
        <OrderList/>
        </div>
      </div>
    </div>
  )
}

export default AdminDashbord