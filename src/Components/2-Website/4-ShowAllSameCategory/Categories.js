import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl, PRODUCTS } from '../../../Api/Api';
import ProductWeb from '../5-CardProduct/ProductWeb';
import Skeleton from 'react-loading-skeleton';
import Navbar from '../1-Navbar/Navbar';
import Footer from '../8-Footer/Footer';


const Categories = () => {
  // State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Params
  const { id } = useParams();

  // Get all products
  useEffect(() => {
    axios.get(`${baseUrl}/${PRODUCTS}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  // Filter Products
  const productFilter = products.filter((product) => product.category == id)

  // Show Products 
  const allProductShow = productFilter.map((pro) => (
    <div>
      <ProductWeb
        key={pro.id}
        id={pro.id}
        img={pro.images && pro.images.length > 0 ? pro.images[0].image : pro.images}
        title={pro.title}
        desc={pro.description}
        rating={pro.rating}
        price={pro.price}
        discount={pro.discount}
        product={pro}
      />
    </div>
  ))

  return (
    <div >
      <Navbar />
      <div className='d-flex justify-content-center align-items-center flex-wrap mt-5 ' style={{ minHeight: '80vh' }}>
        {
          loading ?
            <div className='d-flex justify-content-center flex-wrap gap-3'>
              <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='45vh' />
              <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='45vh' />
              <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='45vh' />
              <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='45vh' />
              <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='45vh' />
            </div>
            :
            allProductShow
        }
      </div>
      <Footer />
    </div>


  );
}

export default Categories;
