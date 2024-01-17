import React, { useEffect, useState } from 'react';
import UserHeader from '../UserHeader/UserHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncRemoveCartProducts, fetchAsyncUserCartProducts, fetchAsyncUserData } from '../../../Redux/Slices/UserSlice';
import './UserCart.css';
import CheckoutButton from '../CheckoutButton/CheckoutButton';

function UserCart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.users);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchAsyncUserData(localStorage.getItem('userData')));
    dispatch(fetchAsyncUserCartProducts(localStorage.getItem('userData')));
  }, [dispatch]);

  useEffect(() => {
    // Calculate total price when cart changes
    if (cart?.user && cart.user[0]?.cart_products) {
      const totalPrice = cart.user[0].cart_products.reduce((acc, product) => {
        const productTotal = (product.quantity * product.productPrice) || product.productPrice;
        return acc + productTotal;
      }, 0);
      setTotalPrice(totalPrice);
    }
  }, [cart]);

  const HandleRemove = async (productId) => {
    const id = localStorage.getItem('userData')
    await dispatch(fetchAsyncRemoveCartProducts({ productId, id }))
    dispatch(fetchAsyncUserCartProducts(localStorage.getItem('userData')));

  }

  return (
    <>
      <UserHeader />
      <div className='container'>
        <div className='user-cart'>
          {cart?.user && Array.isArray(cart.user[0]?.cart_products) && cart.user[0].cart_products.length > 0 ? (
            cart.user[0].cart_products.map((product) => (
              <div className='product-card' key={product._id}>
                <div className='product-image'>
                  <img src={`http://localhost:4040/uploads/${product.productImages[0]}`} alt='' />
                </div>
                <div className='product-details'>
                  <h1>{product.productName}</h1>
                  <p>{product.productPrice}</p>
                  <p>{product.productSpecs}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Total Price: {product.quantity * product.productPrice || product.productPrice}</p>
                  <button onClick={() => HandleRemove(product._id)}>remove</button>
                </div>
              </div>
            ))
          ) : (
            <p>No products in the cart.</p>
          )}

          {cart?.user && cart.user[0]?.cart_products && cart.user[0].cart_products.length > 0 && (
            <div className='cart-summary'>
              <h2>Cart Summary</h2>
              <p>Total Price: {totalPrice}</p>
              <CheckoutButton cartItems={cart.user[0].cart_products} totalPrice={totalPrice} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserCart;
