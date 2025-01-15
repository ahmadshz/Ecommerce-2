import React, { useEffect, useState } from 'react';
import Cookie from 'cookie-universal';
import axios from 'axios';
import ProductWeb from '../../../../Components/2-Website/5-CardProduct/ProductWeb';
import Skeleton from 'react-loading-skeleton';
import { baseUrl } from '../../../../Api/Api';
const LatestProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading , setLoading] = useState(true)

  const cookie = Cookie();
  const token = cookie.get('e-commerce');


  useEffect(() => {
    axios.get(`${baseUrl}/latest`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((data) => setProducts(data.data))
      .finally(() => setLoading(false))
  }, [token]);

  const showLatestProduct = products.map((product, key) =>
  (<ProductWeb key={key}
    id={product.id}
    img={product.images && product.images.length > 0 ? product.images[0].image : product.images}
    title={product.title}
    desc={product.description}
    rating={product.rating}
    price={product.price}
    discount={product.discount}
    product={product}
    />))
  return (
    <div className='mt-5' >
      <h1 className='text-center' style={{ fontWeight: '600px' }}> Latest Products</h1>
      <div className='m-5 d-flex justify-content-center flex-wrap '>
        {loading ? 
          <div className=' d-flex justify-content-center flex-wrap ' >
          <Skeleton className=' mt-4 mx-3 shadow' width='18rem' height='400px'/>
          <Skeleton className=' mt-4 mx-3 shadow' width='18rem' height='400px'/>
          <Skeleton className=' mt-4 mx-3 shadow' width='18rem' height='400px'/>
          <Skeleton className=' mt-4 mx-3 shadow' width='18rem' height='400px'/>
          <Skeleton className=' mt-4 mx-3 shadow' width='18rem' height='400px'/>      
          </div>
          : 
          showLatestProduct}
      </div>
    </div>
  )
}

export default LatestProduct
