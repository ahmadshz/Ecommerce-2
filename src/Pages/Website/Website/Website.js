import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/2-Website/1-Navbar/Navbar'
import Landing from './1-Landing/Landing'
import LatestProduct from './4-LatestProduct/LatestProduct'
import TopRatedProduct from './3-TopRatedProduct/TopRatedProduct'
import Footer from '../../../Components/2-Website/8-Footer/Footer'
import ProductSale from './2-LatestProductSale/ProductSale'
import { MdKeyboardDoubleArrowUp } from 'react-icons/md'

const Website = () => {
  const [isVisible, setIsVisible] = useState(false)
  const goToTop = () => {
    window.scrollTo({
      top: '0',
      behavior: 'smooth',
    })
  }

  const handleScroll = () => {
    if (window.scrollY > 150) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div  >
      <Navbar />
      <Landing />
      <ProductSale />
      <TopRatedProduct />
      <LatestProduct />
      <Footer />
      <MdKeyboardDoubleArrowUp
        size={20}
        onClick={goToTop}
        className="position-fixed bottom-0 end-0 m-3 text-light rounded-circle p-2"
        style={{
          backgroundColor: '#FFA720',
          opacity: isVisible ? '1' : '0',
          transition: 'opacity 0.3s ease-in-out',
          height: '60px',
          width: '60px',
          cursor: 'pointer',
        }}
      />


    </div>
  )
}

export default Website
