import React, { useEffect } from 'react'
import UserHeader from '../UserHeader/UserHeader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncUserOrders } from '../../../Redux/Slices/UserSlice'
import './UserOrders.css'
function UserOrders() {

  const dispatch = useDispatch()
  const { userOrder } = useSelector((state) => state.users)
  console.log("userOrder", userOrder.userOrders);

  useEffect(() => {
    dispatch(fetchAsyncUserOrders(localStorage.getItem('userData')))
  }, [dispatch])


  return (
    <>
      <UserHeader />
    
      <div className='user-orders'>
        <div className='container'>
        <div className='tilte'>
      <h1>Your Orders</h1>
      </div>
          {userOrder.userOrders?.map((item) => (
            <div className='orders'>
              <div className='products'>
                {item.products?.map((product) => (
                 <div className='product'>
                   <img src={`http://localhost:4040/uploads/${product.productImages[0]}`} alt="" />
                    <div className='product-detail'>
                      <p><span>Product Name </span>: {product.productName}</p>
                      <p><span>Product Description</span> : {product.productDescription}</p>
                      <p><span>Product Price</span> : {product.productPrice}</p>
                    </div>
            
                 </div>
                ))}
              </div>
              <div className='order-details'>
                <h2>order summary</h2>
              <p><span>order status</span> : {item.orderStatus}</p>
              <p><span>total price</span> : {item.totalPrice}</p>
              <p><span>checkout Date </span>: {item.orderDate}</p>
              </div>
              <div>
                <h1>shippng address</h1>
                <p>{item.billingAddress?.line1}</p>
                <p>{item.billingAddress?.city}</p>
                <p>{item.billingAddress?.postal_code}</p>
                <p>{item.billingAddress?.state}</p>
                </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default UserOrders