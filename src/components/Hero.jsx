import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  // Delay animation to wait for the welcome banner, but only if it's currently showing
  // Set to 0 since there is no welcome banner, preventing a 5.5s delay on page load
  const baseDelay = 0;

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: baseDelay }}
          >
            <span className="hero-badge">Sản phẩm chính hãng - Chất lượng đỉnh cao</span>
            <h1 className="hero-title">
              <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span> <br />
              <span className="highlight">MỞ RỘNG ĐẠI LÝ</span> <br />
              TOÀN QUỐC
            </h1>
            <p className="hero-description">
              Chúng tôi cung cấp các giải pháp cửa hiện đại: Cửa nhựa giả gỗ, Cửa Composite,
              Cửa gỗ công nghiệp và phụ kiện chính hãng. Mang vẻ đẹp sang trọng đến mọi công trình.
            </p>
            <div className="hero-btns">
              <motion.button 
                className="btn-primary hero-btn-premium" 
                onClick={() => navigate('/san-pham')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="btn-text">Xem sản phẩm <ArrowRight size={20} /></span>
                <div className="btn-shine"></div>
              </motion.button>
              <button className="btn-secondary" onClick={() => navigate('/lien-he')}>
                Liên hệ tư vấn
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: baseDelay + 0.2 }}
        >
          <div className="stat-item">
            <strong>10+</strong>
            <span>Năm kinh nghiệm</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <strong>1000+</strong>
            <span>Dự án hoàn thành</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <strong>50+</strong>
            <span>Đại lý toàn quốc</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
