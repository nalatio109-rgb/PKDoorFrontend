import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import showroomImg from '../assets/1.png';
import './AboutHome.css';

const AboutHome = () => {
  return (
    <section className="about-home section-padding">
      <div className="container">
        <div className="about-home-grid">
          <motion.div 
            className="about-home-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src={showroomImg} alt="PK Door Showroom" />
            <div className="experience-badge">
              <strong>10+</strong>
              <span>Năm kinh nghiệm</span>
            </div>
          </motion.div>

          <motion.div 
            className="about-home-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="subtitle">Về chúng tôi</span>
            <h2>Giải pháp cửa hoàn hảo cho <span className="text-primary">mọi công trình</span></h2>
            <p>
              <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span> tự hào là đơn vị hàng đầu cung cấp các dòng cửa nhựa giả gỗ, cửa Composite và cửa gỗ công nghiệp chất lượng cao. Chúng tôi không chỉ bán cửa, chúng tôi mang đến sự an tâm và vẻ đẹp bền vững cho ngôi nhà của bạn.
            </p>

            <div className="about-home-features">
              <motion.div className="feature-glass-card" whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="feature-icon"><ShieldCheck size={20} /></div>
                <span>Chống ẩm tuyệt đối</span>
              </motion.div>
              <motion.div className="feature-glass-card" whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="feature-icon"><Award size={20} /></div>
                <span>Độ bền vượt trội</span>
              </motion.div>
              <motion.div className="feature-glass-card" whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="feature-icon"><Zap size={20} /></div>
                <span>Thi công nhanh chóng</span>
              </motion.div>
              <motion.div className="feature-glass-card" whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="feature-icon"><CheckCircle size={20} /></div>
                <span>Bảo hành chính hãng</span>
              </motion.div>
            </div>

            <Link to="/about" className="btn-more">
              Tìm hiểu thêm về chúng tôi <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHome;
