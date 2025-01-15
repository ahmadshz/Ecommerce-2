import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl, CAT } from '../../../Api/Api'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import ShoppingCart from '../2-ShoppingCart/ShoppingCart';
import Profile from '../9-Profile/Profile';
import Search from '../10-Search/Search';

const Navbar = () => {
 // State
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  // show Categories in Navbar
  useEffect(() => {
    axios.get(`${baseUrl}/${CAT}`)
      .then((response) =>
        setCategories(response.data.slice(-7))
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, []);


  // Show Categories
  const categoriesShow = categories.map((category, key) =>
  (<li key={key}>
    <Link className='text-white' to={`/products/${category.id}`}>
      {
        category.title.length > 15 ? category.title.slice(1, 13) : category.title
      }
    </Link>
  </li>))


  return (
    <div>
      <header style={{ backgroundColor: '#172856' }}>
        <nav className='mx-auto' style={{ width: '90%' }}>
          <div className='d-flex align-items-center justify-content-between flex-wrap  py-3  '>
            <Link to='/' className=' order-1 '>
              <div className='text-white fw-bold text-uppercase fs-4 '>SHOPPING<span style={{ color: '#FF7F00' }}>BAG</span></div>
            </Link>
            <div className='position-relative order-3 order-lg-2  mx-auto   mt-2' style={{ width: '500px', height: '40px' }}>
              <Search/>
            </div>
            <div className='d-flex align-items-center  gap-1 order-2   order-lg-3 '>
              { /* Show ShoppingCart*/}
             <ShoppingCart/>
              { /* Show ShoppingCart*/}
             <Profile/>
            </div>
          </div>
          <ul className='d-flex align-items-center justify-content-center flex-wrap gap-2 border-top m-0 ps-0 ' style={{ listStyle: 'none' }}>
            {loading ? (
              /////////////// Start Skeleton
              <div className='d-flex justify-content-center gap-4 mb-2 flex-wrap py-3'>
                <Skeleton height='30px' width='50px' />
                <Skeleton height='30px' width='50px' />
                <Skeleton height='30px' width='50px' />
                <Skeleton height='30px' width='50px' />
                <Skeleton height='30px' width='100px' />
              </div>
              /////////////// End Skeleton
            ) : (
              <div className='d-flex justify-content-center align-items-center flex-wrap gap-4  py-4'>
                {/* Show Menu Category */}
                {categoriesShow}
                <li>
                  <Link to='/All_Products' className='text-white '>Show All Products</Link>
                </li>
                {/* Show Menu Category */}
              </div>
            )}
          </ul>
        </nav>
      </header>
    </div>
  )
}
export default Navbar