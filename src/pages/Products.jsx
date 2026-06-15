import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle, VolumeX, Sun, Leaf, Shield, Wrench, PhoneCall, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { flyToCart } from '../utils/animations';
import { Link } from 'react-router-dom';
import './Products.css';
import Footer from '../components/Footer';
import mauImg from '../assets/mau.png';
import cuamauvangImg from '../assets/cuamauvang.png';
import taynamcuaImg from '../assets/taynamcua.png';

const Products = () => {
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    { name: "Phòng khách", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Phòng ngủ", src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Nhà tắm", src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Văn phòng", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Cửa hàng", src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400&h=300" }
  ];

  // Dummy product data for the main card
  const mainProduct = {
    _id: "composite-main",
    name: "Cửa Nhựa Gỗ Composite",
    price: 390000,
    image: cuamauvangImg,
  };

  return (
    <div className="products-landing-page">
      <Navbar alwaysSolid={true} />

      {/* Hero Section */}
      <section className="product-hero-section">
        <motion.div
          className="hero-background-image"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '350px' }}>
            {/* Spacer for left image */}
            <div style={{ flex: 1.5, minWidth: '400px' }}></div>

            <motion.div
              className="hero-text"
              style={{ flex: 1.5, textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '50px' }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                CỬA NHỰA GỖ<br /><span className="highlight-red">COMPOSITE</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Hơn 8 màu sắc - Bền bỉ theo năm tháng
              </motion.p>
              <motion.button
                className="btn-discover"
                onClick={() => document.getElementById('product-section').scrollIntoView({ behavior: 'smooth' })}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                KHÁM PHÁ NGAY
              </motion.button>
            </motion.div>

            {/* Spacer for right swatches */}
            <div style={{ flex: 0.5, minWidth: '150px' }}></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
        >
          <img
            src={mauImg}
            alt="Bảng màu cửa nhựa gỗ"
            style={{ height: '100%', width: 'auto', objectFit: 'contain', objectPosition: 'right' }}
          />
        </motion.div>
      </section>

      {/* Product Section */}
      <section id="product-section" className="product-main-area">
        <div className="container">
          <div className="section-title">
            <h2>PRODUCT SECTION</h2>
            <div className="line-dec"></div>
          </div>

          <div className="product-cards-wrapper">
            {/* Main Product Card */}
            <div className="main-product-card">
              <div className="product-image-box">
                <img src={mainProduct.image} alt="Cửa Nhựa Gỗ Composite" />
              </div>
              <div className="product-info-box">
                <h3 className="product-title">{mainProduct.name}</h3>

                <div className="color-options">
                  <div className="color-circle c-1"></div>
                  <div className="color-circle c-2"></div>
                  <div className="color-circle c-3"></div>
                  <div className="color-circle c-4"></div>
                  <div className="color-circle c-5"></div>
                  <div className="color-circle c-6"></div>
                  <div className="color-circle c-7"></div>
                </div>

                <div className="feature-icons-grid">
                  <div className="f-icon">
                    <CheckCircle className="icon drop" size={24} />
                    <span>Chống ẩm</span>
                  </div>
                  <div className="f-icon">
                    <VolumeX className="icon wave" size={24} />
                    <span>Cách âm</span>
                  </div>
                  <div className="f-icon">
                    <Sun className="icon sun" size={24} />
                    <span>Bền màu</span>
                  </div>
                  <div className="f-icon">
                    <Shield className="icon shield" size={24} />
                    <span>Đánh chặn khói</span>
                  </div>
                  <div className="f-icon">
                    <Leaf className="icon leaf" size={24} />
                    <span>Thân thiện môi trường</span>
                  </div>
                </div>

                <div className="price-tag">
                  {Number(mainProduct.price).toLocaleString()}đ
                </div>

                <button className="btn-order-now" onClick={(e) => {
                  addToCart(mainProduct);
                  flyToCart(e, mainProduct.image);
                }}>
                  ĐẶT HÀNG NGAY
                </button>
              </div>
            </div>

            {/* Accessory Card */}
            <div className="accessory-card poster-mode">
              <Link to="/products" style={{ display: 'block', width: '100%', height: '100%' }}>
                <img src={taynamcuaImg} alt="Phụ kiện cửa" className="poster-img" />
              </Link>
              <h3 className="acc-title">Phụ Kiện Cửa</h3>
              <p className="acc-desc">
                Cửa nhựa gỗ Composite của cửa có khóa, bản lề, hít cửa...
              </p>
              <Link to="/products" className="btn-view-more">Xem thêm</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section">
        <div className="container">
          <div className="section-title">
            <h2>WHY CHOOSE US</h2>
            <div className="line-dec"></div>
          </div>

          <div className="benefits-bar">
            <motion.div 
              className="benefit-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <div className="benefit-icon bg-red"><Shield size={20} /></div>
              <span>10 Năm Bảo Hành</span>
            </motion.div>
            <motion.div 
              className="benefit-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <div className="benefit-icon bg-red"><Wrench size={20} /></div>
              <span>Lắp Đặt Tận Nơi</span>
            </motion.div>
            <motion.div 
              className="benefit-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <div className="benefit-icon bg-red"><PhoneCall size={20} /></div>
              <span>Miễn Phí Tư Vấn</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-title">
            <h2>COLOR INSPIRATION GALLERY</h2>
            <div className="line-dec"></div>
          </div>

          <div className="gallery-carousel">
            <div className="gallery-marquee-container">
              <div className="gallery-track-infinite">
                {[...galleryImages, ...galleryImages].map((img, idx) => (
                  <div className="gallery-item" key={idx}>
                    <img src={img.src} alt={img.name} />
                    <div className="gallery-name">{img.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
