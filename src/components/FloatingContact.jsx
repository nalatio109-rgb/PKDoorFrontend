import React from 'react';
import { useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import './FloatingContact.css';

const FacebookIcon = ({ size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const FloatingContact = () => {
  const location = useLocation();
  const phoneNumber = "0905943679";
  const zaloLink = `https://zalo.me/${phoneNumber}`;
  const facebookLink = "https://www.facebook.com/cuanhuagodanang";

  // Không hiển thị trên trang Admin
  if (location.pathname === '/admin') return null;

  return (
    <div className="floating-contact">
      <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="floating-btn facebook" title="Facebook">
        <FacebookIcon size={24} />
        <span className="tooltip">Facebook</span>
      </a>
      
      <a href={zaloLink} target="_blank" rel="noopener noreferrer" className="floating-btn zalo" title="Zalo">
        <div className="zalo-icon">Z</div>
        <span className="tooltip">Zalo</span>
      </a>
      
      <a href={`tel:${phoneNumber}`} className="floating-btn phone" title="Hotline">
        <div className="phone-animation">
            <Phone size={24} />
        </div>
        <span className="tooltip">0905.943.679</span>
      </a>
    </div>
  );
};

export default FloatingContact;
