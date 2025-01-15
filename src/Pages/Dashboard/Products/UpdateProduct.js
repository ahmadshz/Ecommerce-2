/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Cookie from 'cookie-universal'
import Loading from '../../../css/Components/Loading/Loading'
import { baseUrl, CAT } from '../../../Api/Api'
import { useNavigate, useParams } from 'react-router-dom'
import { TiDelete } from "react-icons/ti";
import './product.css'


const UpdateProduct = () => {
    const nav = useNavigate()

    // focus
    const openImage = useRef('')
    const progress = useRef([])
    const ids = useRef([])

    // States
    const [form, setForm] = useState({
        category: "Select Category",
        title: "",
        description: "",
        price: "",
        discount: "",
        About: "",
        stock: "",
    })
    const [images, setImages] = useState([])
    const [pictures, setPictures] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [idPictures, setIdPictures] = useState([])


    // Params
    const {id} = useParams()

    // //Cookie
    const cookie = Cookie()
    const token = cookie.get('e-commerce')

    const handleOpenImage = () => {
        openImage.current.click()
    }

    // Get Categories
    useEffect(() => {
        axios.get(`${baseUrl}/${CAT}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => setCategories(response.data))
            .catch((error) => console.log(error));
    }, []);

    // Get Data
    useEffect(() => {
       axios.get(`${baseUrl}/product/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          )
            .then((data) => {
                setForm(data.data[0])
                setPictures(data.data[0].images)

            })
           
            .catch((error) => console.log(error));

    }, [])

    // Handle Change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            for (let i = 0; i < idPictures.length; i++) {
                await axios.delete(`https://backend2-production-f688.up.railway.app/api/product-img/${idPictures[i]}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
    
          await axios.post(
                `https://backend2-production-f688.up.railway.app/api/product/edit/${id}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            nav('/dashboard/product');
        } catch (err) {
            setLoading(false);
            console.error("Error:", err.response?.data || err.message);
        }
    };
    
    // Handle  Delete Image
    const handleDeleteImage = async (id, img) => {
        const findId = ids.current[id]
        try {
            await axios.delete(`${baseUrl}/product-img/${findId}`
            )
            setImages((prev) => prev.filter((image) => image !== img));
            ids.current = ids.current.filter((i) => i !== findId)
            j.current--
        }
        catch (err) {
            console.log(err)
        }
    }
    // Handle  Picture Image
    const handlePictureChange = async (id) => {
        setPictures((prev) => prev.filter((img) => img.id !== id))
        setIdPictures((prev) => { return [...prev, id] })
    }

    // Ref
    const j = useRef(-1)

    // Handle Images Change
    // Handle Images Change
