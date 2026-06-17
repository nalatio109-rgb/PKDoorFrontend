import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectsGallery.css';

import cua1 from '../assets/cua1.jpg';
import cua2 from '../assets/cua2.jpg';
import cua3 from '../assets/cua3.jpg';
import cua4 from '../assets/cua4.png';
import cua5 from '../assets/cua5.png';
import cua6 from '../assets/cua6.png';

const ProjectsGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Cửa Gỗ Hiện Đại Vân Sồi",
      location: "Biệt thự Vinhomes Riverside",
      image: cua1,
      description: "Thiết kế phẳng kết hợp dải kính dọc mang đậm phong cách Bauhaus hiện đại. Tone màu nâu xám lạnh tạo cảm giác sang trọng, thời thượng, đặc biệt phù hợp với các không gian sống cao cấp.",
      tags: ["Cửa thông phòng", "Hiện đại", "Có ô kính"]
    },
    {
      id: 2,
      title: "Cửa Căn Hộ Tone Sáng",
      location: "Căn hộ Masteri Thảo Điền",
      image: cua2,
      description: "Sắc vàng gỗ sồi ấm áp kết hợp cùng các đường vân tự nhiên chân thực. Mẫu cửa này giúp không gian trở nên sáng sủa, rộng rãi hơn và rất dễ phối hợp với các món đồ nội thất hiện đại.",
      tags: ["Vân gỗ sồi", "Chống ẩm", "Tone sáng"]
    },
    {
      id: 3,
      title: "Cửa Phòng Tắm Phẳng Trắng",
      location: "Nhà phố KĐT Vạn Phúc",
      image: cua3,
      description: "Mẫu cửa trắng tinh khôi theo xu hướng Minimalism tối giản. Bề mặt phủ sơn inchem cao cấp chống nước hoàn hảo, đi kèm phụ kiện bản lề và tay nắm đen nhám tạo điểm nhấn tương phản cực kỳ cuốn hút.",
      tags: ["Phong cách tối giản", "Màu trắng", "Chống nước"]
    },
    {
      id: 4,
      title: "Cửa Đôi Cánh Gỗ Tự Nhiên",
      location: "Khách sạn Boutique Đà Lạt",
      image: cua4,
      description: "Hệ cửa đôi sang trọng với chất liệu giả gỗ chân thực đến từng thớ vân. Khả năng cách âm tuyệt vời lên tới 40dB, mang lại không gian yên tĩnh tuyệt đối cho các công trình nghỉ dưỡng.",
      tags: ["Cửa đôi", "Khách sạn", "Cách âm"]
    },
    {
      id: 5,
      title: "Cửa Thông Phòng Basic",
      location: "Văn phòng Tech Startup",
      image: cua5,
      description: "Sự lựa chọn hoàn hảo cho môi trường văn phòng năng động. Tone màu gỗ vàng ấm mang lại cảm giác thân thiện, kết hợp cùng phào chỉ phẳng hiện đại, tinh gọn và tối đa hóa công năng.",
      tags: ["Văn phòng", "Bền bỉ", "Giá tốt"]
    },
    {
      id: 6,
      title: "Cửa Trắng Cổ Điển Tân Thời",
      location: "Khu nghỉ dưỡng Nha Trang",
      image: cua6,
      description: "Sự giao thoa hoàn hảo giữa nét cổ điển và hiện đại. Điểm nhấn là các đường pano dập nổi thanh lịch trên nền trắng, thích hợp cho các không gian mang phong cách Tân cổ điển (Neoclassic).",
      tags: ["Tân cổ điển", "Pano dập nổi", "Màu trắng"]
    }
  ];

  return (
    <section className="projects-gallery section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">Dự án tiêu biểu</span>
          <h2 className="title">Hình Ảnh <span className="text-primary">Thi Công Thực Tế</span></h2>
          <p className="description" style={{ margin: '0 auto', maxWidth: '600px' }}>
            Hàng ngàn bộ cửa đã được lắp đặt hoàn thiện, mang lại vẻ đẹp sang trọng và sự an tâm tuyệt đối cho khách hàng trên toàn quốc.
          </p>
        </div>

        <div className="custom-projects-layout">
          <div className="layout-top">
            <div className="layout-left">
              <motion.div 
                className="gallery-item-natural"
                onClick={() => setSelectedProject(projects[0])}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                <img src={projects[0].image} alt="Project 1" />
              </motion.div>
            </div>
            <div className="layout-right">
              <motion.div 
                className="gallery-item-natural"
                onClick={() => setSelectedProject(projects[1])}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              >
                <img src={projects[1].image} alt="Project 2" />
              </motion.div>
              <motion.div 
                className="gallery-item-natural"
                onClick={() => setSelectedProject(projects[2])}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              >
                <img src={projects[2].image} alt="Project 3" />
              </motion.div>
            </div>
          </div>
          <div className="layout-bottom">
            <motion.div 
              className="gallery-item-natural"
              onClick={() => setSelectedProject(projects[3])}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            >
              <img src={projects[3].image} alt="Project 4" />
            </motion.div>
            <motion.div 
              className="gallery-item-natural"
              onClick={() => setSelectedProject(projects[4])}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            >
              <img src={projects[4].image} alt="Project 5" />
            </motion.div>
            <motion.div 
              className="gallery-item-natural"
              onClick={() => setSelectedProject(projects[5])}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            >
              <img src={projects[5].image} alt="Project 6" />
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="project-modal-content"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal-btn" onClick={() => setSelectedProject(null)}>
                &times;
              </button>
              <div className="modal-body">
                <div className="modal-image">
                  <img src={selectedProject.image} alt={selectedProject.title} />
                </div>
                <div className="modal-info">
                  <span className="modal-location">📍 {selectedProject.location}</span>
                  <h3 className="modal-title">{selectedProject.title}</h3>
                  <p className="modal-desc">{selectedProject.description}</p>
                  <div className="modal-tags">
                    {selectedProject.tags.map((tag, idx) => (
                      <span key={idx} className="modal-tag">{tag}</span>
                    ))}
                  </div>
                  <button 
                    className="btn btn-primary modal-cta"
                    onClick={() => window.open('https://zalo.me/0905943679', '_blank')}
                  >
                    Liên Hệ Ngay
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsGallery;
