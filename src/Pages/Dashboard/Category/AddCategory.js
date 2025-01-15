import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import Cookie from 'cookie-universal'
import Loading from '../../../css/Components/Loading/Loading'
import { baseUrl, CATEGORY } from '../../../Api/Api'


const AddCategory = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const focus = useRef('')

  //Cookie
  const cookie = Cookie()
  const token = cookie.get('e-commerce')

  // handle focus
  useEffect(() => {
    focus.current.focus()
  })

  const Submit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append('title', title);
    form.append('image', image);
    try {
      await axios.post(`${baseUrl}/${CATEGORY}/add`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      window.location.pathname = '/dashboard/Categories';
    } catch (err) {
      setLoading(false);

    }
  };

  return (
    <div>
      {loading && <Loading />}
      <div className='bg-white px-2 px-md-5 py-3 w-100  rounded'>
        <Form onSubmit={Submit} className='bg-white  w-100 p-3 mx-1'>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label><h5> Title</h5></Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='p-3' type="text" placeholder="Name..."
              ref={focus}
              required />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label><h5> Image</h5></Form.Label>
            <Form.Control type="file"

              onChange={(e) => setImage(e.target.files.item(0))} />
          </Form.Group>
          <button disabled={title.length > 1 ? false : true} className='buttn buttn-primary ' style={{ backgroundColor: '#337891' }}>Save</button>
        </Form>
      </div>
      </div>
  )
}

export default AddCategory
