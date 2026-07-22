import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, CheckCircle, VolumeX, Sun, Leaf, Shield, Wrench, PhoneCall, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { flyToCart } from '../utils/animations';
import './ProductDetails.css';
import { API_URL } from '../config';
import Footer from '../components/Footer';
import mauImg from '../assets/mau.png';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setActiveImage(data.image); // Set ảnh chính ban đầu
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi tải chi tiết sản phẩm:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-page">
        <Navbar />
        <div className="container section-padding" style={{ paddingTop: '120px' }}>
          <div className="loading-state">Đang tải chi tiết sản phẩm...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page">
        <Navbar />
        <div className="container section-padding" style={{ paddingTop: '120px' }}>
          <div className="error-state">
            <h2>{error || "Sản phẩm không tồn tại"}</h2>
            <Link to="/products" className="back-link">
              <ArrowLeft size={20} /> Quay lại danh sách sản phẩm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const galleryImages = [
    { name: "Phòng khách", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Phòng ngủ", src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Nhà tắm", src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Văn phòng", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=300" },
    { name: "Cửa hàng", src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400&h=300" }
  ];

  return (
    <div className="product-details-page">
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
                CỬA NHỰA GỖ<br/><span className="highlight-red">COMPOSITE</span>
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
            <h2>SẢN PHẨM</h2>
            <div className="line-dec"></div>
          </div>

          <div className="product-cards-wrapper">
            {/* Main Product Card */}
            <div className="main-product-card">
              <div className="product-image-box">
                <img src={activeImage || product.image || "https://via.placeholder.com/400x800"} alt={product.name} />
              </div>
              <div className="product-info-box">
                <h3 className="product-title">{product.name}</h3>
                
                <div className="color-options">
                   {product.colors ? (
                     product.colors.split(",").map((c, idx) => {
                       const [cName, cHex] = c.split(":");
                       return (
                         <div 
                           key={idx} 
                           className="color-circle" 
                           style={{ backgroundColor: cHex || "#ccc" }}
                           title={cName}
                         ></div>
                       );
                     })
                   ) : (
                     <div style={{ fontSize: "14px", color: "#64748b" }}>Màu sắc mặc định</div>
                   )}
                </div>

                <div className="feature-icons-grid">
                  <div className="f-icon">
                    <CheckCircle className="icon drop" size={24}/>
                    <span>Chống ẩm</span>
                  </div>
                  <div className="f-icon">
                    <VolumeX className="icon wave" size={24}/>
                    <span>Cách âm</span>
                  </div>
                  <div className="f-icon">
                    <Sun className="icon sun" size={24}/>
                    <span>Bền màu</span>
                  </div>
                  <div className="f-icon">
                    <Shield className="icon shield" size={24}/>
                    <span>Chống cháy lan</span>
                  </div>
                  <div className="f-icon">
                    <Leaf className="icon leaf" size={24}/>
                    <span>Thân thiện môi trường</span>
                  </div>
                </div>

                {product.price > 0 && (
                  <div className="price-tag">
                    {Number(product.price).toLocaleString()}đ
                  </div>
                )}

                <button className="btn-order-now" onClick={(e) => {
                  addToCart(product);
                  flyToCart(e, product.image);
                }}>
                  ĐẶT HÀNG NGAY
                </button>
              </div>
            </div>

            {/* Accessory Card */}
            <div className="accessory-card">
              <div className="acc-image-wrapper">
                <img src="https://images.unsplash.com/photo-1558004380-008064cb9006?auto=format&fit=crop&q=80&w=200&h=400" alt="Phụ kiện cửa" />
              </div>
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
            <div className="benefit-item">
              <div className="benefit-icon bg-red"><Shield size={20}/></div>
              <span>10 Năm Bảo Hành</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon bg-red"><Wrench size={20}/></div>
              <span>Lắp Đặt Tận Nơi</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon bg-red"><PhoneCall size={20}/></div>
              <span>Miễn Phí Tư Vấn</span>
            </div>
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
            <button className="carousel-btn left"><ChevronLeft size={24} /></button>
            <div className="gallery-track">
              {product.images && product.images.length > 0 ? (
                product.images.map((img, idx) => (
                  <div className="gallery-item" key={idx} onClick={() => setActiveImage(img)}>
                    <img src={img} alt={`Gallery ${idx}`} />
                  </div>
                ))
              ) : (
                galleryImages.map((img, idx) => (
                  <div className="gallery-item" key={idx}>
                    <img src={img.src} alt={img.name} />
                    <div className="gallery-name">{img.name}</div>
                  </div>
                ))
              )}
            </div>
            <button className="carousel-btn right"><ChevronRight size={24} /></button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetails;
