import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductWeb from '../../../../Components/2-Website/5-CardProduct/ProductWeb';
import Skeleton from 'react-loading-skeleton';

const TopRatedProduct = () => {
  // State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)

  // Get Product has top rated
  useEffect(() => {
    axios.get(`https://backend2-production-f688.up.railway.app/api/top-rated`)
      .then((data) => setProducts(data.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))

  }, []);

  

  // Show Product Cart
  const showTopRated = products.map((product, key) => (
    <ProductWeb
      id={product.id}
      key={key}
      img={product.images && product.images.length > 0 ? product.images[0].image : product.images}
      title={product.title}
      desc={product.description}
      rating={product.rating}
      price={product.price}
      discount={product.discount}
      product={product}
    />
  ));

  console.log(products)
  return (
    <div className=' m-4 shadow rounded'>
      <div className='w-100  text-white '>
        <h1 style={{ backgroundColor: '#172856' }} className='title text-center p-2 rounded-top'>Top Rated</h1>
      </div>
      <div className='d-flex p-3 Top-rated-scroll' >
        {
          loading ?
            <div className='d-flex'>
              <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='400px' />
              <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='400px' />
              <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='400px' />
              <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='400px' />
              <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='400px' />
            </div>
            :
            showTopRated
        }
      </div>
    </div>
  );
};

export default TopRatedProduct;
