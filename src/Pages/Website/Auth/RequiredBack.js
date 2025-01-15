import React from 'react'
import Cookie from 'cookie-universal'
import { Navigate, Outlet } from 'react-router-dom'

const RequiredBack = () => {
    const cookie = Cookie()
    const token = cookie.get('e-commerce')
    return token ? <Navigate to={'/'} replace={true} /> : <Outlet />
}
export default RequiredBack
