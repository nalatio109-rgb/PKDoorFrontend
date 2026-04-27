import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactSection from '../components/Contact';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [activeBranch, setActiveBranch] = useState(1);

  const branches = [
    {
      id: 1,
      name: "Cơ sở 1 - Phú Thượng",
      address: "Phú Thượng, Hoà Khánh, TP. Đà Nẵng",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.123456789!2d108.123456789!3d16.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219123456789%3A0x1234567890abcdef!2zUGjDuiBUaMaw4bufbmcsIEhvw6AgS2jDoW5oLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZywgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1234567890123"
    },
    {
      id: 2,
      name: "Cơ sở 2 - Hà Bản",
      address: "Khối phố Hà Bản, P. Điện Bàn Đông, TP. Đà Nẵng",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.123456789!2d108.223456789!3d15.923456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219123456789%3A0x1234567890abcdef!2zSGFidW4sIMSQaeG7h24gQsOgbiwgUXXhuqNuZyBOYW0sIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1234567890123"
    }
  ];

  return (
    <div className="contact-page">
      <Navbar alwaysSolid={true} />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="contact-hero-content"
          >
            <h1>Liên hệ với chúng tôi</h1>
            <p><span className="brand-pk">PK</span> <span className="brand-door">DOOR</span> luôn sẵn sàng hỗ trợ bạn kiến tạo không gian sống hoàn mỹ nhất.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section (Reusing existing component) */}
      <ContactSection />

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="section-header-center">
            <span className="subtitle">Vị trí của chúng tôi</span>
            <h2>Ghé thăm showroom <span className="brand-pk">PK</span> <span className="brand-door">DOOR</span></h2>
          </div>

          <div className="map-tabs">
            {branches.map(branch => (
              <button
                key={branch.id}
                className={`map-tab ${activeBranch === branch.id ? 'active' : ''}`}
                onClick={() => setActiveBranch(branch.id)}
              >
                <MapPin size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                {branch.name}
              </button>
            ))}
          </div>

          <motion.div
            key={activeBranch}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="map-container"
          >
            <iframe
              src={branches.find(b => b.id === activeBranch).mapUrl}
              title={branches.find(b => b.id === activeBranch).name}
              loading="lazy"
              allowFullScreen=""
            ></iframe>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
