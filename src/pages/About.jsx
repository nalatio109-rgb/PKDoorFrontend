import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, TrendingUp, Users, Award, ArrowRight, ClipboardList, Ruler, HardHat, Truck, Shield } from 'lucide-react';
import './About.css';
import showroomImg from '../assets/1.png';
import compositeDoorImg from '../assets/composite-door.png';
import plasticDoorImg from '../assets/plastic-door.png';
import steelDoorImg from '../assets/steel-door.png';
import woodDoorImg from '../assets/wood-door.png';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const advantages = [
    { icon: <ShieldCheck size={24} />, title: "Chống ẩm tuyệt đối", desc: "Kháng nước 100%, không cong vênh, co ngót.", shortDesc: "Kháng nước 100%, chống ẩm mốc." },
    { icon: <Award size={24} />, title: "Độ bền vượt trội", desc: "Phù hợp với khí hậu khắc nghiệt của Việt Nam.", shortDesc: "Bền bỉ, thích hợp khí hậu Việt Nam." },
    { icon: <Zap size={24} />, title: "Mẫu mã đa dạng", desc: "Luôn cập nhật xu hướng nội thất mới nhất.", shortDesc: "Mẫu mã cập nhật xu hướng mới nhất." },
    { icon: <ShieldCheck size={24} />, title: "Thi công nhanh", desc: "Đóng mở êm ái, dễ dàng lắp đặt tại công trình.", shortDesc: "Đóng mở êm ái, lắp đặt dễ dàng." }
  ];

  const steps = [
    { icon: <ClipboardList size={22} />, step: "01", title: "Tư vấn & Báo giá", shortTitle: "Tư vấn", desc: "Tư vấn mẫu mã Catalogue và báo giá chi tiết, tối ưu chi phí.", shortDesc: "Tư vấn báo giá nhanh chóng." },
    { icon: <Ruler size={22} />, step: "02", title: "Khảo sát đo đạc", shortTitle: "Đo đạc", desc: "Đo đạc kích thước ô chờ tại công trình và đối chiếu màu thực tế.", shortDesc: "Khảo sát kích thước ô chờ." },
    { icon: <HardHat size={22} />, step: "03", title: "Gia công sản xuất", shortTitle: "Sản xuất", desc: "Sản xuất cửa đúng số đo tại xưởng, bảo đảm độ thẩm mỹ.", shortDesc: "Gia công cửa tại xưởng." },
    { icon: <Truck size={22} />, step: "04", title: "Vận chuyển lắp đặt", shortTitle: "Lắp đặt", desc: "Vận chuyển và thi công lắp ráp nhanh chóng, bàn giao sạch sẽ.", shortDesc: "Thi công lắp ráp nhanh gọn." },
    { icon: <Shield size={22} />, step: "05", title: "Bàn giao bảo hành", shortTitle: "Bảo hành", desc: "Nghiệm thu công trình và kích hoạt bảo hành chính hãng 5 năm.", shortDesc: "Bàn giao & kích hoạt BH 5 năm." }
  ];

  const benefits = [
    {
      icon: <TrendingUp size={28} />,
      title: "Chiết khấu hấp dẫn",
      desc: "Chính sách chiết khấu cực cao trực tiếp từ nhà máy, giúp tối ưu hóa doanh thu và đem lại mức lợi nhuận hấp dẫn cho đối tác.",
      shortDesc: "Mức chiết khấu cực cao trực tiếp từ nhà máy giúp tối ưu hóa doanh thu.",
      image: compositeDoorImg,
      features: [
        "Mức chiết khấu cao vượt trội trực tiếp từ nhà máy.",
        "Chính sách thưởng doanh số năm vô cùng hấp dẫn.",
        "Không áp lực doanh số trong những tháng đầu."
      ]
    },
    {
      icon: <Users size={28} />,
      title: "Hỗ trợ truyền thông",
      desc: "Cung cấp miễn phí bảng hiệu đại lý chuyên nghiệp, thiết kế kệ trưng bày cửa mẫu cao cấp và Catalogue giới thiệu sản phẩm.",
      shortDesc: "Cung cấp miễn phí bảng hiệu, kệ mẫu và Catalogue quảng bá.",
      image: plasticDoorImg,
      features: [
        "Tặng bảng hiệu đại lý, catalogue giới thiệu sản phẩm.",
        "Hỗ trợ chi phí lắp đặt kệ trưng bày cửa mẫu cao cấp.",
        "Hỗ trợ chạy quảng cáo, chuyển giao khách hàng khu vực."
      ]
    },
    {
      icon: <HardHat size={28} />,
      title: "Đào tạo kỹ thuật",
      desc: "Hỗ trợ đào tạo đội ngũ kỹ thuật viên lắp đặt cửa tiêu chuẩn và tư vấn các kỹ năng bán hàng, chăm sóc khách hàng hiệu quả.",
      shortDesc: "Đào tạo kỹ thuật viên lắp đặt chuẩn và kỹ năng bán hàng hiệu quả.",
      image: steelDoorImg,
      features: [
        "Hướng dẫn đo đạc, khảo sát ô chờ chuẩn xác 100%.",
        "Đào tạo lắp đặt hoàn thiện trực tiếp tại công trình.",
        "Chia sẻ kỹ năng tư vấn chốt đơn & CSKH hiệu quả."
      ]
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Bảo hành uy tín",
      desc: "Chính sách bảo hành sản phẩm dài hạn lên đến 5 năm từ nhà sản xuất, hỗ trợ xử lý kỹ thuật phát sinh nhanh chóng trong 24 giờ.",
      shortDesc: "Bảo hành dài hạn 5 năm, xử lý sự cố nhanh trong 24 giờ.",
      image: woodDoorImg,
      features: [
        "Thời gian bảo hành dài hạn lên đến 5 năm thân cửa.",
        "Hỗ trợ xử lý nhanh mọi sự cố kỹ thuật trong 24 giờ.",
        "Thay thế linh phụ kiện chính hãng hoàn toàn miễn phí."
      ]
    }
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
            <h1><span className="brand-pk">PK</span> <span className="brand-door">DOOR</span> Mở rộng đại lý <br />Toàn Quốc</h1>
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
              <span className="subtitle-small">Thương hiệu uy tín</span>
              <h2>Về Công Ty <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span></h2>
              <p>
                <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span> tự hào là thương hiệu hàng đầu tại Đà Nẵng và miền Trung chuyên cung cấp, thi công trọn gói các dòng cửa nhựa giả gỗ cao cấp.
              </p>
              <p>
                Thành lập từ năm 2021, chúng tôi khẳng định uy tín bằng sản phẩm chất lượng vượt trội, thiết kế hiện đại cùng phong cách phục vụ tận tâm, chu đáo.
              </p>
              <div className="location-info">
                <p>📍 <strong>Trụ sở & Xưởng sản xuất chính:</strong> Tổ 24, Khối phố Hà Bản, Phường Điện Bàn Đông, Thị xã Điện Bàn, Quảng Nam (giáp ranh Đà Nẵng).</p>
                <p>📍 <strong>Showroom trưng bày:</strong> Phú Thượng, Hoà Khánh, Liên Chiểu, TP. Đà Nẵng.</p>
              </div>
            </motion.div>
            <motion.div
              className="intro-image"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="image-stack">
                <img src={showroomImg} alt="PK Door Showroom" />
                <div className="floating-card">
                  <Award size={18} color="var(--primary-blue)" />
                  <strong>Chính Hãng 100%</strong>
                  <span>Bảo hành lên tới 5 năm</span>
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
                initial={{ opacity: 0, x: index < 2 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="adv-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{isMobile ? item.shortDesc : item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="about-process section-padding">
        <div className="container">
          <div className="section-header-center">
            <span className="subtitle">Quy trình làm việc</span>
            <h2>Dịch vụ thi công trọn gói 5 bước</h2>
          </div>
          <div className="process-timeline">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                className="process-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
                viewport={{ once: true }}
              >
                <div className="process-num">{item.step}</div>
                <div className="process-icon">{item.icon}</div>
                <h3>{isMobile ? item.shortTitle : item.title}</h3>
                {!isMobile && <p>{item.desc}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section Redesign */}
      <section className="about-benefits section-padding">
        <div className="container">
          <div className="section-header-center">
            <span className="subtitle">Hợp tác cùng phát triển</span>
            <h2>Chính Sách Hỗ Trợ Đại Lý</h2>
          </div>
          <div className="benefits-rows-container">
            {benefits.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className={`benefit-row ${isEven ? 'row-normal' : 'row-reversed'}`}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="benefit-text-col">
                    <div className="benefit-title-wrapper">
                      <div className="benefit-icon-box">{item.icon}</div>
                      <h3>{item.title}</h3>
                    </div>
                    <p className="benefit-description">{isMobile ? item.shortDesc : item.desc}</p>
                    {!isMobile && (
                      <ul className="benefit-features-list">
                        {item.features.map((feature, fIdx) => (
                          <li key={fIdx}>
                            <span className="check-bullet">✦</span> {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <div className="benefit-image-col">
                    <div className="benefit-image-glow" />
                    <div className="benefit-image-wrapper">
                      <img src={item.image} alt={item.title} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.div
            className="benefits-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button className="btn-contact-about" onClick={() => navigate('/contact')}>
              Đăng ký hợp tác đại lý ngay <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
