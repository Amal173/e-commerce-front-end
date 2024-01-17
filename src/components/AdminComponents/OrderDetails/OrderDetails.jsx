import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchAsyncOrderDetails, fetchAsyncUserOrders } from '../../../Redux/Slices/UserSlice'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import './OrderDetails.css'

function OrderDetails() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const orderId = location.state.orderId;
    const { orderDetailsById } = useSelector((state) => state.users)
    console.log("userOrder", orderDetailsById.Orders);
    useEffect(() => {
        dispatch(fetchAsyncOrderDetails(orderId));
    }, [dispatch])

    return (
        <>
            <AdminHeader />
            <AdminHeader />
            <div className="content-container">
                <AdminSideBar />
                <div className="main-content">
                    <h2>Order Details</h2>
                    <div className='order-details'>
                        <div className='header'>
                            {orderDetailsById.Orders?.map((item) => (
                                <p>{item.orderDate}</p>
                            ))}
                        </div>
                        <div className='card-detail'>
                            <div className='left-card'>
                                <h4>customer</h4>
                                {orderDetailsById.Orders?.map((item) => (
                                    <>
                                        <p>{item.customerEmail}</p>
                                        <p>{item.billingAddress.line1}</p>
                                        <p>{item.billingAddress.city}</p>
                                        <p>{item.billingAddress.state}</p>
                                        <p>{item.billingAddress.postal_code}</p>
                                        <p>{item.billingAddress.country}</p>
                                    </>
                                ))}
                            </div>
                            <div className='right-card'>
                                <h4>shipping address</h4>
                                {orderDetailsById.Orders?.map((item) => (
                                    <>
                                        <p>{item.shippingAddress.line1}</p>
                                        <p>{item.shippingAddress.city}</p>
                                        <p>{item.shippingAddress.state}</p>
                                        <p>{item.shippingAddress.postal_code}</p>
                                        <p>{item.shippingAddress.country}</p>
                                    </>
                                ))}
                            </div>
                        </div>
                        <div className='table'>
                            <table>
                                <tr className='table-head'>
                                    <th>Sl</th>
                                    <th>Product</th>
                                    <th>price</th>
                                </tr>
                                {orderDetailsById.Orders?.map((items, index) => (
                                    <>
                                        {items.products.map((data ,index) => (

                                            <tr>
                                                <td>{index + 1}</td>
                                                <td style={{ display: 'flex' ,alignItems:'center'}}>{<img src={`http://localhost:4040/uploads/${data.productImages[0]}`} alt="" />} {data.productName}</td>
                                                <td>{data.productPrice}</td>
                                            </tr>
                                        ))}
                                    </>
                                ))}
                            </table>
                            <div className="total-price">
                                {orderDetailsById.Orders?.map((item) => (
                                    <p>Total Price: {item.totalPrice}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetails