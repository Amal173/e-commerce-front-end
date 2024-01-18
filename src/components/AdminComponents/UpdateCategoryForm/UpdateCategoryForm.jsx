import React, { useEffect, useRef, useState } from 'react'
import './UpdateCategoryForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncCategory, fetchAsyncOneCategory, fetchAsyncUpdateCategory, getCategoryesById, toUpdateCategoryForm } from '../../../Redux/Slices/CategorySlice';
function UpdateCategoryForm(id) {

    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const category = useSelector(getCategoryesById);
    const [data, setData] = useState({ categoryName: "", categoryImage: '' })
    const [file, setFile] = useState()
    const [preview, setPreview] = useState("");


    useEffect(() => {
        dispatch(fetchAsyncOneCategory(id))
    }, [dispatch, id])


    useEffect(() => {
        if (category.categoryes) {
            setData({
                categoryName: category.categoryes.categoryName || '',
                categoryImage: category.categoryes.categoryImage || ''
            })
        }

    }, [setData, category.categoryes])

    const handleCancelForm = () => {
        dispatch(toUpdateCategoryForm(false))

    }

    const HandleSubmitForm = async () => {
        const { categoryName } = data
        console.log(id);
        const formData = new FormData();
        formData.append('categoryName', categoryName)
        formData.append('categoryImage', file)
        await dispatch(fetchAsyncUpdateCategory({ id, formData }));
        await dispatch(fetchAsyncCategory());
        handleCancelForm()


    }

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            data.categoryImage = null;
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setPreview(data.categoryImage);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))

    }
    return (
        <div className='update-category-form'>
            <div className="title">
                <h1>Add Category</h1>
                <i onClick={handleCancelForm} className="fa-solid fa-xmark"></i>
            </div>
            <div className="category-Image" htmlFor="addImage" >
                <img src={data.categoryImage ? `http://localhost:4040/uploads/${data.categoryImage}` : preview} alt="" />
                <div onClick={() => fileInputRef.current.click()} className='addImageOverlay'>
                    <span>Upload</span><i class="fa-solid fa-camera"></i>
                </div>
            </div>
            <input className='addImage' ref={fileInputRef} style={{ display: 'none' }} type="file" accept='image/*' name='categoryImage' onChange={handleImageChange} />
            <form action="">
                <div className="row">
                    <label htmlFor="">Category Name</label>
                    <input type="text" placeholder='Enter Category Name' name='categoryName' value={data.categoryName} onChange={handleInputChange} />
                    {/* {errors.email && <p>{errors.email}</p>} */}
                </div>
                <div className="buttons">
                    <button type='button' onClick={handleCancelForm} className='cancel-button'>cancel</button>
                    <button type='button' className='submit-button' onClick={HandleSubmitForm}>submit</button>
                </div>
            </form>
            <div className='overlay'></div>
        </div>
    )
}

export default UpdateCategoryForm