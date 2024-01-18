import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncUser } from '../../../Redux/Slices/UserSlice'
import './CustomerList.css'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
function CustomerList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users } = useSelector((state) => state.users)
    useEffect(() => {
        dispatch(fetchAsyncUser());
    }, [dispatch])

    const handleViewCustomer = (userId) => {
        navigate('/customer-details',{state:{userId:userId}})
    }


    return (
       <>
       <AdminSideBar/>
       <AdminHeader/>
        <div className='customer-container'>
            <div className='customer-list'>
                <h1>customers</h1>
                <table>
                    <tr className='table-head'>
                        <th>Sl</th>
                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>phonenumber</th>
                        <th>view</th>
                    </tr>
                    {users.user?.map((items, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{items._id}</td>
                            <td>{items.username || "email"}</td>
                            <td>{items.email}</td>
                            <td>{items.phonenumber}</td>
                            <td><button onClick={() => handleViewCustomer(items._id)}>view</button></td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
       </>
    )
}

export default CustomerList