import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Card } from 'react-bootstrap'
import { CartContext } from '../../../Context/CartChangeContext'
import { Link } from 'react-router-dom'


const ProductWeb = (props) => {
    // Context shopping cart
    const {addToCart} = useContext(CartContext)

    // Show stars
    const roundStar = Math.round(props.rating)
    const stars = Math.min(roundStar, 5);
    const showGoldStars = Array.from({ length: stars }).map((_, key) => (
        <FontAwesomeIcon key={key} icon={faStar} style={{ color: '#FF7F00' }} />
    ));

    // show empty stars
    const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
        <i key={index} className="fa-regular fa-star" style={{ color: '#FF7F00' }}></i>
    ));

    return (
        <div>
            <Card
                style={{
                    width: '18rem',
                }}
                className='m-3 mb-5 p-4 ' >
                {props.sale &&
                    <p className='m-0  position-absolute   rounded-circle  text-white d-inline-block px-2 '
                        style={{ width: '50px', height: '50px', lineHeight: '50px', backgroundColor: '#FF7F00', top: 10, left: 5 }}>Sale</p>
                }
                <Link to={`/product/${props.id}`}>
                <Card.Img
                    style={{ height: '200px', width: '100%', objectFit: 'fill' }}
                    variant="top" src={'https://backend2-production-f688.up.railway.app' + props.img} />
                    </Link>
                <Card.Body >
                    <Card.Title>{props.title.length > 20 ? props.title.slice(0, 18) + '...' : props.title}</Card.Title>
                    <Card.Text>
                        {props.desc.length > 34 ? props.desc.slice(1, 34) + '...' : props.desc}
                    </Card.Text>
                    <div  >
                        <div>
                            {showGoldStars}
                            {showEmptyStars}
                        </div>
                        <div className='d-flex justify-content-between align-items-center '>
                            <div className='d-flex gap-2'>
                                <span style={{ fontWeight: 'bold', color: '#FF7F00' }}>{props.discount}$</span>
                                <span style={{ fontWeight: 'bold', color: 'gray', textDecoration: 'line-through' }}>{props.price}$</span>
                            </div>
                            <div onClick={() => addToCart(props.product , 1)} className='button add-cart border rounded p-2' >
                                Add Cart
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>

        </div>

    )
}

export default ProductWeb
