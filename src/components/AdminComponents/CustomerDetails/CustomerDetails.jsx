import React, { useEffect } from 'react'
import './CustomerDetails.css'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchAsyncUserData, fetchAsyncUserOrders } from '../../../Redux/Slices/UserSlice'
function CustomerDetails() {
    const dispatch = useDispatch()
    const location = useLocation()
    const id = location.state.userId
    const { user } = useSelector((state) => state.users)
    const { userOrder } = useSelector((state) => state.users)
    console.log(userOrder.userOrders);
    useEffect(() => {
        dispatch(fetchAsyncUserData(id))
        dispatch(fetchAsyncUserOrders(id))
    }, [dispatch])
    return (

        <div className='customer-details'>
            <AdminHeader />
            <div className="content-container">
                <AdminSideBar />
                <div className="main-content">
                    <h2>customer Details</h2>
                    <div className='order-details'>
                        <div className='card-detail'>
                            <div className='left-card'>
                                <h4>customer</h4>
                                        <p>user id :{user.user?._id}</p>
                                        <p>Name : {user.user?.username}</p>
                                        <p>Email : {user.user?.email}</p>
                                        <p>Phone : {user.user?.phonenumber}</p>
                            </div>
                        </div>
                        <div className='table'>
                            <table>
                                <tr className='table-head'>
                                    <th>orderID</th>
                                    <th>Product</th>
                                    <th>date</th>
                                    <th>price</th>
                                </tr>
                                {userOrder.userOrders?.map((items) => (
                                    <>
                                        {items.products.map((data) => (

                                            <tr>
                                                <td>{items._id}</td>
                                                <td style={{ display: 'flex', alignItems: 'center' }}>{<img src={`http://localhost:4040/uploads/${data.productImages[0]}`} alt="" />} {data.productName}</td>
                                                <td>{items.orderDate}</td>
                                                <td>{data.productPrice}</td>
                                            </tr>
                                        ))}
                                    </>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CustomerDetails