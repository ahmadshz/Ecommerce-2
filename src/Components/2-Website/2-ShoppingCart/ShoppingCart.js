import React, { useContext, useState } from 'react';
import { Offcanvas, Row, Col } from 'react-bootstrap';
import { MdDeleteOutline, MdOutlineShoppingCart } from 'react-icons/md';
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartContext } from '../../../Context/CartChangeContext';
import { Link, useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    // State
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    // context cart
    const { cart, removeFromCart, clearAllCart, increment, decrement } = useContext(CartContext);
    // Show && Close shopping cart
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Show price all product in shopping cart 
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const goToProduct = (id) => {
        window.scroll(0, 0)
        navigate(`/product/${id}`)
    }

    return (
        <div>
            <div
                onClick={handleShow}
                className="position-relative"
                style={{ cursor: 'pointer' }}
            >
                <MdOutlineShoppingCart size={25} color="white"  />
                <div
                    className="bg-danger rounded-circle px-1 text-light  position-absolute "
                    style={{ top: '-11px', right: '-6px' }}
                >
                    {cart.length}
                </div>
            </div>

            <Offcanvas style={{ width: '430px' }} show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header className='border-bottom' closeButton>
                    <Offcanvas.Title>
                        Shopping Cart ({cart.length})
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >
                    {
                        cart.length > 0 ? (
                            <div>
                                {cart.map((item) => (
                                    <div key={item.id}  >

                                        <Row
                                            className="mb-3 border-bottom mx-md-2 gap-2 pb-3"
                                        >
                                            <Col xs={3}>
                                                <img
                                                    src={'https://backend2-production-f688.up.railway.app' + item.images[0].image}
                                                    alt={item.title}
                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                    }}
                                                />
                                            </Col>
                                            <Col xs={8}>
                                                <div className='d-flex justify-content-between'>
                                                    <div onClick={() => goToProduct(item.id)} className='text-dark fw-medium' style={{ cursor: 'pointer' }}>{item.title}</div>
                                                    <IoCloseCircleOutline onClick={() => removeFromCart(item.id)}
                                                        size={25}
                                                        color='red'
                                                    />
                                                </div>
                                                <div className="text-muted">
                                                    {item.description.slice(0, 50)}...
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center ">
                                                    <div>
                                                        <span className='text-success '>${item.price ? Number(item.price).toFixed(1) : '0.00'}
                                                        </span>
                                                        <span className='text-dark mx-2 fw-bold'> ${(item.price * item.quantity).toFixed(1)}</span>
                                                    </div>
                                                    <div className='d-flex align-items-center gap-2  '>
                                                        <FaMinus size={30} className='text-bg-success p-2' onClick={() => decrement(item.id)} />
                                                        <span className='fw-bold '>{item.quantity}</span>
                                                        <FaPlus size={30} className='text-bg-danger p-2' onClick={() => increment(item.id)} />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div >
                                        Total Price : <span className='fw-bold'>${totalPrice.toFixed(1)}</span>
                                    </div>
                                    <MdDeleteOutline onClick={clearAllCart} color='red' size={27} />
                                </div>
                            </div>
                        )
                            : (
                                <div className="text-center mt-5">
                                    <h4>Your cart is empty!</h4>
                                </div>
                            )}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default ShoppingCart;
