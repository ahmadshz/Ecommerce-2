import React, { useContext, useEffect, useState } from 'react'
import './Bar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu } from '../../../Context/MenuContext'
import { WindowSize } from '../../../Context/WindowContext'

import axios from 'axios'
import { baseUrl, USER } from '../../../Api/Api'
import Cookie from 'cookie-universal'
import { links } from '../NavLinks'

const SideBar = () => {

  // Menu Context 
  const menu = useContext(Menu)
  const windowContext = useContext(WindowSize)
  const windowSize = windowContext.windowSize
  const isOpen = menu.isOpen;

  const [user, setUser] = useState("")

  const navigate = useNavigate()

  // cookie
  const cookie = Cookie()
  const token = cookie.get('e-commerce')


  // Get user
  useEffect(() => {
    axios.get(`${baseUrl}/${USER}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => setUser(data.data))
      .catch(() => navigate('/login', { replace: true }))
  }, [])

  return (
    <div>
      <div style={{
        position: 'fixed',
        top: '70px',
        left: '0',
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0 , 0 ,0 ,0.1)',
        backdropFilter: 'blur(3px)',
        display: windowSize < '769' && isOpen ? 'block' : 'none'
      }}>
      </div>

      <div className='side-bar pt-3 '
        style={{
          left: windowSize < '769' ? (isOpen ? '0' : '-100%') : 0,
          width: isOpen ? '240px' : 'fit-content',
          position: windowSize < '769' ? 'fixed' : 'sticky',
        }}>

        {links.map((link, key) =>
          link.role.includes(user.role) && (
            <NavLink style={{ marginBottom: '15px' }} key={key} to={link.path}
              className='side-bar-link d-flex align-items-center gap-2'>
              <FontAwesomeIcon style={{
                padding: isOpen ? '10px 8px 10px 14px' : '10px 13px'
              }}
                icon={link.icons}
                className='m-0' />

              <p className='m-0'
                style={{
                  display: isOpen ? 'block' : 'none'
                }}>{link.name}</p>
            </NavLink>
          ))}

      </div>
    </div>
  )
}

export default SideBar
