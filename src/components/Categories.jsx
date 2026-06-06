import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Categories.css';
import { API_URL } from '../config';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setCategories(data.slice(0, 6)))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="categories section-padding" id="products">
      <div className="container">
        <div className="section-header">
          {/* <div className="subtitle-wrapper">
            <span className="subtitle"> </span>
          </div> */}
          <div className="title-wrapper">
            <h2 className="title">
              Danh mục <span className="text-primary">sản phẩm</span>
            </h2>
          </div>
          <div className="description-wrapper">
            <p className="description">
              Khám phá các dòng sản phẩm đa dạng, phù hợp với mọi phong cách thiết kế.
            </p>
          </div>
        </div>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <motion.div
              key={cat._id}
              className="category-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/product/${cat._id}`} className="card-image-link">
                <div className="card-image">
                  <img src={cat.image} alt={cat.name} />
                  <span className="card-tag">Mới</span>
                </div>
              </Link>

              <div className="card-content">
                <Link to={`/product/${cat._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{cat.name}</h3>
                </Link>
                <p>{cat.description}</p>
                <Link to={`/product/${cat._id}`} className="card-link">
                  Chi tiết <ArrowUpRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="see-all-wrapper" style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              to="/products"
              className="btn-see-all"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                backgroundColor: '#00AEEF',
                color: '#fff',
                padding: '1.2rem 2.5rem',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '1.1rem',
                textDecoration: 'none',
                boxShadow: '0 10px 20px rgba(0, 174, 239, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              Xem tất cả sản phẩm <ArrowUpRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Categories;