import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { flyToCart } from '../utils/animations';
import './Products.css';
import { API_URL } from '../config';

import Footer from '../components/Footer';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Lỗi tải sản phẩm:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p =>
    (p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="products-page">
      <Navbar />

      <div className="products-hero-light">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sản phẩm <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Giải pháp cửa hiện đại cho ngôi nhà của bạn
          </motion.p>
        </div>
      </div>

      <section className="products-section section-padding">
        <div className="container">
          <div className="products-controls">
            <div className="search-bar-luxury">
              <div className="search-input-wrapper">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Bạn đang tìm mẫu cửa nào?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="clear-search" onClick={() => setSearchQuery("")}>
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="product-count-badge">
              Tìm thấy <strong>{filteredProducts.length}</strong> kết quả
            </div>
          </div>

          {loading ? (
            <div className="loading-state">Đang tải sản phẩm...</div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  className="product-card-luxury"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/product/${product._id}`} className="card-link">
                    <div className="card-image-box">
                      <img src={product.image || "https://via.placeholder.com/400"} alt={product.name} />
                      <div className="card-hover-info">
                        <span>Xem chi tiết</span>
                      </div>
                    </div>
                    <div className="card-body-luxury">
                      <div className="card-brand"><span className="brand-pk">PK</span> <span className="brand-door">DOOR</span></div>
                      <h3>{product.name}</h3>
                      <div className="card-footer-luxury">
                        <div className="card-price-luxury">
                          {Number(product.price).toLocaleString()}đ
                        </div>
                        <div className="card-actions-luxury">
                          {product.stock > 0 ? (
                            <button
                              className="add-to-cart-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                                flyToCart(e, product.image);
                              }}
                            >
                              <ShoppingBag size={18} />
                            </button>
                          ) : (
                            <span className="out-of-stock-badge">Hết hàng</span>
                          )}
                          <div className="view-btn-circle">
                            <ArrowUpRight size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="no-results">
              Không tìm thấy sản phẩm nào phù hợp với tìm kiếm của bạn.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
