import React, { useEffect, useState, useRef } from 'react';
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
import { API_URL } from '../config';

const Products = () => {
  const { addToCart } = useCart();

  const [mainProduct, setMainProduct] = useState({
    _id: "composite-main",
    name: "Cửa Nhựa Gỗ Composite",
    price: 390000,
    image: cuamauvangImg,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        const product = data.find(p => p.name.toLowerCase().includes('composite'));
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
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content-row">
            {/* Spacer for left image */}
            <div className="hero-spacer-left"></div>

            <motion.div
              className="hero-text"
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
            <div className="hero-spacer-right"></div>
          </div>
        </div>

        <motion.div
          className="hero-swatches-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src={mauImg}
            alt="Bảng màu cửa nhựa gỗ"
            className="swatches-img"
          />
        </motion.div>
      </section>

      {/* Product Section */}
      <section id="product-section" className="product-main-area">
        <div className="container">
          <div className="section-title">
            <h2>SẢN PHẨM</h2>
            <div className="line-dec"></div>
          </div>

          <div className="product-showcase">
            <div className="premium-product-card">
              <div className="premium-image-side">
                <motion.img
                  src={mainProduct.image}
                  alt="Cửa Nhựa Gỗ Composite"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="glow-effect"></div>
              </div>
              <div className="premium-info-side">
                {mainProduct.badge ? (
                  <div className="product-badge">{mainProduct.badge}</div>
                ) : (
                  <div className="product-badge">Bán chạy nhất</div>
                )}
                <h3 className="premium-title">{mainProduct.name}</h3>

                <div className="premium-colors">
                  <span className="color-label">Màu sắc thịnh hành:</span>
                  <div className="color-options">
                    {mainProduct.colors ? mainProduct.colors.split(',').map((c, i) => {
                      const parts = c.split(':');
                      if(parts.length === 2) {
                        return <div key={i} className="color-circle" style={{ backgroundColor: parts[1].trim() }} title={parts[0].trim()}></div>
                      }
                      return null;
                    }) : (
                      <>
                        <div className="color-circle c-1" title="Nâu gụ"></div>
                        <div className="color-circle c-2" title="Xám tro"></div>
                        <div className="color-circle c-3" title="Trắng ngà"></div>
                        <div className="color-circle c-4" title="Sồi đậm"></div>
                        <div className="color-circle c-5" title="Rượu vang"></div>
                        <div className="color-circle c-6" title="Than củi"></div>
                      </>
                    )}
                  </div>
                </div>

                <div className="premium-features">
                  {mainProduct.features ? mainProduct.features.split('\n').filter(f=>f.trim()).map((feat, idx) => {
                    const icons = [
                      <CheckCircle className="f-icon drop" size={24} />,
                      <VolumeX className="f-icon wave" size={24} />,
                      <Sun className="f-icon sun" size={24} />,
                      <Shield className="f-icon shield" size={24} />,
                      <Leaf className="f-icon wave" size={24} />,
                      <Wrench className="f-icon shield" size={24} />
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
                        <span>Chống ẩm tuyệt đối</span>
                      </motion.div>
                      <motion.div className="feature-box" whileHover={{ y: -5 }}>
                        <VolumeX className="f-icon wave" size={24} />
                        <span>Cách âm vượt trội</span>
                      </motion.div>
                      <motion.div className="feature-box" whileHover={{ y: -5 }}>
                        <Sun className="f-icon sun" size={24} />
                        <span>Bền màu 10 năm</span>
                      </motion.div>
                      <motion.div className="feature-box" whileHover={{ y: -5 }}>
                        <Shield className="f-icon shield" size={24} />
                        <span>Chống cháy lan</span>
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
                >
                  <span className="btn-text">ĐẶT HÀNG NGAY</span>
                  <div className="btn-shine"></div>
                </motion.button>
              </div>
            </div>

            {/* Recommended Accessories */}
            <div className="recommended-accessories">
              <div className="rec-header">
                <h3>Phụ kiện khuyên dùng</h3>
                <Link to="/products" className="view-all-link">Xem tất cả <ChevronRight size={16} /></Link>
              </div>
              <div className="rec-items-grid">
                <div className="rec-item-card">
                  <div className="rec-img">
                    <img src={taynamcuaImg} alt="Phụ kiện khóa cửa" />
                  </div>
                  <div className="rec-info">
                    <h4>Khóa cửa cao cấp</h4>
                    <p>Bảo mật 3 lớp, chống cắt phá.</p>
                  </div>
                  <button className="btn-add-rec" onClick={(e) => {
                    addToCart({ _id: 'acc-1', name: 'Khóa cửa cao cấp', price: 450000, image: taynamcuaImg });
                    flyToCart(e, taynamcuaImg);
                  }}><ShoppingCart size={18} /></button>
                </div>
                {/* Add a dummy item for layout */}
                <div className="rec-item-card">
                  <div className="rec-img">
                    <img src={taynamcuaImg} alt="Bản lề" style={{ filter: 'hue-rotate(45deg)' }} />
                  </div>
                  <div className="rec-info">
                    <h4>Bản lề Inox 304</h4>
                    <p>Chống rỉ sét, chịu tải trọng lớn.</p>
                  </div>
                  <button className="btn-add-rec" onClick={(e) => {
                    addToCart({ _id: 'acc-2', name: 'Bản lề Inox 304', price: 120000, image: taynamcuaImg });
                    flyToCart(e, taynamcuaImg);
                  }}><ShoppingCart size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section">
        <div className="container">
          <div className="section-title">
            <h2>VÌ SAO CHỌN PK DOOR</h2>
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
            <h2>KHÔNG GIAN THỰC TẾ</h2>
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
