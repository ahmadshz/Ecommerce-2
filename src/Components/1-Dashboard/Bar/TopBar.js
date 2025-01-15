import React, { useContext, useEffect, useState } from 'react'
import './Bar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Menu } from '../../../Context/MenuContext'
import axios from 'axios'
import { baseUrl, LOGOUT } from '../../../Api/Api'
import Cookie from 'cookie-universal'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const TopBar = () => {

  const [name, setName] = useState('')

  // Menu Context
  const menu = useContext(Menu)
  const setIsOpen = menu.setIsOpen

  // Cookie
  const cookie = Cookie()
  const token = cookie.get('e-commerce')

  // Get user
  useEffect(() => {
    axios.get(`${baseUrl}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setName(res.data.name))
  }, [])

  // Handle Logout
  const handleLogOut = () => {
    axios.get(`${baseUrl}/${LOGOUT} `, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    cookie.remove('e-commerce')
    window.location.pathname = '/login'
  }

  return (
    <div className='top-bar  '>
      <div className='d-flex  align-items-center justify-content-between flex-wrap gap-5'  >  
        <Dropdown>
        <Dropdown.Toggle className='border-0 bg-transparent text-dark fw-bold fs-3' id="dropdown-basic">
        {name}
        </Dropdown.Toggle>
  
        <Dropdown.Menu className='p-3'>
        <Link to={'/'} className='btn btn-primary w-100 mt-2'> Go To Home</Link>
        <div onClick={handleLogOut} className='btn btn-danger text-center mt-2 fw-bold w-100'>Logout</div>
        </Dropdown.Menu>
      </Dropdown>
        <FontAwesomeIcon
          className='color'
          onClick={() => setIsOpen((prev) => !prev)}
          cursor={'pointer'}
          icon={faBars}
          fontSize='20px' />
      </div>
     
    </div>

  )
}

export default TopBar
