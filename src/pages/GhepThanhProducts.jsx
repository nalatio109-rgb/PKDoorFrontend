import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle, VolumeX, Sun, Leaf, Shield, Wrench, PhoneCall, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { flyToCart } from '../utils/animations';
import { Link } from 'react-router-dom';
import './Products.css';
import Footer from '../components/Footer';
import mauImg from '../assets/mau.png';
import cuamauvangImg from '../assets/cuamauvang.png';
import taynamcuaImg from '../assets/taynamcua.png';
import { API_URL } from '../config';

const GhepThanhProducts = () => {
  const { addToCart } = useCart();

  const [mainProduct, setMainProduct] = useState({
    _id: "ghep-thanh-main",
    name: "Cửa Nhựa Ghép Thanh Vân Gỗ",
    price: 450000,
    image: cuamauvangImg,
    images: []
  });

  const [activeImage, setActiveImage] = useState("");
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        const normalize = (str) => (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        const product = data.find(p => {
          const normName = normalize(p.name);
          return normName.includes('ghep thanh') || normName.includes('van go');
        });
        if (product) {
            setMainProduct(prev => ({
              ...prev,
              _id: product._id,
              name: product.name,
              price: product.price,
              image: product.image || prev.image,
              images: product.images,
              badge: product.badge,
              colors: product.colors,
              features: product.features,
              description: product.description
            }));
            setActiveImage(product.image || cuamauvangImg);
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
                <span style={{ display: 'block', marginBottom: '10px' }}>CỬA NHỰA GHÉP</span>
                <span className="highlight-red" style={{ display: 'block' }}>THANH VÂN GỖ</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Vẻ đẹp tự nhiên - Độ bền vượt thời gian
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
              <div className="premium-image-side" style={{ flexDirection: 'column' }}>
                <motion.img
                  src={activeImage || mainProduct.image}
                  alt="Cửa Nhựa Ghép Thanh Vân Gỗ"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              {/* Thumbnails */}
              <div className="product-thumbnails" style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'flex-start', flexWrap: 'nowrap', padding: '5px', paddingBottom: '15px', overflowX: 'auto', maxWidth: '100%' }}>
                {Array.from(new Set([mainProduct.image, ...(mainProduct.images || [])].filter(Boolean))).map((img, idx) => (
                  <img 
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      minWidth: '60px',
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: (activeImage || mainProduct.image) === img ? '3px solid var(--primary-color)' : '1px solid #ddd',
                      opacity: (activeImage || mainProduct.image) === img ? 1 : 0.6,
                      transition: 'all 0.3s ease',
                      flexShrink: 0
                    }}
                    onClick={(e) => {
                      setActiveImage(img);
                      e.target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    }}
                  />
                ))}
              </div>
              </div>
              <div className="premium-info-side">
                {mainProduct.badge ? (
                  <div className="product-badge">{mainProduct.badge}</div>
                ) : (
                  <div className="product-badge">Bán chạy nhất</div>
                )}
                <h3 className="premium-title">{mainProduct.name}</h3>

                <div className="premium-colors">
                  <span className="color-label" style={{ marginBottom: '15px' }}>
                    Màu sắc đang chọn:{' '}
                    <strong style={{ color: '#d11f26', marginLeft: '5px', fontSize: '1.05rem' }}>
                      {mainProduct.colors 
                        ? (mainProduct.colors.split(',')[activeColorIndex] ? mainProduct.colors.split(',')[activeColorIndex].split(':')[0].trim() : `Màu ${activeColorIndex + 1}`)
                        : `Màu ${activeColorIndex + 1}`}
                    </strong>
                  </span>
                  <div className="color-options">
                    {mainProduct.colors ? mainProduct.colors.split(',').map((c, i) => {
                      const parts = c.split(':');
                      if(parts.length === 2) {
                        return (
                          <div 
                            key={i} 
                            className="color-circle" 
                            style={{ 
                              backgroundColor: parts[1].trim(),
                              boxShadow: activeColorIndex === i ? `0 0 0 3px #fff, 0 0 0 5px ${parts[1].trim()}` : 'none',
                              transform: activeColorIndex === i ? 'scale(1.2)' : 'none',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }} 
                            title={parts[0].trim()}
                            onClick={() => {
                              setActiveColorIndex(i);
                              const allImages = Array.from(new Set([mainProduct.image, ...(mainProduct.images || [])].filter(Boolean)));
                              if (allImages[i]) {
                                setActiveImage(allImages[i]);
                              }
                            }}
                          ></div>
                        );
                      }
                      return null;
                    }) : (
                      ['#3e2723', '#757575', '#f5f5dc', '#8b4513', '#722f37', '#36454f'].map((color, i) => (
                        <div 
                          key={i} 
                          className="color-circle" 
                          style={{ 
                            backgroundColor: color,
                            boxShadow: activeColorIndex === i ? `0 0 0 3px #fff, 0 0 0 5px ${color}` : 'none',
                            transform: activeColorIndex === i ? 'scale(1.2)' : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }} 
                          onClick={() => {
                            setActiveColorIndex(i);
                            const allImages = Array.from(new Set([mainProduct.image, ...(mainProduct.images || [])].filter(Boolean)));
                            if (allImages[i]) {
                              setActiveImage(allImages[i]);
                            }
                          }}
                        ></div>
                      ))
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
                        <span>Vân gỗ chân thật 99%</span>
                      </motion.div>
                      <motion.div className="feature-box" whileHover={{ y: -5 }}>
                        <Shield className="f-icon shield" size={24} />
                        <span>Chống mối mọt 100%</span>
                      </motion.div>
                    </>
                  )}
                </div>

                <motion.button
                  className="btn-premium-order"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    let selectedColorName = `Màu ${activeColorIndex + 1}`;
                    if (mainProduct.colors) {
                      const colors = mainProduct.colors.split(',');
                      if (colors[activeColorIndex]) {
                        selectedColorName = colors[activeColorIndex].split(':')[0].trim();
                      }
                    }
                    const imgToCart = activeImage || mainProduct.image;
                    addToCart({ ...mainProduct, image: imgToCart, selectedColor: selectedColorName });
                    flyToCart(e, imgToCart);
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
                <Link to="/san-pham" className="view-all-link">Xem tất cả <ChevronRight size={16} /></Link>
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
                {mainProduct.images && mainProduct.images.length > 0 ? (
                  [...mainProduct.images, ...mainProduct.images].map((img, idx) => (
                    <div className="gallery-item" key={idx}>
                      <img src={img} alt={`${mainProduct.name} ${idx}`} />
                      <div className="gallery-name">Hình ảnh thực tế {(idx % mainProduct.images.length) + 1}</div>
                    </div>
                  ))
                ) : (
                  [...galleryImages, ...galleryImages].map((img, idx) => (
                    <div className="gallery-item" key={idx}>
                      <img src={img.src} alt={img.name} />
                      <div className="gallery-name">{img.name}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GhepThanhProducts;
