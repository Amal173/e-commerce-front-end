import React, { useEffect } from 'react'
import './UserProductList.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncProducts, getProducts } from '../../../Redux/Slices/ProductSlice';
function UserProductList({ data }) {


  const dispatch = useDispatch();
  const product = useSelector(getProducts);
  console.log(product.products, "product");
  console.log(data, "jhjhshhb");


  useEffect(() => {
    dispatch(fetchAsyncProducts(data))
  }, [dispatch, data])


  return (
    <>
      {Array.isArray(product.products) && product.products.length > 0 && product.products.map((data) => (
        <div class="card" key={data._id}>
          <img src={`http://localhost:4040/uploads/${data.productImages[0]}`} alt=''/>
          <h1>{data.productName}</h1>
          <p class="price">{data.productPrice}</p>
          <p class="price">{data.productSpecs}</p>
          <p>{data.productDescription}</p>
          <p><button>Add to Cart</button></p>
        </div>
      ))}
    </>
  )
}

export default UserProductList