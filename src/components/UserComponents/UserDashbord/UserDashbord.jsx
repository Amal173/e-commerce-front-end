import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import UserHeader from '../UserHeader/UserHeader';
import UserProductList from '../UserProductList/UserProductList';
import CarouselSlide from '../CarouselSlide/CarouselSlide';
import './UserDashbord.css'
import { fetchAsyncCategory, getCategoryes } from '../../../Redux/Slices/CategorySlice';
import UserCategoryList from '../UserCategoryList/UserCategoryList';

function UserDashbord() {
  const dispatch = useDispatch()
  const [data ,SetData]=useState([])
  const category = useSelector(getCategoryes)
  console.log(category.categoryes, "user-category");
  const navigate = useNavigate();
  useEffect(() => {
    if (!(localStorage.getItem('userToken'))) {
      navigate('/')
    }
    dispatch(fetchAsyncCategory())
  }, [navigate,dispatch])

  // {Array.isArray(category.categoryes) && category.categoryes.length > 0 && category.categoryes.map((data) => (
   
  // ))

  // }

  return (
    <div className='container'>
      <UserHeader />
      <UserCategoryList />
      <CarouselSlide />
      {/* <UserProductList id={} /> */}
    </div>
  )
}

export default UserDashbord