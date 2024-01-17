import React, { useEffect, useState } from 'react'
import './UpdateProductForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncProducts, fetchAsyncProductsById, fetchAsyncUpdateProducts, getProductById, showUpdateProductsForm } from '../../../Redux/Slices/ProductSlice';
import { fetchAsyncCategory, getCategoryes } from '../../../Redux/Slices/CategorySlice';
function UpdateProductForm({ id }) {

  const dispatch = useDispatch();
  const product = useSelector(getProductById)
  const categoryes = useSelector(getCategoryes);
  const [files, setFiles] = useState([])
  const [inputFields, setInputFields] = useState({ productName: '', productDescription: '', categoryId: '', productSpecs: "", productPrice: '' });

  useEffect( () => {
     dispatch(fetchAsyncProductsById(id))
     dispatch(fetchAsyncCategory())
  }, [dispatch, id])


  useEffect(()=>{
    const Product=product.products;
    console.log(Product);
    if(Product){
      setInputFields({
        productDescription:Product.productDescription||'',
        productName: Product.productName||'',
        categoryId: Product.categoryId||'',
        productSpecs:Product.productSpecs||'',
        productPrice: Product.productPrice||'',
      })
    }
  },[product.products,setInputFields])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prevData) => ({
        ...prevData,
        [name]: value
    }))

}


  const HandleSubmitForm = async() => {
    const { productName ,productDescription,categoryId,productPrice,productSpecs} = inputFields
    console.log(id);
    const formData = new FormData();
    formData.append('productName', productName)
    formData.append('productDescription', productDescription)
    formData.append('categoryId', categoryId)
    formData.append('productPrice', productPrice)
    formData.append('productSpecs', productSpecs)
    for (const file of files) {
      formData.append('productImages', file);
    }
   await dispatch(fetchAsyncUpdateProducts({id, formData}));
   await dispatch(fetchAsyncProducts(inputFields.categoryId))
    handleCancelForm()

  }

  const handleCancelForm = () => {
    dispatch(showUpdateProductsForm(false))
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files;
    setFiles(selectedFile);
    // if (selectedFile) {
    //     data.categoryImage = null;
    //     setPreview(URL.createObjectURL(selectedFile));
    // } else {
    //     setPreview(data.categoryImage);
    // }
}

  return (
    <div className='create-product-form'>
      <div className='title'>
        <h1>Update Products</h1>
      </div>
      <div className='row'>
        <label htmlFor="">product name</label>
        <input type="text" name='productName' value={inputFields.productName} onChange={handleInputChange} />
      </div>
      <div className='row'>
        <label htmlFor="">description</label>
        <input type="text" name='productDescription' value={inputFields.productDescription} onChange={handleInputChange} />
      </div>
      <div className='row'>
        <label htmlFor="">specs</label>
        <input type="text" name='productSpecs' value={inputFields.productSpecs} onChange={handleInputChange} />
      </div>
      <div className='row'>
        <label htmlFor="">price</label>
        <input type="text" name='productPrice' value={inputFields.productPrice} onChange={handleInputChange} />
      </div>
      <div className='row'>
        <label htmlFor="">image</label>
        <input type="file" name='productImages' multiple  onChange={handleImageChange} />
      </div>
      <div className='row'>
        <label htmlFor="">category</label>
        <select name="categoryId" value={inputFields.categoryId} onChange={handleInputChange}>
        <option value="">select Category</option>
          {categoryes.categoryes?.map((data) => (
            <option key={data._id} value={data._id}>{data.categoryName}</option>
          ))}
        </select>
      </div>
      <div className="buttons">
        <button type='button' onClick={handleCancelForm} className='cancel-button'>cancel</button>
        <button type='button' className='submit-button' onClick={HandleSubmitForm}>submit</button>
      </div>
    </div>
  )
}

export default UpdateProductForm