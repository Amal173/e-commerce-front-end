import React, { useEffect } from 'react'
import './UserProductDetails.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncProductsById, getProductById } from '../../../Redux/Slices/ProductSlice'
import UserHeader from '../UserHeader/UserHeader'
import { fetchAsyncAddUserCart } from '../../../Redux/Slices/UserSlice'
function UserProductDetails() {
    const location = useLocation()
    const dispatch = useDispatch()
    const ProductId = location.state.id
const id=localStorage.getItem("userData")

    const productData = useSelector(getProductById)
    useEffect(() => {
        dispatch(fetchAsyncProductsById(ProductId))
    }, [dispatch, ProductId])

    console.log(productData);

    const HandleCart = (productId) => {
        dispatch(fetchAsyncAddUserCart({id,productId}))
    }

    return (
        <>
            <UserHeader />
            <div className='user-product-details'>
                <div className='main-content '>
                    <div className='product-image'>
                        <div className='images'>
                            {productData.products?.productImages.map((data, index) => (
                                <img key={index} src={`http://localhost:4040/uploads/${data}`} alt="" />
                            ))
                            }
                        </div>
                        <div className='main-image'>

                            <img src={productData.products && `http://localhost:4040/uploads/${productData.products.productImages[0]}`} alt="" />
                            <button onClick={() => HandleCart(productData.products._id)}>add to cart</button>
                        </div>
                    </div>
                    <div className='product-detail'>
                        <h1>{productData.products && productData.products.productName}</h1>
                        <p>Price : {productData.products && productData.products.productPrice}</p>
                        <p>spec : {productData.products && productData.products.productSpecs}</p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProductDetails