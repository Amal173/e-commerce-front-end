import React, { useEffect } from 'react'
import './OrderList.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncAllOrders } from '../../../Redux/Slices/UserSlice'
import { useNavigate } from 'react-router-dom'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import AdminHeader from '../AdminHeader/AdminHeader'
function OrderList() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {allOrders}=useSelector((state)=>state.users)
    useEffect(()=>{
        dispatch(fetchAsyncAllOrders()); 
    },[dispatch])
    console.log("user",allOrders);

const handleViewOrder=(orderId)=>{
    navigate('/order-details' ,{state:{orderId:orderId}})
}

    return (
       <>
        <AdminSideBar/>
        <AdminHeader/>
        <div className='order-container'>
            <div className='order-list'>
                <h1>Orders Table</h1>
                <table>
                    <tr className='table-head'>
                        <th>Sl</th>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>created on</th>
                        <th>amount</th>
                        <th>view</th>
                    </tr>
                   {allOrders.Orders?.map((items,index)=>(
                     <tr>
                     <td>{index+1}</td>
                     <td>{items._id}</td>
                     <td>{items.customerEmail||"email"}</td>
                     <td>{items.orderDate}</td>
                     <td>{items.totalPrice}</td>
                     <td><button onClick={()=>handleViewOrder(items._id)}>view</button></td>
                  </tr>
                   ))}
                </table>
            </div>
        </div>
       </>
    )
}

export default OrderList