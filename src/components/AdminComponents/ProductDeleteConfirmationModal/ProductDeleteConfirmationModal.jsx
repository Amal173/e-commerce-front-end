import React from 'react'
import './ProductDeleteConfirmationModal.css'
import { useDispatch } from 'react-redux'
import { fetchAsyncDeleteProducts, fetchAsyncProducts, showdeleteWarningModal } from '../../../Redux/Slices/ProductSlice';
function ProductDeleteConfirmationModal({ id }) {
    
    const dispatch = useDispatch();

    const HandleDelete = async () => {
        await dispatch(fetchAsyncDeleteProducts(id))
        await dispatch(fetchAsyncProducts())
        dispatch(showdeleteWarningModal(false))
    }

    const HandleCancelDelete = () => {
        dispatch(showdeleteWarningModal(false))
    }
    return (
        <>
            <div className='deleteConfirmationModal'>
                <div className="modalFirstRow">
                    <div className="CloseCrossButn" onClick={HandleCancelDelete}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div className="warningContent">
                    <span>Are You Sure You Want To Delete This product ?</span>
                </div>
                <div className="modalButtons">
                    <button className="CancelModal" onClick={HandleCancelDelete}>Cancel</button>
                    <button className="DeleteModal" onClick={HandleDelete} >Delete</button>
                </div>
            </div>
            <div className='overlay'></div>
        </>
    )
}

export default ProductDeleteConfirmationModal