const handleImageChange = async (e) => {
    setImages((prev) => [...prev, ...e.target.files]);

    const imagesFiles = e.target.files;
    const data = new FormData();

    for (let i = 0; i < imagesFiles.length; i++) {
        j.current++;
        data.append('image', imagesFiles[i]);
        data.append('product_id', id);

        try {
            const res = await axios.post(
                `${baseUrl}/product-img/add`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    onUploadProgress: (progressEvent) => {
                        const { loaded, total } = progressEvent;
                        const percent = Math.floor((loaded * 100) / total);
                        progress.current[j.current].style.width = `${percent}%`;
                        progress.current[j.current].setAttribute('percent', `${percent}%`);
                    },
                }
            );

            ids.current[j.current] = res.data.id;
        } catch (err) {
            console.log(err)
        } 
    }
};
    // Mapping
    const categoriesShow = categories.map((item, key) => (
        <option key={key} value={item.id} >{item.title}</option>
    ))

    const imagesShow = images.map((imgs, key) => (
        <div className=' m-2 border w-100 p-2'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center gap-2'>
                    <img src={URL.createObjectURL(imgs)} alt='' width='80px' height='80px' />
                    <div >
                        <p className='mb-1'>{imgs.name}</p>
                        <p >{imgs.size / 1025 < 900
                            ? (imgs.size / 1025).toFixed(2) + 'KB'
                            : (imgs.size / (1025 * 1025)).toFixed(2) + 'MB'}</p>
                    </div>
                </div>
                <Button variant='danger'
                    onClick={() => handleDeleteImage(key, imgs)}
                    style={{ width: '100px', marginBottom: '30px', fontSize: '15px' }}>Delete</Button>
            </div>
            <div className='custom-progress'>
                <span
                    ref={(e) => (progress.current[key] = e)}
                    className='inner-progress'></span>
            </div>
        </div>
    ))

    const picturesShow = pictures.map((imgs, key) => (
        <div key={key} className=' m-2 border p-4 position-relative'>
            <div >
                <img src={'https://backend2-production-f688.up.railway.app' + imgs.image} alt='' width='80px' height='80px' />
            </div>
            <div style={{ cursor: 'pointer', color: 'red',right:'0' ,top:'-5px' }} className='position-absolute  fw-bold fs-4  '>
                <p onClick={() => handlePictureChange(imgs.id)}><TiDelete /></p>
            </div>
        </div>
    ))

    return (
        <div>
            {loading && <Loading />}
            <div className='bg-white px-2 px-md-5 py-3 w-100  rounded'>
                <Form className='bg-white  w-100 p-3 mx-1' onSubmit={handleEdit}>
                    {/* Category */}
                    <Form.Group className="mb-3" controlId="Category">
                        <Form.Label><h5> Category</h5></Form.Label>
                        <Form.Select className="mb-3"
                            aria-label="Default select example"
                            name='category'
                            value={form.category}
                            onChange={handleChange}
                            required
                        >
                            <option disabled>Select Category</option>
                            {categoriesShow}
                        </Form.Select>
                    </Form.Group>
                    {/* Title */}
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label><h5> Title</h5></Form.Label>
                        <Form.Control
                            name='title'
                            value={form.title}
                            onChange={handleChange}
                            className='p-3' type="text" placeholder="Name..."
                            required
                        />
                    </Form.Group>
                    {/* Description */}
                    <Form.Group className="mb-3" controlId="Description">
                        <Form.Label><h5> Description</h5></Form.Label>
                        <Form.Control
                            name='description'
                            value={form.description}
                            onChange={handleChange}
                            className='p-3' type="text" placeholder="Description..."
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Price">
                        <Form.Label><h5> Price</h5></Form.Label>
                        <Form.Control
                            name='price'
                            value={form.price}
                            onChange={handleChange}
                            className='p-3' type="text" placeholder="Price..."
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Discount">
                        <Form.Label><h5> Discount</h5></Form.Label>
                        <Form.Control
                            name='discount'
                            value={form.discount}
                            onChange={handleChange}
                            className='p-3' type="text" placeholder="Discount..."
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="About">
                        <Form.Label><h5> About</h5></Form.Label>
                        <Form.Control
                            name='About'
                            value={form.About}
                            onChange={handleChange}
                            className='p-3' type="text" placeholder="About..."
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label><h5> Stock</h5></Form.Label>
                        <Form.Control
                            name='stock'
                            value={form.stock}
                            onChange={handleChange}
                            className='p-3' type="text" placeholder="stock..."
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label ><h5> Image</h5></Form.Label>
                        <Form.Control type="file"
                            ref={openImage}
                            hidden
                            multiple
                            onChange={handleImageChange} />
                    </Form.Group>
                    <div className='  gap-2 p-2   mb-2 rounded-2'
                        onClick={handleOpenImage}
                        style={{
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                            border: '2px dashed #337891',
                            cursor: 'pointer'
                        }}
                    >
                        <img src={require('../../../css/assets/images/upload.png')}
                            alt='' width='100px' />
                        <h5 className='fw-bold' style={{ color: '#337891' }}>Click here to upload image</h5>
                    </div>
                    <div className='d-flex align-items-center flex-wrap'>
                        {picturesShow}
                    </div>
                    <div>
                        {imagesShow}
                    </div>
                    <button className='buttn buttn-primary ' style={{ backgroundColor: '#337891' }}>Save</button>
                </Form>
            </div></div>
    )
}

export default UpdateProduct
