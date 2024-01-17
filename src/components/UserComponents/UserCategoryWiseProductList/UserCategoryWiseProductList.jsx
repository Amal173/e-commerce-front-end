import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchAsyncProducts, getProducts } from '../../../Redux/Slices/ProductSlice'
import UserHeader from '../UserHeader/UserHeader'

function UserCategoryWiseProductList() {
    const location=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const product=useSelector(getProducts)
    const categoryId=location.state.id;
    console.log(product.products);
    
    useEffect(()=>{
        dispatch(fetchAsyncProducts(categoryId))
    },[dispatch,categoryId])

   const HandleClick=(productId)=>{
    navigate('/products/details', {state:{id:productId}})
   }

  return (

   <>
    <UserHeader />
   <div className='container'>
   <div className='product-list'>
    {Array.isArray(product.products)&&product.products.length>0&&product.products.map((data)=>(
    <div class="card" key={data._id} onClick={()=>HandleClick(data._id)}>
    <img src={`http://localhost:4040/uploads/${data.productImages[0]}`} alt=''/>
    <h1>{data.productName}</h1>
    <p class="price">{data.productPrice}</p>
    <p class="price">{data.productSpecs}</p>
    <p>{data.productDescription}</p>
  </div>
    ))}
    </div>
   </div>
   </>
  )
}

export default UserCategoryWiseProductList