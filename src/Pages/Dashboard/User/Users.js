import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'cookie-universal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { baseUrl, USER } from '../../../Api/Api'
import TableShow from '../../../Components/1-Dashboard/Table/TableShow';
import './user.css'
const Users = () => {
  //States
  const [users, setUsers] = useState([])
  const [deletuser, setDeleteUser] = useState(0)
  const [currentUser, setUSerCurrent] = useState('')
  const [page,setPage] = useState(1)
  const [limit,setLimit] = useState(3)
  const [total,setTotal] = useState(0) 

  const header = [
    {
      key: 'name',
      name: 'Username',
    },
    {
      key: 'email',
      name: 'Email',
    },
    {
      key: 'role',
      name: 'Role',
    }
    ,
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

  // cookie
  const cookie = new Cookies();
  const token = cookie.get('e-commerce')

  // Get Current User
  useEffect(() => {
    axios.get(`${baseUrl}/${USER}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUSerCurrent(res.data))
  }, [])

  // Get Users
  useEffect(() => {
    axios.get(`${baseUrl}/users?limit=${limit}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUsers(response.data.data)
        setTotal(response.data.total)
      })
      .catch((error) => console.log(error));
  }, [deletuser,limit,page]);

  // Delete User
  const DeleteUser = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${USER}/${id}`, {
        headers: {
          Authorization: `Bearer ` + token,
        }
      })
      setDeleteUser((prev) => !prev)
    }
    catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className=' bg-white p-3 rounded '>
      <div className='d-flex justify-content-around pb-3'>
        <h2 >Users Page</h2>
        <Link className='buttn buttn-primary d-flex align-items-center justify-content-center gap-2' style={{ backgroundColor: '#337891' }} to='/dashboard/user/add'>
          <FontAwesomeIcon icon={faUserPlus} />
          <p className='add-user my-2'>Add User</p>
        </Link>
      </div>
      <TableShow header={header}
                 data={users} 
                 delete={DeleteUser} 
                 currentUser={currentUser}
                 pages={setPage}
                 page={page}
                 limit={limit}
                 setlimit={setLimit}
                 total={total}
                 searshLink={USER}
                  />
    </div>
  )
}
export default Users
