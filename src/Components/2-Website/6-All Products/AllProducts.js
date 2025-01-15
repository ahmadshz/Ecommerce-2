import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl, PRODUCTS } from '../../../Api/Api'
import Navbar from '../1-Navbar/Navbar'
import Footer from '../8-Footer/Footer'
import ProductWeb from '../5-CardProduct/ProductWeb'
import Skeleton from 'react-loading-skeleton'

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 10

    const totalPages = Math.ceil(products.length / productsPerPage)

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    useEffect(() => {
        axios.get(`${baseUrl}/${PRODUCTS}`)
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Error fetching products:', error))
            .finally(() => setLoading(false))
    }, [])

    const showCategories = currentProducts.map((pro) => (
        <div>
            <div>
                <ProductWeb
                    id={pro.id}
                    img={pro.images && pro.images.length > 0 ? pro.images[0].image : ''}
                    title={pro.title}
                    desc={pro.description}
                    rating={pro.rating}
                    price={pro.price}
                    discount={pro.discount}
                    product = {pro}

                />
            </div>
        </div>
    ))

    const paginationControls = (
        <div className="pagination-controls d-flex justify-content-center my-3">
            <button
                className="btn mx-1"
                style={{ backgroundColor: '#172856', color: 'white', transition: '.3s' }}

                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
            >
                Previeus
            </button>
            {
                Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className="border rounded-circle mx-1 d-flex justify-content-center align-items-center"
                        style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: currentPage === index + 1 ? '#172856' : 'white',
                            color: currentPage === index + 1 ? 'white' : '#172856',
                            transition: '.3s'
                        }}
                    >
                        {index + 1}
                    </button>
                ))
            }

            <button
                className="btn  mx-1"
                style={{ backgroundColor: '#172856', color: 'white', transition: '.3s' }}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    )

    return (
        <div>
            <Navbar />
            <div className='position-relative py-5' style={{ minHeight: '80vh' }}>
                <div className='d-flex align-items-center justify-content-center flex-wrap gap-2'>
                    {
                        loading && <div className='d-flex gap-2'>
                            <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='400px' />
                            <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='400px' />
                            <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='400px' />
                            <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='400px' />
                            <Skeleton className=' mt-4 mx-3 shadow mb-5' width='18rem' height='400px' />
                        </div>
                    }
                    {showCategories}
                </div>
                <div className='position-absolute  w-100 text-center  ' style={{ bottom: '10px' }}>
                    {paginationControls}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AllProducts
