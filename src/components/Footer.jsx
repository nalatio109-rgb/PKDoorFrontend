import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Share2, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span>
          </Link>
          <p className="footer-slogan">
            Cửa nhựa gỗ Đà Nẵng - <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span>. Giải pháp cửa toàn diện cho ngôi nhà hiện đại.
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/cuanhuagodanang" target="_blank" rel="noopener noreferrer" className="social-icon"><Share2 size={20} /></a>
            <a href="https://zalo.me/0905943679" className="social-icon"><MessageCircle size={20} /></a>
            <a href="mailto:contact@pkdoor.vn" className="social-icon"><Mail size={20} /></a>
          </div>
        </div>

        {/* Contact Column */}
        <div className="footer-col contact-col">
          <h3>Thông tin liên hệ</h3>
          <div className="contact-item">
            <Phone size={18} className="text-blue" />
            <div className="contact-details">
              <a href="tel:0905943679">0905 943 679</a>
              <a href="tel:0905289477">0905 289 477</a>
            </div>
          </div>
          <div className="contact-item">
            <MapPin size={18} className="text-red" />
            <div className="contact-details">
              <p><strong>Cơ sở 1:</strong> Phú Thượng, Hoà Khánh, TP. Đà Nẵng</p>
              <p><strong>Cơ sở 2:</strong> Khối phố Hà Bản, P. Điện Bàn Đông, TP. Đà Nẵng</p>
            </div>
          </div>
        </div>

        {/* Links Column */}
        <div className="footer-col links-col">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><Link to="/"><ArrowRight size={14} /> Trang chủ</Link></li>
            <li><Link to="/products"><ArrowRight size={14} /> Sản phẩm</Link></li>
            <li><Link to="/about"><ArrowRight size={14} /> Tuyển đại lý</Link></li>
            <li><Link to="/news"><ArrowRight size={14} /> Tin tức</Link></li>
          </ul>
        </div>

        {/* Newsletter/Trust Column */}
        <div className="footer-col trust-col">
          <h3>Đăng ký tư vấn</h3>
          <p>Nhận báo giá và tư vấn mẫu cửa mới nhất từ <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span>.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Email của bạn" />
            <button className="btn-send-footer"><ArrowRight size={20} /></button>
          </div>
          <div className="trust-badges">
            <div className="badge">Chất lượng cao</div>
            <div className="badge">Giá cạnh tranh</div>
          </div>
        </div>
      </div>

      {/* <div className="footer-bottom">
        <div className="container">
          <p>© 2024 <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span>. Thiết kế bởi PK Team. Tất cả quyền lợi được bảo hộ.</p>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
