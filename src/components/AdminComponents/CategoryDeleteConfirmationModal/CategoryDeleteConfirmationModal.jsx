import React from 'react'
import './CategoryDeleteConfirmationModal.css'
import { fetchAsyncCategory, fetchAsyncDeleteCategory, showDeleteConfirmationModal } from '../../../Redux/Slices/CategorySlice';
import { useDispatch } from 'react-redux';
function DeleteConfirmationModal(id) {
    const dispatch=useDispatch();
    function HandleCancelDelete() {
        console.log("====");
        dispatch(showDeleteConfirmationModal(false))
        
    }
   async function HandleDelete() {
      await  dispatch(fetchAsyncDeleteCategory(id))
      await dispatch(fetchAsyncCategory());
        dispatch(showDeleteConfirmationModal(false))

    }
  return (
   <>
    <div className='deleteCategoryConfirmationModal'>
    <div className="modalFirstRow">
        <div className="CloseCrossButn"  onClick={HandleCancelDelete}>
            <i className="fa-solid fa-xmark"></i>
        </div>
    </div>
    <div className="warningContent">
        <span>Are You Sure You Want To Delete This category ?</span>
    </div>
    <div className="modalButtons">
        <button className="CancelModal"  onClick={HandleCancelDelete}>Cancel</button>
        <button className="DeleteModal"onClick={HandleDelete} >Delete</button>
    </div>
</div>
 <div className='overlay'></div>
   </>
  )
}

export default DeleteConfirmationModal