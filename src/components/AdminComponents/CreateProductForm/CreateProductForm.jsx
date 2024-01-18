import React, { useEffect, useState } from 'react';
import './CreateProductForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncCreateProducts, showCreateProductsForm } from '../../../Redux/Slices/ProductSlice';
import { fetchAsyncCategory, getCategoryes } from '../../../Redux/Slices/CategorySlice';

function CreateProductForm() {
  const dispatch = useDispatch();
  const categoryes = useSelector(getCategoryes);

  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [inputFields, setInputFields] = useState({
    productName: '',
    productDescription: '',
    categoryId: '',
    productSpecs: '',
    productPrice: ''
  });

  useEffect(() => {
    dispatch(fetchAsyncCategory());
  }, [dispatch]);

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const HandleImageChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);

    const previews = [];
    for (const file of selectedFiles) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === selectedFiles.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = () => {
    const { productName, productDescription, categoryId, productSpecs, productPrice } = inputFields;
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('categoryId', categoryId);
    formData.append('productSpecs', productSpecs);
    formData.append('productPrice', productPrice);
    for (const file of files) {
      formData.append('productImages', file);
    }
    dispatch(fetchAsyncCreateProducts(formData));
    handleCancelForm();
  };

  const handleCancelForm = () => {
    dispatch(showCreateProductsForm(false));
  };

  return (
    <div className='create-product-form'>
      <div className='title'>
        <h1>Create Products</h1>
      </div>
      <div className='row'>
        <label htmlFor=''>product name</label>
        <input type='text' name='productName' value={inputFields.productName} onChange={HandleInputChange} />
      </div>
      <div className='row'>
        <label htmlFor="">description</label>
        <input type="text" name='productDescription' value={inputFields.productDescription} onChange={HandleInputChange} />
      </div>
      <div className='row'>
        <label htmlFor="">specs</label>
        <input type="text" name='productSpecs' value={inputFields.productSpecs} onChange={HandleInputChange} />
      </div>
      <div className='row'>
        <label htmlFor="">price</label>
        <input type="text" name='productPrice' value={inputFields.productPrice} onChange={HandleInputChange} />
      </div>
      <div className='row'>
        <label htmlFor=''>image</label>
        <input type='file' name='productImages' onChange={HandleImageChange} multiple />
        <div className='image-previews'>
          {imagePreviews.map((preview, index) => (
            <img key={index} src={preview} alt={`Preview ${index}`} className='image-preview' />
          ))}
        </div>
      </div>
      <div className='row'>
        <label htmlFor="">category</label>
        <select name="categoryId" value={inputFields.categoryId} onChange={HandleInputChange}>
          <option value="">select Category</option>
          {categoryes.categoryes?.map((data) => (
            <option key={data._id} value={data._id}>{data.categoryName}</option>
          ))}
        </select>
      </div>
      <div className='buttons'>
        <button type='button' onClick={handleCancelForm} className='cancel-button'>
          cancel
        </button>
        <button type='button' className='submit-button' onClick={handleSubmitForm}>
          submit
        </button>
      </div>
    </div>
  );
}

export default CreateProductForm;
