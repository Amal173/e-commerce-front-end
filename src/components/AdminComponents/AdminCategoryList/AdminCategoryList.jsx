import React, { useEffect, useState } from 'react';
import './AdminCategoryList.css';
import { useDispatch, useSelector } from 'react-redux';
import { displayCreateCategoryForm, displayUpdateCategoryForm, fetchAsyncCategory, getCategoryes, showDeleteConfirmation, showDeleteConfirmationModal, toCreateCategoryForm, toUpdateCategoryForm } from '../../../Redux/Slices/CategorySlice';
import DeleteConfirmationModal from '../CategoryDeleteConfirmationModal/CategoryDeleteConfirmationModal'
import UpdateCategoryForm from '../UpdateCategoryForm/UpdateCategoryForm';
import CreateCategoryForm from '../CreateCategoryForm/CreateCategoryForm';
import { useNavigate } from 'react-router-dom';
import { DisplayCreateProductsForm, showCreateProductsForm } from '../../../Redux/Slices/ProductSlice';
import CreateProductForm from '../CreateProductForm/CreateProductForm';

function AdminCategoryList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector(getCategoryes);
    const showDeleteModal = useSelector(showDeleteConfirmation)
    const DisplayUpdateCategoryForm = useSelector(displayUpdateCategoryForm)
    const DisplayCreateCategoryForm = useSelector(displayCreateCategoryForm)
    const displayCreateProductForm = useSelector(DisplayCreateProductsForm)
    const [id, setId] = useState()

    useEffect(() => {
        dispatch(fetchAsyncCategory());
    }, [dispatch]);


    function HandleDelete(id) {
        setId(id)
        dispatch(showDeleteConfirmationModal(true))

    }
    function HandleUpdate(id) {
        setId(id)
        dispatch(toUpdateCategoryForm(true))

    }
    function HandleCreateCategory() {
        dispatch(toCreateCategoryForm(true))

    }
    function HandleCreateProducts() {
        dispatch(showCreateProductsForm(true))

    }
    const HandleClick = (id,categoryName) => {
        navigate('/admin/products', { state: { id: id ,Name:categoryName} })
    }

    return (
        <>
            <div className="category-list">
                <div className='category-title'><h2>Category List</h2>
                    <button onClick={HandleCreateCategory}>create category</button>
                    <button onClick={HandleCreateProducts}>create products</button>
                </div>
                <div className="card-container">
                    {Array.isArray(data.categoryes) && data.categoryes.map((category) => (
                        <div className="card" key={category._id}>
                            <img src={`http://localhost:4040/uploads/${category.categoryImage}`} alt={category.categoryName} onClick={() => HandleClick(category._id,category.categoryName)} />
                            <div className="card-details">
                                <h3>{category.categoryName}</h3>
                                <div className="actions">
                                    <button onClick={() => HandleUpdate(category._id)}>Edit</button>
                                    <button onClick={() => HandleDelete(category._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showDeleteModal && <DeleteConfirmationModal id={id} />}
            {DisplayUpdateCategoryForm && <UpdateCategoryForm id={id} />}
            {DisplayCreateCategoryForm && <CreateCategoryForm />}
            {displayCreateProductForm && <CreateProductForm />}
        </>
    );
}

export default AdminCategoryList;
