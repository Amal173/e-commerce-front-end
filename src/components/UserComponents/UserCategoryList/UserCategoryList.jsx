import React, { useEffect } from 'react'
import './UserCategoryList.css'
import { fetchAsyncCategory, getCategoryes } from '../../../Redux/Slices/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function UserCategoryList() {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const category = useSelector(getCategoryes)
    console.log(category.categoryes, "category");
    useEffect(() => {
        dispatch(fetchAsyncCategory())
    }, [dispatch])

const HandleClick=(categoryId)=>{
    console.log(categoryId);
    navigate('/products',{state:{id:categoryId}})
}

    return (

        <div className='user-category'>
            <div className='container'>
                <div className='category-list'>
                    {Array.isArray(category.categoryes) && category.categoryes.length > 0 && category.categoryes.map((data) => (
                        <button onClick={()=>HandleClick(data._id)}>
                        {data.categoryName}
                        </button>       
                    ))}
                </div>
            </div>
        </div>

    )
}

export default UserCategoryList