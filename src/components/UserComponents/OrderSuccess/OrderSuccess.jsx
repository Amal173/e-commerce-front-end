import React, { useEffect, useState } from 'react'
import './OrderSucess.css'
import UserHeader from '../UserHeader/UserHeader'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncRetrieveSession } from '../../../Redux/Slices/UserSlice'
import easyinvoice from 'easyinvoice'


function OrderSuccess() {
  
  const [totalPrice,setTotalPrice]=useState()
  const location = useLocation()
  const cartItems = location.state.cartItems
  const id = location.state.id
  const { orderDetails } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const date=new Date()
  const newDate = new Date(date);
  const currentDate = newDate.toDateString();
  const delhiveryDate = new Date(date);
  delhiveryDate.setDate(date.getDate() + 5);
  

  useEffect(() => {
    dispatch(fetchAsyncRetrieveSession(id))
    if (cartItems&&cartItems.length>0) {
      const totalPrice =cartItems.reduce((acc, product) => {
        const productTotal = (product.quantity * product.productPrice)||product.productPrice;
        return acc + productTotal;
      }, 0);
      setTotalPrice(totalPrice);
    }
  }, [dispatch, id,cartItems])


  const handleDownloadInvoice = async () => {
    const data = {
      documentTitle: 'INVOICE',
      currency: orderDetails.session.currency || 'USD',
      taxNotation: 'vat',
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      sender: {
        company: 'Myntra ',
        address: 'myntra,kerala',
        zip: '123456',
        city: 'kochi',
        country: 'india',
      },
      client: {
        company: orderDetails.session.customer_details.name || 'Customer Name',
        address: orderDetails.session.customer_details.email || 'Customer Email',
        zip: orderDetails.session.customer_details.address.postal_code || 'Customer Postal Code',
        city: orderDetails.session.customer_details.address.city || 'Customer City',
        country: orderDetails.session.customer_details.address.country || 'Customer Country',
      },
      invoiceNumber: orderDetails.session.id || 'Invoice Number',
      invoiceDate: new Date(orderDetails.session.created * 1000).toLocaleString('en-US') || 'Invoice Date',
      products: [
        {
          quantity: 1,
          description: 'Product Description',
          tax: 0,
          price: orderDetails.session.amount_subtotal || 0,
        },
      ],
      bottomNotice: 'Thank you for your purchase!',
    };

    try {
      const result = await easyinvoice.createInvoice(data);
      easyinvoice.download(`invoice_${orderDetails.session.id}.pdf`, result.pdf);
    } catch (error) {
      console.error('Error creating or downloading the invoice:', error);
    }
  };

  return (
    <>
      <UserHeader />
      <div className='order-success'>
        <div className="order-summary-container">
          {cartItems?.map((item) => (
            <div className="product-details" key={item.id}>
              <img src={`http://localhost:4040/uploads/${item.productImages[0]}`} alt='' />
              <div>
                <h2>{item.productName}</h2>
                <h2>{item.productPrice}</h2>
                <h2>{item.productDescription}</h2>
              </div>
            </div>

          ))

          }
          <div className="shipping-address">
            <h3>Shipping Address</h3>
            <p>{orderDetails.session?.shipping_details.name}</p>
            <p>{orderDetails.session?.shipping_details.address.line1}, {orderDetails.session?.shipping_details.address.postal_code}</p> 
            <p>{orderDetails.session?.shipping_details.address.country}</p>
            <p>{orderDetails.session?.shipping_details.address.state}</p>
          </div>

          <div className="shipping-address">
            <h3>Billing Address</h3>
            <p>{orderDetails.session?.customer_details.name}</p>
            <p>{orderDetails.session?.customer_details.email}</p>
            <p>{orderDetails.session?.customer_details.address.line1}, {orderDetails.session?.customer_details.address.postal_code}</p> 
            <p>{orderDetails.session?.customer_details.address.country}</p>
            <p>{orderDetails.session?.customer_details.address.city}</p>
          </div>

          <div className="order-details">
            <h3>Order Details</h3>
            <p><span>Total Price:</span> ${totalPrice}</p>
            <p><span>Order Date: </span>{currentDate}</p>
            <p><span>Delivery Date:</span> {delhiveryDate.toDateString()}</p>
            <p><span>Payment Status:</span> {orderDetails.session?.payment_status}</p>
            <button onClick={handleDownloadInvoice}>Download Invoice</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderSuccess