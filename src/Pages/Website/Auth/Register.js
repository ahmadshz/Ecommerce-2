import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { REGISTER, baseUrl } from '../../../Api/Api'
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../../css/Components/Loading/Loading';
import Cookie from 'cookie-universal'
import { Container, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FaArrowRightLong } from 'react-icons/fa6';

const Register = () => {
  const focus = useRef('')

  const navigate = useNavigate();
  // States
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  // Cookie
  const cookie = Cookie();

  // Loading
  const [loading, setLoading] = useState(false)
  // Error
  const [err, setErr] = useState('')
  // Handle form chanage
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    focus.current.focus()
  }, [])
  // handleSubmit
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/${REGISTER}`, form)
      setLoading(false)
      const token = res.data.token
      const role = res.data.user.role
      const go = role === '1995' ? '/dashboard/users' : '/'
      cookie.set("e-commerce", token)
      navigate(`${go}`)
    } catch (err) {
      setLoading(false)
      if (err.response.status === 422) {
        setErr('Email is already been taken ')
      } else {
        setErr('Internal server ERROR')
      }
    }
  }

  return (
    <div className='row d-flex justify-content-center align-items-center ' style={{ height: '100vh' }}>
      {loading && <Loading />}
      <div className='  col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3  ' >
        <Form onSubmit={handleSubmit} className='shadow p-4 rounded shadow rounded'>
          <h1 className='text-center mt-2'>Sign Up</h1>
          <Form.Label >Name </Form.Label>
          <Form.Group className='mb-3 '
            controlId="exampleForm.ControlInput1">
            <Form.Control type="text"
              placeholder="Enter Your Name..."
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              ref={focus}
              minLength={2} />
          </Form.Group>
          <Form.Label >Email </Form.Label>
          <Form.Group className='mb-3'
            controlId="exampleForm.ControlInput1">
            <Form.Control type="email"
              placeholder="Enter Your Email..."
              name='email'
              value={form.email}
              onChange={handleChange}
              required />
          </Form.Group>
          <Form.Label  >Password: </Form.Label>
          <Form.Group className='mb-3 '
            controlId="exampleForm.ControlInput1">
            <Form.Control type="password"
              placeholder="Enter Your Password..."
              name='password'
              value={form.password}
              onChange={handleChange}
              minLength={8}
              required />
          </Form.Group>
          <div className=' '>
            <div className='d-flex align-items-center flex-column mb-4'>
              <button className='btn btn-primary w-100' >Register</button>
              <a
                href="https://backend2-production-f688.up.railway.app/login-google"
                className="btn btn-light w-100 py-2 my-3 d-flex justify-content-center align-items-center rounded"
                style={{ textDecoration: 'none' }}


              >
                <FontAwesomeIcon icon={faGoogle} className="mx-2" />
                Log In with Google
              </a>
            </div>
            {err !== '' && <span className='error'>{err}</span>}</div>
          <div className='d-flex justify-content-center  mb-4 '>
            <Link className='fw-bold text-center'  to='/' >Go to Home <FaArrowRightLong /> </Link>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <span className="text-muted">Already have an account? </span>
            <Link to="/login" className="fw-bold ms-2" style={{ color: '#007bff' }}>
              Log In
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register
