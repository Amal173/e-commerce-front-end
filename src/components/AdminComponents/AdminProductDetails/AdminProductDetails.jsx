import React, { useEffect } from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import './AdminProductDetails.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncProductsById, getProductById } from '../../../Redux/Slices/ProductSlice'
function AdminProductDetails() {
    const location = useLocation();
    const dispatch = useDispatch()
    const productData = useSelector(getProductById);
    const id = location.state.id;
    useEffect(() => {
        dispatch(fetchAsyncProductsById(id))
    }, [dispatch, id])
    console.log(productData.products?.productImages[0]);
    return (
        <div className="admin-product-details">
            <AdminHeader />
            <div className="content-container">
                <AdminSideBar />
                <div className="main-content">
                    <div className='product-image'>
                        <div className='images'>
                            {productData.products?.productImages.map((data, index) => (
                                <img key={index} src={`http://localhost:4040/uploads/${data}`} alt="" />
                                ))
                            }
                        </div>
                        <div className='main-image'>

                            <img src={productData.products && `http://localhost:4040/uploads/${productData.products.productImages[0]}`} alt="" />
                        </div>
                    </div>
                    <div className='product-detail'>
                            <button className='edit-button'>edit product</button>
                        <h1>{productData.products.productName}</h1>
                        <p>Price : {productData.products.productPrice}</p>
                        <p>spec : {productData.products.productSpecs}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProductDetails