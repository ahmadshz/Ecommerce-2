import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import ProductWeb from '../../../../Components/2-Website/5-CardProduct/ProductWeb';
import Skeleton from 'react-loading-skeleton';
import { baseUrl } from '../../../../Api/Api';

const ProductSale = () => {
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${baseUrl}/latest-sale`)
        .then((res) => setProduct(res.data))
        .finally(() => setLoading(false));
    }, []);

    const productsShow = useMemo(() => 
        products.map((product) => (
            <ProductWeb 
                key={product.id}
                id={product.id}
                img={product.images && product.images.length > 0 ? product.images[0].image : product.images}
                title={product.title}
                desc={product.description}
                sale
                rating={product.rating}
                price={product.price}
                discount={product.discount}
                product = {product}
            />
        )), [products]);

        console.log(products)

    return (
        <div className='m-5'>
            <h1 className='text-center mt-5'>Latest Products Sales</h1>
            <div className='my-5 d-flex justify-content-center align-items-center flex-wrap'>
                {loading ? (
                    <div className='d-flex justify-content-center align-items-center flex-wrap'>
                        {[...Array(5)].map((_, index) => (
                            <Skeleton key={index} className='mt-4 mx-3 shadow' width='18rem' height='400px' />
                        ))}
                    </div>
                ) : (productsShow)}
            </div>
        </div>
    );
}

export default ProductSale;
