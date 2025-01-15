import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { LOGIN, baseUrl } from '../../../Api/Api'
import Loading from '../../../css/Components/Loading/Loading';
import { Button, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
  // States
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  //useRef
  const focus = useRef('')

  // Navigate
  const navigate = useNavigate()

  //Cookies
  const cookie = new Cookies()

  // Handle form chanage
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //Handle focus
  useEffect(() => {
    focus.current.focus()
  }, [])

  // handleSubmit
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      let res = await axios.post(`${baseUrl}/${LOGIN}`, form)
      setLoading(false)
      const token = res.data.token;
      const role = res.data.user.role;
      const go = role === '1995' ? '/dashboard/users' : '/'
      cookie.set('e-commerce', token)
      navigate(`${go}`)
    } catch (err) {
      setLoading(false)
      if (err.response.status === 401) {
        setErr('Wrong Email or Password')
      } else {
        setErr('Internal Server Error')
      }
    }
  }

  return (
    <div className='row justify-content-center align-items-center ' style={{ height: '100vh' }}>
      {loading && <Loading />}
      <div className=" col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 " >
        <Form className=" shadow p-4 rounded " onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">Log In</h1>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              ref={focus}
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              required
              className="form-control"
            />
          </Form.Group>

          <div className="d-flex flex-column align-items-center mb-4">
            <button  className="btn btn-primary w-100 mb-3 py-2 rounded">
              Log In
            </button>

            <a
              href="https://backend2-production-f688.up.railway.app/login-google"
              className="btn btn-light w-100 py-2 mb-3 d-flex justify-content-center align-items-center rounded"
              style={{ textDecoration: 'none' }}
            >
              <FontAwesomeIcon icon={faGoogle} className="mx-2" />
              Log In with Google
            </a>

            {err && <span className="error text-danger">{err}</span>}
          </div>

          <div className="d-flex justify-content-center mt-3">
            <Link className="fw-bold " to="/" style={{color:'#007bff'}}>
              Go to Home <FaArrowRightLong />
            </Link>
          </div>

          <div className="d-flex justify-content-center mt-2">
            <Link className="fw-bold text-muted" to="/password-reset">
              Forgotten Password?
            </Link>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <span className="text-muted">Don't have an account? </span>
            <Link to="/register" className="fw-bold ms-2" style={{ color: '#007bff' }}>
              Sign Up
            </Link>
          </div>

        </Form>
      </div>
    </div>
  )
}

export default LogIn
