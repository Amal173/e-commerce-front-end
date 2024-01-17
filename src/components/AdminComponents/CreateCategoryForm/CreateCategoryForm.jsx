import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAsyncCategory, fetchAsyncCreateCategory, toCreateCategoryForm } from '../../../Redux/Slices/CategorySlice';
import './CreateCategoryForm.css'
function CreateCategoryForm() {
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const dispatch = useDispatch();

    const HandleCancel = () => {
        dispatch(toCreateCategoryForm(false))

    }
    const HandleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(e.target.files[0]);
        setFile(selectedFile);
        // if (selectedFile) {
        //   setImagePreview(URL.createObjectURL(selectedFile));
        // } else {
        //   setImagePreview(" ");
        // }
    }

    const HandleInputChange = (e) => {
        console.log(e.target.value);
        setName(e.target.value);
    }
    const HandleSubmit = async () => {
        const formData = new FormData()
        formData.append("categoryImage", file)
        formData.append("categoryName", name)
        await dispatch(fetchAsyncCreateCategory(formData))
        await dispatch(fetchAsyncCategory());
        HandleCancel();
    }
    return (
        <div className='create-category-form'>
            <div className='title'>
                <h1>Add Category</h1>
                <i className="fa-solid fa-xmark" onClick={HandleCancel}></i>
            </div>
            <form>
                <div className='category-image'>
                    <input
                        type='file'
                        accept='image/*'
                        name='categoryImage'
                        placeholder='categoryImage'
                        onChange={HandleImageChange}
                        
                    />
                </div>
                <div className='category-name'>
                    <input
                        name='categoryName'
                        onChange={HandleInputChange}
                        placeholder='CategoryName'
                        value={name.CategoryName}
                    />
                </div>
                <div className='buttons'>
                    <button className='submit' type='button' onClick={HandleCancel}>Cancel</button>
                    <button className='submit' type='button' onClick={HandleSubmit}>submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCategoryForm