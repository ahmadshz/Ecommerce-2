import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'cookie-universal'
import { Link } from 'react-router-dom';
import { baseUrl, CATEGORY, CAT } from '../../../Api/Api'
import TableShow from '../../../Components/1-Dashboard/Table/TableShow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {

  //States
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [total, setTotal] = useState(0)

  // cookie
  const cookie = new Cookies();
  const token = cookie.get('e-commerce')

  const headers = [
    {
      key: 'title',
      name: 'Title'
    },
    {
      key: 'image',
      name: 'Image'
    }
    ,
    {
      key: 'created_at',
      name: 'Created_at'
    },
    {
        key: 'updated_at',
        name: 'Updated_at'
    }
  ]

  // Get Category
  useEffect(() => {
    axios.get(`${baseUrl}/${CAT}?limit=${limit}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setCategories(response.data.data);
        setTotal(response.data.total)
      }
      )
      .catch((error) => console.log(error));
  }, [limit, page]);

  // handle Delete
  const DeleteCategory = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${CATEGORY}/${id}`, {
        headers: {
          Authorization: `Bearer ` + token,
        }
      })
      setCategories((prev) => prev.filter((item) => item.id !== id))
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='bg-white px-5 py-3 rounded '>
      <div className='d-flex justify-content-around pb-3'>
        <h2 >Categories Page</h2>
        <Link className='buttn buttn-primary  ' style={{ backgroundColor: '#337891' }} to='/dashboard/category/add'>
        <FontAwesomeIcon icon={faCartPlus} />
        <p className='add-user mx-1 my-2'>Add Category</p>
        </Link>
      </div>
      <TableShow limit={limit}
        page={page}
        header={headers}
        data={categories}
        delete={DeleteCategory}
        pages={setPage}
        setlimit={setLimit}
        total={total}
        searshLink={CATEGORY}
      />
    </div>
  )
}

export default Categories
