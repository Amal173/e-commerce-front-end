import './App.css';
import {
  Routes, Route
} from "react-router-dom";
import AdminLogin from './components/AdminComponents/AdminLogin/AdminLogin';
import AdminDashbord from './components/AdminComponents/AdminDashbord/AdminDashbord';
import AdminProductList from './components/AdminComponents/AdminProductList/AdminProductList';
import AdminProductDetails from './components/AdminComponents/AdminProductDetails/AdminProductDetails';
import UserLogin from './components/UserComponents/UserLogin/UserLogin';
import UserRegister from './components/UserComponents/UserRegister/UserRegister';
import UserDashbord from './components/UserComponents/UserDashbord/UserDashbord';
import UserCategoryWiseProductList from './components/UserComponents/UserCategoryWiseProductList/UserCategoryWiseProductList';
import UserProductDetails from './components/UserComponents/UserProductDetails/UserProductDetails';
import UserCart from './components/UserComponents/UserCart/UserCart';
import CheckoutSuccess from './components/UserComponents/CheckoutSuccess/CheckoutSuccess';
import UserOrders from './components/UserComponents/UserOrders/UserOrders';
import OrderSuccess from './components/UserComponents/OrderSuccess/OrderSuccess';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminDashbord />} />
        <Route path='/admin/products' element={<AdminProductList/>} />
        <Route path='/admin/products/details' element={<AdminProductDetails/>} />
        <Route path='/' element={<UserLogin/>} />
        <Route path='/register' element={<UserRegister/>} />
        <Route path='/home' element={<UserDashbord/>} />
        <Route path='/products' element={<UserCategoryWiseProductList/>} />
        <Route path='/products/details' element={<UserProductDetails/>} />
        <Route path='/cart' element={<UserCart/>} />
        <Route path='/checkout-success' element={<CheckoutSuccess/>} />
        <Route path='/orders' element={<UserOrders/>} />
        <Route path='/order-success' element={<OrderSuccess/>} />
      </Routes>
    </div>
  );
}

export default App;
