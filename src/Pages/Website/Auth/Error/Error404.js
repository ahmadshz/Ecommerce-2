import React from 'react'
import Err404 from '../../../../css/assets/Lottifie/MWx49mwHC0.json'
import Lottie from 'lottie-react'
import'./Error.css'
import { Link } from 'react-router-dom'

const Error404 = () =>   {
    return ( <div className='mainErr-404'>
        <div>
        <Lottie  className='err404' animationData={Err404} loop={true}></Lottie>
        </div>
        <h4>Look like you're lost</h4>
        <p>This page you're looking it's not available</p>
        <Link to={'/'} className='btn btn-primary py-3 px-4 home1'>Go To Home</Link>
        </div>
    )} 
   

export default Error404
