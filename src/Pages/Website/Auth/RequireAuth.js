import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Cookie from 'cookie-universal'
import axios from 'axios'
import Loading from '../../../css/Components/Loading/Loading'
import Error403 from './Error/Error403'
import { baseUrl } from '../../../Api/Api'

const RequireAuth = ({ allowedRole }) => {
    const [user, setUser] = useState("")
    const navigate = useNavigate()

    const cookie = Cookie()
    const token = cookie.get('e-commerce')

    useEffect(() => {
        axios.get(`${baseUrl}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => setUser(res.data))
            .catch(() => navigate('/login', { replace: true }))
    }, [])

    return token ? (
        user === "" ? (
            <Loading />
        ) : allowedRole.includes(user.role) ? (
            <Outlet />
        ) : (
            <Error403 role={user.role} />
        )
    ) : (
        <Navigate to={'/login'} replace={true} />
    )
}

export default RequireAuth