import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle, VolumeX, Sun, Leaf, Shield, Wrench, PhoneCall, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { flyToCart } from '../utils/animations';
import { Link } from 'react-router-dom';
import './Products.css';
import Footer from '../components/Footer';
import plasticDoorImg from '../assets/plastic-door.png';
import taynamcuaImg from '../assets/taynamcua.png';
import phoiCuaImg from '../assets/phoicua.png';
import phoicua1Img from '../assets/phoicua1.png';
import img1 from '../assets/1.png';
import { API_URL } from '../config';

const PvcProducts = () => {
  const { addToCart } = useCart();
  
  const [mainProduct, setMainProduct] = useState({
    _id: "pvc-main",
    name: "Phôi Cửa Nhựa PVC",
    price: 250000,
    image: "https://pkdoorbackend-production.up.railway.app/uploads/1781325373480-510616103.png",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        const product = data.find(p => p.name.toLowerCase().includes('pvc'));
        if (product) {
          setMainProduct(prev => ({
            ...prev,
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image || prev.image,
            badge: product.badge,
            colors: product.colors,
            features: product.features
          }));
        }
      })
      .catch(err => console.log(err));
  }, []);

  const galleryImages = [
    { name: "Phòng khách", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Phòng ngủ", src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Nhà tắm", src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Văn phòng", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Cửa hàng", src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400&h=300" }
  ];

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
          style={{ 
            backgroundImage: `url(${phoiCuaImg})`, 
            filter: 'none',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)'
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content-row">
            <div className="hero-spacer-left" style={{ flex: 0.3 }}></div>

            <motion.div
              className="hero-text"
            >
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 1, delay: 0.1 }}
              >
                PHÔI CỬA<br />NHỰA <span className="highlight-red">PVC</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 1, delay: 0.3 }}
              >
                Cứng Cáp - Dễ Thi Công - Chống Ẩm Tuyệt Đối
              </motion.p>
              <motion.button
                className="btn-discover"
                onClick={() => document.getElementById('product-section').scrollIntoView({ behavior: 'smooth' })}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 1, delay: 0.5 }}
              >
                TÌM HIỂU THÊM
              </motion.button>
            </motion.div>

            <div className="hero-spacer-right" style={{ flex: 1.5 }}></div>
          </div>
        </div>

        <motion.div
          className="hero-swatches-container"
          initial={{ opacity: 0, x: 150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1.2, delay: 0.2 }}
        >
          <img
            src={phoicua1Img}
            alt="Phôi cửa nhựa PVC"
            className="swatches-img"
            style={{ maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%)', transform: 'translateX(45%) scale(1.6)', transformOrigin: 'right center' }}
          />
        </motion.div>
      </section>

      {/* Product Section */}
      <section id="product-section" className="product-main-area">
        <div className="container">
          <div className="section-title">
            <h2>CHI TIẾT SẢN PHẨM</h2>
            <div className="line-dec"></div>
          </div>

          <div className="product-showcase">
            <div className="premium-product-card">
              <div className="premium-image-side">
                <motion.img
                  src={mainProduct.image}
                  alt={mainProduct.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{ objectFit: 'contain', padding: '20px' }}
                />
                <div className="glow-effect"></div>
              </div>
              <div className="premium-info-side">
                {mainProduct.badge ? (
                  <div className="product-badge" style={{ background: '#3498db' }}>{mainProduct.badge}</div>
                ) : (
                  <div className="product-badge" style={{ background: '#3498db' }}>Sản phẩm nổi bật</div>
                )}
                <h3 className="premium-title">{mainProduct.name}</h3>

                <div className="premium-colors">
                  <span className="color-label">Màu sắc tiêu chuẩn:</span>
                  <div className="color-options">
                    {mainProduct.colors ? mainProduct.colors.split(',').map((c, i) => {
                      const parts = c.split(':');
                      if(parts.length === 2) {
                        return <div key={i} className="color-circle" style={{ backgroundColor: parts[1].trim() }} title={parts[0].trim()}></div>
                      }
                      return null;
                    }) : (
                      <>
                        <div className="color-circle c-3" title="Trắng sứ"></div>
                        <div className="color-circle c-2" title="Xám ghi"></div>
                        <div className="color-circle" style={{ background: '#ecf0f1' }} title="Trắng ngà"></div>
                      </>
                    )}
                  </div>
                </div>

                <div className="premium-features">
                  {mainProduct.features ? mainProduct.features.split('\n').filter(f=>f.trim()).map((feat, idx) => {
                    const icons = [
                      <CheckCircle className="f-icon drop" size={24} />,
                      <Leaf className="f-icon wave" size={24} />,
                      <Shield className="f-icon sun" size={24} />,
                      <Wrench className="f-icon shield" size={24} />,
                      <VolumeX className="f-icon wave" size={24} />
                    ];
                    return (
                      <motion.div key={idx} className="feature-box" whileHover={{ y: -5 }}>
                        {icons[idx % icons.length]}
                        <span>{feat.trim()}</span>
                      </motion.div>
                    );
                  }) : (
                    <>
                      <motion.div className="feature-box" whileHover={{ y: -5 }}>
                        <CheckCircle className="f-icon drop" size={24} />
                        <span>Lõi đặc PVC chắc chắn</span>
                      </motion.div>
                      <motion.div className="feature-box" whileHover={{ y: -5 }}>
                        <Leaf className="f-icon wave" size={24} />
                        <span>Chịu lực, cách âm tốt</span>
                      </motion.div>
                      <motion.div className="feature-box" whileHover={{ y: -5 }}>
                        <Shield className="f-icon sun" size={24} />
                        <span>Chống mối mọt 100%</span>
                      </motion.div>
                      <motion.div className="feature-box" whileHover={{ y: -5 }}>
                        <Wrench className="f-icon shield" size={24} />
                        <span>Dễ dàng cắt gọt thi công</span>
                      </motion.div>
                    </>
                  )}
                </div>



                <motion.button
                  className="btn-premium-order"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    addToCart(mainProduct);
                    flyToCart(e, mainProduct.image);
                  }}
                  style={{ background: 'linear-gradient(90deg, #2980b9, #3498db)' }}
                >
                  <span className="btn-text">ĐẶT HÀNG NGAY</span>
                  <div className="btn-shine"></div>
                </motion.button>
              </div>
            </div>

            {/* Recommended Accessories */}
            <div className="recommended-accessories">
              <div className="rec-header">
                <h3>Phụ kiện tương thích</h3>
              </div>
              <div className="rec-items-grid">
                <div className="rec-item-card">
                  <div className="rec-img">
                    <img src={taynamcuaImg} alt="Keo dán PVC" style={{ filter: 'grayscale(50%)' }} />
                  </div>
                  <div className="rec-info">
                    <h4>Keo dán PVC chuyên dụng</h4>
                    <p>Liên kết siêu chắc, chống nước.</p>
                  </div>
                  <button className="btn-add-rec" onClick={(e) => {
                    addToCart({ _id: 'acc-3', name: 'Keo dán PVC', price: 85000, image: taynamcuaImg });
                    flyToCart(e, taynamcuaImg);
                  }}><ShoppingCart size={18} /></button>
                </div>
                <div className="rec-item-card">
                  <div className="rec-img">
                    <img src={taynamcuaImg} alt="Nẹp góc PVC" style={{ filter: 'hue-rotate(90deg)' }} />
                  </div>
                  <div className="rec-info">
                    <h4>Nẹp viền PVC</h4>
                    <p>Đồng bộ màu sắc, che khuyết điểm.</p>
                  </div>
                  <button className="btn-add-rec" onClick={(e) => {
                    addToCart({ _id: 'acc-4', name: 'Nẹp viền PVC', price: 45000, image: taynamcuaImg });
                    flyToCart(e, taynamcuaImg);
                  }}><ShoppingCart size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PvcProducts;
