import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, CheckCircle, Info, Maximize2, ShieldCheck, Truck, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { flyToCart } from '../utils/animations';
import './ProductDetails.css';
import { API_URL } from '../config';

import Footer from '../components/Footer';

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
        <div className="container section-padding">
          <div className="loading-state">Đang tải chi tiết sản phẩm...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page">
        <Navbar />
        <div className="container section-padding">
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

  const featuresList = (product.features && product.features.trim() !== "")
    ? product.features.split('\n').filter(f => f.trim() !== '')
    : ["Kháng nước 100%", "Không cong vênh, co ngót", "Độ bền vượt trội", "Cách âm hoàn hảo"];

  const parsedSpecs = (product.specs && product.specs.trim() !== "")
    ? product.specs.split('\n').filter(s => s.includes(':')).map(line => {
      const [key, ...val] = line.split(':');
      return { label: key.trim(), value: val.join(':').trim() };
    })
    : [];

  const specsList = parsedSpecs.length > 0
    ? parsedSpecs
    : [
      { label: "Phân loại", value: "Cửa thông phòng / Cửa vệ sinh" },
      { label: "Kích thước chuẩn", value: "900 x 2200 mm" },
      { label: "Độ dày cánh", value: "40mm" },
      { label: "Chất liệu", value: "Nhựa Composite cao cấp" }
    ];

  // Tạo danh sách ảnh gallery (bao gồm cả ảnh chính)
  const gallery = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  return (
    <div className="product-details-page">
      <Navbar alwaysSolid={true} />

      <div className="product-hero-bg"></div>

      <section className="product-main-section container">
        <nav className="product-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span className="dot"></span>
          <Link to="/products">Sản phẩm</Link>
          <span className="dot"></span>
          <span className="current">{product.name}</span>
        </nav>

        <motion.div
          className="product-content-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Left Column: Visuals */}
          <div className="product-visuals">
            <div className="product-main-image-wrapper">
              <div className="image-container">
                <motion.img
                  key={activeImage}
                  src={activeImage || "https://via.placeholder.com/800x800"}
                  alt={product.name}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="image-overlay-badge">
                  <ShieldCheck size={16} /> Authentic <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span>
                </div>
              </div>
            </div>

            {gallery.length > 1 && (
              <div className="product-thumbnails">
                {gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className={`thumbnail-item ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} />
                  </div>
                ))}
              </div>
            )}


          </div>

          {/* Right Column: Info */}
          <div className="product-details-info">
            <span className="brand-badge">Premium Collection</span>
            <h1 className="product-name">{product.name}</h1>

            <div className="price-card">
              <div className="price-main">
                <span className="currency">VNĐ</span>
                <span className="amount">{Number(product.price).toLocaleString()}</span>
              </div>
              <div className="price-status">
                <span className={`status-dot ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}></span> 
                {product.stock === 1 ? (
                  <span className="low-stock-alert">Chỉ còn 1 sản phẩm cuối cùng!</span>
                ) : product.stock > 1 ? (
                  "Còn hàng"
                ) : (
                  "Hết hàng"
                )}
              </div>
            </div>

            <div className="info-block">
              <h3><Info size={18} /> Giới thiệu</h3>
              <p className="description-text">
                {product.description || <>Sản phẩm cửa cao cấp <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span> với thiết kế hiện đại, độ bền vượt trội và khả năng cách âm hoàn hảo cho không gian sống của bạn.</>}
              </p>
            </div>

            <div className="info-block">
              <h3><CheckCircle size={18} /> Đặc điểm nổi bật</h3>
              <div className="features-grid">
                {featuresList.map((feature, idx) => (
                  <div className="feature-item" key={idx}>
                    <CheckCircle size={14} className="text-blue" style={{ flexShrink: 0 }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cta-group">
              {product.stock > 0 ? (
                <button className="btn-quote" onClick={(e) => {
                  addToCart(product);
                  flyToCart(e, product.image);
                }}>
                  <ShoppingCart size={20} /> Thêm vào giỏ hàng ngay
                </button>
              ) : (
                <button className="btn-quote disabled" disabled>
                  HẾT HÀNG TẠM THỜI
                </button>
              )}
              <div className="secondary-btns">
                <a href="https://zalo.me/0905943679" target="_blank" rel="noreferrer" className="btn-icon-label" style={{ textDecoration: 'none' }}>
                  <div className="icon-circle zalo">Z</div>
                  <span>Chat Zalo</span>
                </a>
                <a href="tel:0905943679" className="btn-icon-label" style={{ textDecoration: 'none' }}>
                  <div className="icon-circle phone">
                    <Phone size={18} />
                  </div>
                  <span>Hotline</span>
                </a>
              </div>
              <div className="visual-features">
                <div className="v-feature">
                  <div className="v-icon"><Maximize2 size={20} /></div>
                  <span>Tùy chỉnh kích thước</span>
                </div>
                <div className="v-feature">
                  <div className="v-icon"><ShieldCheck size={20} /></div>
                  <span>Bảo hành dài hạn</span>
                </div>
                <div className="v-feature">
                  <div className="v-icon"><Truck size={20} /></div>
                  <span>Giao hàng nhanh</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technical Specs Table */}
        <motion.div
          className="specs-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="specs-header">
            <h2>Thông Số Kỹ Thuật</h2>
            <div className="line"></div>
          </div>
          <div className="specs-table-container">
            <table className="modern-table">
              <tbody>
                {specsList.map((spec, idx) => (
                  <tr key={idx}>
                    <td>{spec.label}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetails;
