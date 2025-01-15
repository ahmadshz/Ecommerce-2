import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import Cookie from 'cookie-universal'
import Loading from '../../../css/Components/Loading/Loading'
import { baseUrl, USER } from '../../../Api/Api'

const UpdateUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  //Cookie
  const cookie = Cookie()
  const token = cookie.get('e-commerce')


  // Handle Submit
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      window.location.pathname = '/dashboard/users';
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <div className='bg-white px-2 px-md-5 py-3 w-100  rounded'>
        <Form onSubmit={handleSubmit} className='bg-white  w-100 p-3 mx-1'>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label><h5> User Name</h5></Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='p-3' type="text" placeholder="Name..." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label><h5>Email</h5></Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='p-3' type="email" placeholder="Email..." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label><h5>Password</h5></Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='p-3' type="password" placeholder="Password..." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label><h5>Role</h5></Form.Label>
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value)}>
              <option  value="">Select Role</option>
              <option value="1995" >Admin</option>
              <option value="2001" >User</option>
              <option value="1999" >Products Manger</option>
            </Form.Select>
          </Form.Group>
          <button  className='buttn buttn-primary ' style={{ backgroundColor: '#337891' }}>Save</button>
        </Form>
      </div>
      </div>
  )
}

export default UpdateUser
