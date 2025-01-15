import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

import { useParams } from 'react-router-dom'
import Cookie from 'cookie-universal'
import { baseUrl, CATEGORY } from '../../../Api/Api'
import Loading from '../../../css/Components/Loading/Loading'

const EditCategory = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [disable, setDisable] = useState(true)
  const [loading, setLoading] = useState(false)


  //Cookie
  const cookie = Cookie()
  const token = cookie.get('e-commerce')

  const { id } = useParams()

  // Get CAtegory
  useEffect(() => {
    setLoading(true)
    axios.get(`${baseUrl}/${CATEGORY}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
      .then((data) => {
        setTitle(data.data.title)
        setLoading(false)
      })
      .then(() => setDisable(false))
      .catch((err) => console.log(err));
  }, [])

  // Handle Submit
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const form = new FormData()
    form.append('title', title)
    form.append('image', image)
    try {
      await axios.post(`${baseUrl}/category/edit/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      window.location.pathname = '/dashboard/categories';
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='p-3' type="text" placeholder="Name..." />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label><h5> Image</h5></Form.Label>
            <Form.Control type="file"
              onChange={(e) => setImage(e.target.files.item(0))} />
          </Form.Group>
          <button disabled={disable} className='buttn buttn-primary ' style={{ backgroundColor: '#337891' }}>Save</button>
        </Form>
      </div></div>
  )
}

export default EditCategory
