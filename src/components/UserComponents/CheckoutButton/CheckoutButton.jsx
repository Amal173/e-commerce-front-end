import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchAsyncUserCheckoutCart } from '../../../Redux/Slices/UserSlice';

function CheckoutButton({cartItems,totalPrice}) {
const dispatch=useDispatch()

const HandleCheckout=()=>{
console.log(cartItems,"cartItems");
dispatch(fetchAsyncUserCheckoutCart({cartItems:cartItems,userId:localStorage.getItem('userData'),totalPrice:totalPrice}))
}

  return (
    <div>
       
        <button type="button" id="checkout-button"  onClick={()=>HandleCheckout()}>Checkout</button>

    </div>
  )
}

export default CheckoutButton