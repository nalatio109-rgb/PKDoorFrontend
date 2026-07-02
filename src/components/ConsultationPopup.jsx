import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ConsultationPopup.css';

const ConsultationPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);
  
  // Form state
  const [doorType, setDoorType] = useState('');
  const [doorColor, setDoorColor] = useState('');

  useEffect(() => {
    // Show after 12 seconds when user enters the site
    const timer = setTimeout(() => {
      if (!hasClosed) {
        setIsVisible(true);
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, [hasClosed]);

  const handleClose = () => {
    setIsVisible(false);
    setHasClosed(true);
  };

  const handleZaloClick = () => {
    let message = "Chào PK-Door, mình cần tư vấn làm cửa.";
    if (doorType || doorColor) {
      message = `Chào PK-Door, mình cần tư vấn làm ${doorType || 'cửa'}${doorColor ? `, tông màu ${doorColor}` : ''}.`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://zalo.me/0905943679?text=${encodedMessage}`, '_blank');
    handleClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="consultation-popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div 
            className="consultation-popup"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close-btn" onClick={handleClose}>&times;</button>
            
            <div className="popup-header">
              <div className="popup-icon">📝</div>
              <h3 className="popup-title">Nhận Tư Vấn Nhanh</h3>
            </div>
            
            <div className="popup-body">
              <p className="popup-intro">Vui lòng chọn thông tin để chuyên gia của chúng tôi hỗ trợ bạn tốt nhất!</p>
              
              <div className="popup-form-group">
                <label>Vị trí lắp cửa</label>
                <select value={doorType} onChange={(e) => setDoorType(e.target.value)} className="popup-select">
                  <option value="">-- Chọn vị trí --</option>
                  <option value="cửa phòng ngủ">Cửa phòng ngủ</option>
                  <option value="cửa nhà vệ sinh">Cửa nhà vệ sinh</option>
                  <option value="cửa chính">Cửa chính / Cửa đi</option>
                  <option value="nhiều loại cửa khác nhau">Đang phân vân / Cần tư vấn nhiều loại</option>
                </select>
              </div>

              <div className="popup-form-group">
                <label>Tông màu yêu thích</label>
                <div className="color-swatches">
                  {[
                    { id: 'vân gỗ sáng', name: 'Gỗ Sáng', bg: 'linear-gradient(135deg, #e6b981, #c89666)' },
                    { id: 'gỗ óc chó', name: 'Óc Chó', bg: 'linear-gradient(135deg, #5c4033, #3e2723)' },
                    { id: 'gỗ đỏ', name: 'Gỗ Đỏ', bg: 'linear-gradient(135deg, #8B3A3A, #5C2424)' },
                    { id: 'trắng sứ', name: 'Trắng Sứ', bg: '#fdfdfd', border: '1px solid #dfe6e9' },
                    { id: 'màu kem', name: 'Màu Kem', bg: '#F5E6D3', border: '1px solid #dfe6e9' },
                    { id: 'xám nhạt', name: 'Xám', bg: '#95a5a6' },
                    { id: 'đen nhám', name: 'Đen Nhám', bg: '#2d3436' },
                    { id: 'màu khác', name: 'Màu Khác', bg: 'conic-gradient(from 90deg, #ff9a9e, #fecfef, #a1c4fd, #c2e9fb, #ff9a9e)' }
                  ].map(color => (
                    <div 
                      key={color.id}
                      className={`color-swatch-item ${doorColor === color.id ? 'active' : ''}`}
                      onClick={() => setDoorColor(color.id)}
                    >
                      <div className="color-circle" style={{ background: color.bg, border: color.border || 'none' }}>
                        {doorColor === color.id && <span className={`check-icon ${['trắng sứ', 'màu kem'].includes(color.id) ? 'dark-check' : ''}`}>✓</span>}
                      </div>
                      <span className="color-name">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <button className="popup-cta-btn" onClick={handleZaloClick}>
              Gửi Thông Tin Nhận Tư Vấn
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationPopup;
