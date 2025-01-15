import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa6'
import { baseUrl, LOGOUT, USER } from '../../../Api/Api'
import Cookie from 'cookie-universal'
import { Link } from 'react-router-dom'

const Profile = () => {
  // state
  const [data, setData] = useState('')

  // Get cookie && token
  const cookie = Cookie()
  const token = cookie.get('e-commerce')

  // Get User
  useEffect(() => {
    if (token) {
      axios
        .get(`${baseUrl}/${USER}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setData(res.data))
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 401) {
            // Handle unauthorized case
            cookie.remove('e-commerce');
            window.location.pathname = '/login';
          }
        });
    }
  }, [token]);

  // Handle Logout
  const handleLogOut = async () => {
    if (token) {
      await axios
        .get(`${baseUrl}/${LOGOUT}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          // Successfully logged out
          cookie.remove('e-commerce');
          window.location.pathname = '/';
        })
        .catch((error) => {
          console.error('Logout failed:', error);
        });
    } else {
      window.location.pathname = '/';
    }
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle className='bg-transparent border-0' id="dropdown-basic">
          <FaUser size={20} />
        </Dropdown.Toggle>

        <Dropdown.Menu className='p-3'>
          <div className='fw-bold text-center'>
            {
              token && data
                ? data.name.charAt(0).toUpperCase() + data.name.slice(1)
                : "You need to login"
            }
          </div>
          <hr />
          {
            token ? (
              <div>
                <button className='btn btn-danger w-100' onClick={handleLogOut}>Logout</button>
                {data.role === "1995" ? <Link to='/dashboard/users' className='btn btn-primary w-100 mt-3'>Dashboard</Link> : ''}
              </div>
            )
              : (
                <div>
                  <Link to='/login' className='btn btn-primary w-100 '>Login</Link>
                </div>
              )
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Profile