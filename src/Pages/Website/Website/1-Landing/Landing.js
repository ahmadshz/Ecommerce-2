import React from 'react';
import { Container } from 'react-bootstrap';
import landing from '../../../../css/assets/images/Img-Hero.webp';

const Landing = () => {
  return (
    <div>
      <div
        className="d-flex align-items-center m-2 position-relative shadow-sm rounded"
        style={{ height: '80vh', overflow: 'hidden', backgroundColor: '#AEAEAE' }}
      >
        <img
          src={landing}
          alt="Landing"
          className="img-fluid position-absolute top-0 start-0 w-100 h-100"
          style={{
            objectFit: 'cover',
            filter: 'brightness(60%)',
            transition: 'transform 8s ease-in-out',
          }}
        />
        <Container className="text-center text-light position-relative">
          {/* Top Brands */}
          <h4
            className="fw-bold fs-3 mb-3 animate__animated animate__fadeInDown animate__delay-1s"
            style={{ color: '#FFA716' }}
          >
            Top Brands
          </h4>

          {/* New Collection */}
          <h1
            className="display-4 fw-bold mb-4 animate__animated animate__fadeInUp animate__delay-2s"
            style={{
              color: '#FFFFFF',
              letterSpacing: '2px',
            }}
          >
            New Collection
          </h1>

          {/* Subheading Text */}
          <p
            className="fw-medium fs-5 mx-auto mb-4 animate__animated animate__fadeIn animate__delay-3s"
            style={{
              color: '#E0E0E0',
              maxWidth: '600px',
              lineHeight: '1.8',
            }}
          >
            Discover the finest trends and elevate your wardrobe with our premium
            selection of top-brand fashion pieces.
          </p>

          <div
            className="btn  fw-bold px-4 py-2 shadow rounded-5 animate__animated animate__bounceIn animate__delay-4s"
            style={{
              backgroundColor: '#FF7F0B',
              color: '#FFFFFF',
              letterSpacing: '1px',
            }}
          >
            Shop Now
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Landing;
