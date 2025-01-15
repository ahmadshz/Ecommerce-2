import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from './Pages/Website/Auth/LogIn'
import Register from './Pages/Website/Auth/Register'
import Users from './Pages/Dashboard/User/Users'
import GoogleCallback from './Pages/Website/Auth/GoogleCallback'
import Dashboard from './Pages/Dashboard/Dashboard'
import RequireAuth from './Pages/Website/Auth/RequireAuth'
import UpdateUser from './Pages/Dashboard/User/UpdateUser'
import AddUser from './Pages/Dashboard/User/AddUser'
import Error404 from './Pages/Website/Auth/Error/Error404'
import RequiredBack from './Pages/Website/Auth/RequiredBack'
import Categories from './Pages/Dashboard/Category/Categories'
import AddCategory from './Pages/Dashboard/Category/AddCategory'
import EditCategory from './Pages/Dashboard/Category/EditCategory'
import Products from './Pages/Dashboard/Products/Products'
import AddProduct from './Pages/Dashboard/Products/AddProduct'
import UpdateProduct from './Pages/Dashboard/Products/UpdateProduct'
import Website from './Pages/Website/Website/Website'
import SingleProduct from './Components/2-Website/3-SingleProduct/SingleProduct'
import Categoriess from './Components/2-Website/4-ShowAllSameCategory/Categories'
import RequestPasswordReset from './Pages/Website/Auth/RequestResetPassword'
import AllProducts from './Components/2-Website/6-All Products/AllProducts'

const App = () => {
  return (
    <div>
      <Routes>
        { /* Public Routes */}
          <Route path='/' element={<Website />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/products/:id' element={<Categoriess />} /> 
            <Route path='/All_Products' element={<AllProducts />} />
        {/* Auth Routes */}
        <Route element={<RequiredBack />}>
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path="/password-reset" element={<RequestPasswordReset />} />
        </Route>
        <Route path='/*' element={<Error404 />} />
        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRole={['1991', '1995', '1999']} />}>
          <Route path='/auth/google/callback' element={<GoogleCallback />} />
          <Route path='/dashboard' element={<Dashboard />} >
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
             {/* Routes of Users */}
              <Route path='users' element={<Users />} />
              <Route path='users/:id' element={<UpdateUser />} />
              <Route path='user/add' element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              {/* Routes of Categories */}
              <Route path='Categories' element={<Categories />} />
              <Route path='Category/add' element={<AddCategory />} />
              <Route path='categories/:id' element={<EditCategory />} />
              {/*  Routes of Products*/}
              <Route path='product' element={<Products />} />
              <Route path='products/add' element={<AddProduct />} />
              <Route path='product/:id' element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
