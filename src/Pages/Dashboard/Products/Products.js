import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'cookie-universal'
import { Link } from 'react-router-dom';
import { baseUrl, PRODUCTS, PRO } from '../../../Api/Api'
import TableShow from '../../../Components/1-Dashboard/Table/TableShow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {
  //States
  const [products, setProducts] = useState([])
  const [deleteProduct, setDeleteProducts] = useState(0)
  const [page , setPage] = useState(1)
  const [limit,setLimit] = useState(3)
  const [total,setTotal] = useState(0)

  // cookie
  const cookie = new Cookies();
  const token = cookie.get('e-commerce')

  const headers = [
    {
      key: 'images',
      name: 'Images'
    },
    {
      key: 'title',
      name: 'Title'
    },
    {
      key: 'description',
      name: 'Description'
    },
    {
      key: 'price',
      name: 'Price',
    },
    {
      key: 'rating',
      name: 'Rating'
    },
    {
      key: 'created_at',
      name: 'Created_at'
    }
    ,
    {
      key: 'updated_at',
      name: 'Updated_at'
    }
  ]
  
  console.log(products)
  // Get Category
  useEffect(() => {
    axios.get(`${baseUrl}/${PRODUCTS}?limit=${limit}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
             setProducts(response.data.data)
             setTotal(response.data.total)
            }
    )
      .catch((error) => console.log(error));
  }, [deleteProduct, limit, page, token]);

  // Delet Product
  const  DeleteProduct = async (id) => {
    try {
      await axios.delete(`${baseUrl}/product/${id}`, {
        headers: {
          Authorization: `Bearer ` + token,
        }
      })
      setDeleteProducts((prev) => !prev)
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='bg-white  px-5 py-3  rounded   '>
      <div className='d-flex justify-content-around pb-3'>
        <h2 >Product Page</h2>
        <Link className='buttn buttn-primary d-flex align-items-center justify-content-center gap-1' 
              style={{ backgroundColor: '#337891' }} 
              to='/dashboard/products/add'> <FontAwesomeIcon icon={faPlus} />
              <p className='add-user my-2'>Add Product</p></Link>
      </div>
      <TableShow limit={limit}
                 header={headers} 
                 data={products} 
                 delete={DeleteProduct} 
                 pages={setPage}
                 page={page}
                 setlimit={setLimit}
                 total={total}
                 searshLink={PRO}
                 />
    </div>
  )
}

export default Categories
