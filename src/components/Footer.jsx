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
          </ul>
        </div>

        {/* Map Column */}
        <div className="footer-col map-col">
          <h3>Vị trí showroom</h3>
          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.123456789!2d108.123456789!3d16.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219123456789%3A0x1234567890abcdef!2zUGjDuiBUaMaw4bufbmcsIEhvw6AgS2jDoW5oLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZywgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1234567890123"
              title="Bản đồ PK Door"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
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
