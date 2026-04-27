import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Zap, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';
import './About.css';

import Footer from '../components/Footer';

const About = () => {
  const advantages = [
    { icon: <ShieldCheck size={24} />, title: "Chống ẩm tuyệt đối", desc: "Kháng nước 100%, không cong vênh, co ngót." },
    { icon: <Award size={24} />, title: "Độ bền vượt trội", desc: "Phù hợp với khí hậu khắc nghiệt của Việt Nam." },
    { icon: <Zap size={24} />, title: "Mẫu mã đa dạng", desc: "Luôn cập nhật xu hướng nội thất mới nhất." },
    { icon: <CheckCircle size={24} />, title: "Thi công nhanh", desc: "Đóng mở êm ái, dễ dàng lắp đặt tại công trình." }
  ];

  const benefits = [
    "Chiết khấu cực cao, lợi nhuận hấp dẫn.",
    "Hỗ trợ bảng hiệu, kệ trưng bày và catalogue.",
    "Đào tạo kỹ thuật lắp đặt và tư vấn bán hàng.",
    "Chính sách bảo hành chính hãng, uy tín."
  ];

  return (
    <div className="about-page">
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-hero-content"
          >
            <span className="opportunity-badge">🔥 Cơ hội kinh doanh vàng</span>
            <h1><span className="brand-pk">PK</span> <span className="brand-door">DOOR</span> Mở rộng đại lý Toàn Quốc</h1>
            <p className="sub-headline">CHÍNH SÁCH TỐT - GIÁ CẠNH TRANH - LỢI NHUẬN HẤP DẪN</p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="about-intro section-padding">
        <div className="container">
          <div className="intro-grid">
            <motion.div
              className="intro-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>Bạn đang tìm kiếm nguồn cửa ổn định?</h2>
              <p>
                Bạn đang kinh doanh vật liệu xây dựng, nội thất nhưng chưa có nguồn cửa nhựa ổn định?
                <strong> <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span></strong> chính thức tuyển đại lý trên toàn quốc với mong muốn mang đến những giải pháp
                cửa chất lượng nhất cho mọi công trình.
              </p>
              <div className="product-tags">
                <span className="tag">🚪 Cửa nhựa PPC</span>
                <span className="tag">🚪 Cửa nhựa gỗ Composite</span>
              </div>
              <p className="applications">
                Sản phẩm phù hợp cho: <strong>Nhà phố, căn hộ, công trình dân dụng...</strong>
              </p>
            </motion.div>
            <motion.div
              className="intro-image"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="image-stack">
                <img src="https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800" alt="Showroom" className="main-img" />
                <div className="floating-card">
                  <TrendingUp size={32} color="var(--primary-blue)" />
                  <strong>+50%</strong>
                  <span>Tăng trưởng doanh thu</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="about-advantages section-padding">
        <div className="container">
          <div className="section-header-center">
            <span className="subtitle">Tại sao chọn <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span>?</span>
            <h2>Ưu điểm nổi bật của sản phẩm</h2>
          </div>
          <div className="advantages-grid">
            {advantages.map((item, index) => (
              <motion.div
                key={index}
                className="advantage-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="adv-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="about-benefits section-padding">
        <div className="container">
          <div className="benefits-box">
            <div className="benefits-content">
              <h2>Khi trở thành đại lý <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span>, bạn sẽ nhận được:</h2>
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle size={20} className="text-blue" /> {benefit}
                  </motion.li>
                ))}
              </ul>
              <button className="btn-contact-about">
                Đăng ký đại lý ngay <ArrowRight size={20} />
              </button>
            </div>
            <div className="benefits-visual">
              <div className="visual-circle">
                <Users size={64} color="#fff" />
                <span>Mạng lưới toàn quốc</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
