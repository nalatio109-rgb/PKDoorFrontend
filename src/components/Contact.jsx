import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', phone: '', category: '', message: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        throw new Error('Gửi yêu cầu thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      setStatus({ loading: false, success: false, error: error.message });
    }
  };

  return (
    <section className="contact section-padding" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="subtitle">Liên hệ ngay</span>
            <h2 className="title"><span className="brand-pk">PK</span> <span className="brand-door">DOOR</span> - Đồng hành <br /><span className="text-primary">cùng công trình</span> của bạn</h2>
            <p className="description">
              Chúng tôi luôn sẵn sàng lắng nghe và tư vấn giải pháp tốt nhất cho ngôi nhà của bạn.
            </p>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon"><MapPin size={24} /></div>
                <div className="info-text">
                  <h4>Địa chỉ CS 1</h4>
                  <p>Phú Thượng, Hoà Khánh, TP. Đà Nẵng</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><MapPin size={24} /></div>
                <div className="info-text">
                  <h4>Địa chỉ CS 2</h4>
                  <p>Khối phố Hà Bản, P. Điện Bàn Đông, TP. Đà Nẵng</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Phone size={24} /></div>
                <div className="info-text">
                  <h4>Hotline</h4>
                  <p>0905 943 679</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Clock size={24} /></div>
                <div className="info-text">
                  <h4>Giờ làm việc</h4>
                  <p>Thứ 2 - Chủ Nhật: 07:30 - 21:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container glass">
            {status.success ? (
              <div className="success-message">
                <CheckCircle size={60} color="#22c55e" />
                <h3>Gửi yêu cầu thành công!</h3>
                <p>Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
                <button onClick={() => setStatus({ ...status, success: false })} className="btn-primary">Gửi tin nhắn khác</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Gửi tin nhắn cho chúng tôi</h3>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Họ và tên" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email của bạn" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Số điện thoại" 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn loại cửa quan tâm</option>
                    <option value="plastic">Cửa nhựa giả gỗ</option>
                    <option value="wood">Cửa gỗ công nghiệp</option>
                    <option value="composite">Cửa Composite</option>
                    <option value="steel">Cửa thép vân gỗ</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea 
                    name="message"
                    placeholder="Lời nhắn của bạn" 
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                {status.error && <p className="error-text">{status.error}</p>}
                
                <button type="submit" className="btn-primary w-full" disabled={status.loading}>
                  {status.loading ? 'Đang gửi...' : 'Gửi yêu cầu'} <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
