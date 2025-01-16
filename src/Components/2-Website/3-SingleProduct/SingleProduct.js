import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './SingleProduct.css'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skeleton from 'react-loading-skeleton';
import { CartContext } from '../../../Context/CartChangeContext';
import Navbar from '../1-Navbar/Navbar';
import Footer from '../8-Footer/Footer';
import { FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';
import { baseUrl } from '../../../Api/Api';

const SingleProduct = () => {
  // State
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  // State

  // Context ShoppingCart
  const { addToCart } = useContext(CartContext)

  // increment quantity
  const increment = () => {
    setQuantity((prev) => prev + 1)
  }

  // decrement quantity 
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // Add product to cart with selected quantity

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, quantity: 1 });
    }
  };
  // Start Show Stars
  const roundStar = Math.round(product.rating)
  const stars = Math.min(roundStar, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, key) => (
    <FontAwesomeIcon key={key} icon={faStar} style={{ color: '#FF7F00' }} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <i key={index} class="fa-regular fa-star" style={{ color: '#FF7F00' }}></i>
  ));

  // Params
  const { id } = useParams();

  // Show Single product image and title...
  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get(`${baseUrl}/product/${id}`)
      .then((response) => {
        setImages(response.data[0].images.map((item) => {
          return { original: 'https://backend2-production-f688.up.railway.app' + item.image, thumbnail: 'https://backend2-production-f688.up.railway.app' + item.image }
        }))
        setProduct(response.data[0])
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [id]);

  const goBack = () => {
    window.history.back()
  }

  return (
    <div >
      <Navbar />
      <div className='d-flex flex-column justify-content-center align-content-center position-relative' style={{ minHeight: '85vh' }}>
        <FaArrowLeft className='position-absolute top-0 mt-2 mt-md-5 end-0 me-2 me-md-5 fs-1 fs-md-4'  onClick={goBack} />
        {
          loading ?
            ///////////// Start Show Skelton
            <div className=' d-flex flex-column justify-content-center align-items-center flex-md-row gap-2 m-3' >
              {/*  Sketlonn to image */}
              <div className='col-12 col-md-4 d-flex  align-items-center flex-column'>
                <Skeleton style={{ width: 250, height: 250 }} />
                <div className='d-flex gap-1 justify-content-center '>
                  <Skeleton style={{ width: 100, height: 120 }} />
                  <Skeleton style={{ width: 100, height: 120 }} />
                </div>
              </div>
              {/*  Sketlonn to details product */}
              <div className='col-12 col-md-5' >
                <div className='mx-2 my-5'>
                  <Skeleton className='mb-2' width={100} height={40} />
                  <Skeleton width={'50%'} height={25} />
                  <Skeleton className='mt-3' width={'70%'} height={25} />
                  <div className="border-top mt-4 pt-3">
                    <div className="mb-2">
                      <Skeleton width={120} height={20} />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2">
                        <Skeleton width={30} height={20} />
                        <Skeleton width={30} height={20} />
                      </div>
                      <div className='d-flex gap-2'>
                        <Skeleton width={50} height={50} />
                        <Skeleton width={50} height={50} />
                        <Skeleton width={50} height={50} />
                      </div>
                    </div>
                    <Skeleton height={40} className='mt-4 w-100 rounded-pill ' />
                  </div>
                </div>
              </div>

            </div>
            ///////////// End Show Skelton
            : (
              ///////////// Start Show SingleProduct
              <div className='d-flex justify-content-center flex-column flex-lg-row gap-3 m-3 mt-5' >
                <div className='col-12 col-lg-5 mt-3 '>
                  <ImageGallery items={images} />
                </div>
                <div className='col-12 col-lg-6' >
                  <div className='mx-2 my-5'>
                    <h1 className="text-start">{product.title}</h1>
                    <p className="text-muted">{product.About}</p>
                    <h4>{product.description}</h4>
                    <div className="border-top mt-4 pt-3">
                      <div className="mb-2">
                        {showGoldStars}
                        {showEmptyStars}
                      </div>
                      <div className="d-flex justify-content-between align-items-center flex-xs-column flex-wrap gap-3 ">
                        <div className="d-flex gap-2 w-xs-50 ">
                          <span className="fw-bold text-warning">{product.discount}$</span>
                          <span className="fw-bold text-muted text-decoration-line-through">{product.price}$</span>
                        </div>
                        <div className='d-flex  align-items-center'>
                          <div className='d-flex align-items-center gap-2  '>
                            <FaMinus size={20} className='text-bg-success p-3 ' style={{ width: '50px', height: '50px' }} onClick={decrement} />
                            <span className='fw-bold fs-4 mx-2'>{quantity}</span>
                            <FaPlus size={20} className='text-bg-danger p-3 ' style={{ width: '50px', height: '50px' }} onClick={increment} />
                          </div>

                        </div>
                      </div>
                      <div onClick={handleAddToCart} className="button add-cart my-4 p-2 rounded-pill text-center  fw-bold fs-5 ">
                        Add Cart
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ///////////// End Show SingleProduct
            )}
      </div>
      <Footer />
    </div>
  );
}

export default SingleProduct;
