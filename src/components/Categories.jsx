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

        <div className="categories-list-split">
          {categories.map((cat, index) => {
            // Generate product code
            const name = cat.name || "";
            const prefix = name.toLowerCase().includes("composite") ? "C" : name.toLowerCase().includes("pvc") ? "P" : "D";
            const num = String(index + 1).padStart(2, '0');
            const productCode = `${prefix}${num}`;
            
            // Determine custom link destination
            let linkTo = `/san-pham-chi-tiet/${cat._id}`;
            const normalize = (str) => (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
            const normName = normalize(name);

            if (normName.includes('pvc')) {
              linkTo = '/san-pham/pvc';
            } else if (normName.includes('composite')) {
              linkTo = '/san-pham/composite';
            } else if (normName.includes('ghep thanh') || normName.includes('van go')) {
              linkTo = '/san-pham/ghep-thanh';
            }

            // Parse specifications
            const parsedSpecs = (cat.specs && cat.specs.trim() !== "")
              ? cat.specs.split('\n').filter(s => s.includes(':')).map(line => {
                const [key, ...val] = line.split(':');
                return { label: key.trim(), value: val.join(':').trim() };
              })
              : [];

            // Default specs if empty
            const specsToShow = parsedSpecs.length > 0
              ? parsedSpecs.slice(0, 2)
              : [
                { label: "Specifications", value: "Standard Fit" },
                { label: "Phụ kiện", value: "Premium Package" }
              ];

            return (
              <motion.div
                key={cat._id}
                className={`category-card-split ${index % 2 === 1 ? 'reverse' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Link to={linkTo} className="card-image-link">
                  <div className="card-image-box">
                    <img src={cat.image} alt={cat.name} />
                    <span className="card-tag">Mới</span>
                    <span className="product-code-badge">{productCode}</span>
                  </div>
                </Link>

                <div className="card-content-box">
                  <div className="card-content-inner">
                    <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 className="product-title">{cat.name.toUpperCase()}</h3>
                    </Link>
                    
                    {cat.description && (cat.description.includes('✓') || cat.description.includes('✔')) ? (
                      <div className="product-desc-list">
                        {cat.description.split(/[✓✔]/).filter(d => d.trim()).map((item, idx) => (
                          <div key={idx} className="desc-list-item">
                            <span className="check-icon">✓</span>
                            <span>{item.trim()}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="product-desc" style={{ whiteSpace: 'pre-line' }}>{cat.description}</p>
                    )}
                    
                    <div className="product-specs">
                      {specsToShow.map((spec, sIdx) => (
                        <div key={sIdx} className="spec-item">
                          <span className="spec-label">{spec.label}:</span>
                          <span className="spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card-action-bar">
                    <Link to={linkTo} className="card-link-btn">
                      CHI TIẾT <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
};

export default Categories;