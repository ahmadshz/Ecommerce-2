import React from 'react'
import './Error.css'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import err403 from '../../../../css/assets/Lottifie/Error403.json'

const Error403 = ({role}) => {
  return (
    <div className='err'>
    <Lottie animationData={err403}></Lottie>
      <div className='error1'>403 ACCESS DENIDED</div>
      <div className='error2'>You don't have premission to access this page</div>
      <div className='d-flex justify-content-center mx-1'>
      <Link className='btn btn-primary py-3 px-4 mt-4 '   to={role === '1995' ? '/dashboard/users' : '/'}>
       {role === '1995' ? 'Go to Dashboard' : 'Go to Home'}
      </Link></div>
    </div>
  )
}

export default Error403
