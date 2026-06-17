import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Shield, Droplets, VolumeX } from 'lucide-react';
import doorImg from '../assets/composite-door.png';
import './Structure.css';

const Structure = () => {
  return (
    <section className="structure-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">Cấu tạo kỹ thuật</span>
          <h2 className="title">Bí Mật Bên Trong <span className="text-primary">Cửa Nhựa Gỗ Composite</span></h2>
          <p className="description" style={{ margin: '0 auto', maxWidth: '600px' }}>
            Khám phá kết cấu đa lớp tạo nên sự bền bỉ vượt thời gian, chống nước tuyệt đối và khả năng cách âm hoàn hảo.
          </p>
        </div>

        <div className="structure-grid">
          <motion.div 
            className="structure-features left-features"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="layer-card">
              <div className="layer-icon"><Layers size={24} /></div>
              <div className="layer-info">
                <h3>01. Bề mặt phủ Phim PVC</h3>
                <p>Màng phim vân gỗ cao cấp chống trầy xước, không bám bẩn, dễ lau chùi và mô phỏng vân gỗ thật 99%.</p>
              </div>
            </div>
            
            <div className="layer-card">
              <div className="layer-icon"><Shield size={24} /></div>
              <div className="layer-info">
                <h3>02. Lõi Nhựa Gỗ Composite</h3>
                <p>Sự pha trộn hoàn hảo giữa bột gỗ vụn và nhựa PVC nguyên sinh, đúc đùn nguyên khối chịu lực cực tốt.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="structure-image"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="image-glow"></div>
            <img src={doorImg} alt="Cấu tạo cửa Composite" />
          </motion.div>

          <motion.div 
            className="structure-features right-features"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="layer-card">
              <div className="layer-icon"><Droplets size={24} /></div>
              <div className="layer-info">
                <h3>03. Chống Nước Tuyệt Đối</h3>
                <p>Cấu trúc hạt nhựa bao bọc hạt gỗ giúp cửa kháng nước 100%, không cong vênh hay mối mọt khi dùng cho nhà tắm.</p>
              </div>
            </div>
            
            <div className="layer-card">
              <div className="layer-icon"><VolumeX size={24} /></div>
              <div className="layer-info">
                <h3>04. Gioăng Cao Su Chống Ồn</h3>
                <p>Hệ thống gioăng cao su chạy dọc khung bao giúp cửa đóng mở êm ái và cách âm hiệu quả cho không gian phòng ngủ.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Structure;
