import React, { useEffect } from 'react'
import { baseUrl, GOOGLE_CALL_BACK } from '../../../Api/Api'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie'
const GoogleCallback = () => {
    // cookie
    const cookie = new Cookies();
    const location = useLocation()
    useEffect(() => {
        const GoogleCall = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`);
                const token = res.data.access_token;
                cookie.set('e-commerce', token);
               
            } catch (err) {
                console.log(err)
            }
        }
        GoogleCall()
    }, []);

    return (
        <div>
            Test
        </div>
    )
}

export default GoogleCallback
