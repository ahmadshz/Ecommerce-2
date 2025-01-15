import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { baseUrl } from '../../../Api/Api';
import { useNavigate } from 'react-router-dom';
import { MdOutlineClose } from 'react-icons/md';

const Search = () => {
    const [products, setProducts] = useState([]); // Stores all products
    const [search, setSearch] = useState(''); // Stores search input
    const [filterProducts, setFilterProducts] = useState([]); // Stores filtered products

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products from API
        axios.get(`${baseUrl}/products`)
            .then((res) => setProducts(res.data));
    }, []);

    // Handle Search Input Changes
    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearch(searchValue);

        if (searchValue) {
            // Filter products based on title and set the filtered products
            const filterSearch = products.filter((pro) =>
                pro.title.toLowerCase().includes(searchValue)
            );
            setFilterProducts(filterSearch);
        } else {
            setFilterProducts([]);
        }
    };

    const navigateToProduct = (id) => {
        navigate(`/product/${id}`)
        setFilterProducts([])
        setSearch('')
    }

    const closeSearch = () => {
        setSearch('')
        setFilterProducts([])
    }

    return (
        <div className='z-2' style={{ position: 'relative', maxWidth: '500px', height: '40px', margin: 'auto' }}>
            <input
                type='search'
                value={search}
                onChange={handleSearchChange} // Update search term and filter products
                className='w-100 h-100 rounded-pill border-0 px-3'
                placeholder='Search'
                style={{ outline: 'none' }}
            />
            {
                search.length === 0 ? (<BsSearch className='position-absolute bg-white' style={{ top: '11px', right: '15px', color: 'gray' }} />
                ) : (<MdOutlineClose
                    onClick={closeSearch}
                    className='position-absolute bg-white text-danger'
                    style={{ top: '11px', right: '15px', color: 'gray' }} />)
            }

            {/* Display filtered products only when the user searches */}
            {search && (
                <div>
                    {filterProducts.length > 0 ? (
                        <div
                            className='p-3 bg-white border rounded shadow overflow-y-auto mt-3'
                            style={{
                                maxHeight: '400px',
                            }}
                        >
                            {filterProducts.map((product, index) => (
                                <div
                                    key={index}
                                    className='p-3 mx-2 border-bottom row align-items-center'
                                >
                                    <div onClick={() => navigateToProduct(product.id)} className='link text-dark row align-items-center' >
                                        <div className='col-4 '  >
                                            <img style={{ height: '70px', width: '70px' }}
                                                src={product.images.length > 0 ?
                                                    'https://backend2-production-f688.up.railway.app' + product.images[0].image :
                                                    'https://backend2-production-f688.up.railway.app' + product.images}
                                                alt={product.title} />
                                        </div>
                                        <div className='col-7'> {product.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='p-3 bg-white border rounded shadow mt-2' >
                            No products found
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
