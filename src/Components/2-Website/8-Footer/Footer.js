import React from 'react'
import { Container } from 'react-bootstrap'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6'
import { CgMail } from "react-icons/cg";
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="shadow" style={{ backgroundColor: '#172856', color: 'white' }}>
            <div className="d-flex flex-column mx-auto py-4" style={{ width: '90%' }}>
                <Container className="d-flex justify-content-around flex-wrap">
                    <div>
                        <a href="/" >
                            <h4 className=" text-white text-center text-md-start ">About Us</h4>
                        </a>
                        <p className="my-3 text-center text-md-start" style={{ width: '250px' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </p>
                    </div>
                    <div>
                        <h4 className=" mb-4 " >
                            Contact
                        </h4>
                        <div className='d-flex flex-column  gap-2 ' style={{ cursor: 'pointer', padding: '0' }}>
                            <a className='d-flex align-items-center gap-2' style={{ color: "white" }} href="https://github.com/ahmadshz">
                                <div className='  rounded-circle d-flex align-items-center justify-content-center' style={{ backgroundColor: 'black', width: '35px', height: '35px' }}>
                                    <FaGithub style={{fontSize:'18px'}}/>
                                </div>
                                ahmadshz</a>
                            <a className='d-flex align-items-center gap-2' style={{ color: "white" }} href="mailto:shmeitahmad3@gmail.com">
                                <div className=' rounded-circle d-flex align-items-center justify-content-center' style={{ backgroundColor: 'black', width: '35px', height: '35px' }}>
                                <CgMail style={{fontSize:'20px'}} />
                                </div>
                                shmeitahmad3@gmail.com</a>
                            <a className='d-flex align-items-center gap-2' style={{ color: "white" }} href="https://www.instagram.com/ahmd_shmt">
                                <div className=' rounded-circle d-flex align-items-center justify-content-center' style={{ backgroundColor: '#C12E7E', width: '35px', height: '35px' }}>
                                    <FaInstagram  style={{fontSize:'20px'}}/>
                                </div>
                                ahmd_shmt</a>
                            <a className='d-flex align-items-center gap-2' style={{ color: "white" }} href="https://wa.me/81281216">
                                <div className=' rounded-circle d-flex align-items-center justify-content-center' style={{ backgroundColor: '#22b13b', width: '35px', height: '35px' }}>
                                    <FaWhatsapp style={{fontSize:'20px'}} />
                                </div>
                                +961 81281216</a>
                        </div>
                    </div>
                    <div>
                        <h4 className=" mb-4" style={{ fontWeight: '600' }}>
                            Help
                        </h4>
                        <div className='d-flex flex-column gap-1' flex="column" style={{ cursor: 'pointer', padding: '0' }}>
                            <a style={{ color: "white" }} href="/register">Sign Up</a>
                            <a style={{ color: "white" }} href="/login">Login</a>
                        </div>
                    </div>
                </Container>
                <h6 className="text-center mt-4 border-top pt-3">&copy;Devwares, 2024. All rights reserved.</h6>
            </div>
        </footer>
    )
}

export default Footer