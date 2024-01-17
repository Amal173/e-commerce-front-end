import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DisplayProductDeleteModal, DisplayUpdateProductsForm, fetchAsyncProducts, getProducts, showUpdateProductsForm, showdeleteWarningModal } from '../../../Redux/Slices/ProductSlice';
import ProductDeleteConfirmationModal from '../ProductDeleteConfirmationModal/ProductDeleteConfirmationModal';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSideBar from '../AdminSideBar/AdminSideBar';
import { useLocation, useNavigate } from 'react-router-dom';
import UpdateProductForm from '../UpdateProductForm/UpdateProductForm';
import './AdminProductList.css'
function AdminProductList() {

  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const [id, setId] = useState('')
  const navigate=useNavigate();
  const DisplayDeletemodal = useSelector(DisplayProductDeleteModal)
  const location = useLocation();
  const categoryId = location.state.id;
  const categoryname = location.state.Name;
  const displayUpdateProductsForm = useSelector(DisplayUpdateProductsForm)

  useEffect(() => {
    dispatch(fetchAsyncProducts(categoryId));
  }, [dispatch, categoryId])

  const HandleDelete = (id) => {
    setId(id)
    dispatch(showdeleteWarningModal(true))
  }
  const HandleEdit = (id) => {
    setId(id)
    dispatch(showUpdateProductsForm(true))
  }

  const HandleClick = (id) => {
    navigate('/admin/products/details', {state:{id:id}})
  }
  return (
    <div className="dashboard">
      <AdminHeader />
      <div className="content-container">
        <AdminSideBar />
        <div className="main-content">
          <div className="product-list">
            <h2>Product : {categoryname}</h2>
            <div className="card-container">
              {Array.isArray(products.products) && products.products.map((product) => (
                <div className="card" key={product._id}>
                  <img src={`http://localhost:4040/uploads/${product.productImages[0]}`} alt={product.productName} onClick={() => HandleClick(product._id)} />
                  <div className="card-details">
                    <h3>{product.productName}</h3>
                    <p>price: ₹ {product.productPrice}</p>
                    <p>spec: {product.productSpecs}</p>
                    <p>description: {product.productDescription}</p>
                    <div className="actions">
                      <button onClick={() => HandleEdit(product._id)}>Edit</button>
                      <button onClick={() => HandleDelete(product._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {DisplayDeletemodal && <ProductDeleteConfirmationModal id={id} />}
            {displayUpdateProductsForm && <UpdateProductForm id={id} />}
          </div>
        </div>
      </div>
    </div>

  )
}

export default AdminProductList