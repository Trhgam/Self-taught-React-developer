import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-icon">👓</span>
              <span className="logo-text">OptiVision</span>
            </Link>
            <p className="footer-description">
              Chúng tôi mang đến cho bạn những sản phẩm kính mắt chất lượng cao 
              từ các thương hiệu hàng đầu thế giới với giá cả hợp lý.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-title">Liên Kết Nhanh</h4>
            <ul>
              <li><Link to="/products">Tất Cả Sản Phẩm</Link></li>
              <li><Link to="/products?category=sunglasses">Kính Mát</Link></li>
              <li><Link to="/products?category=eyeglasses">Kính Cận</Link></li>
              <li><Link to="/products?category=sports">Kính Thể Thao</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-links">
            <h4 className="footer-title">Hỗ Trợ Khách Hàng</h4>
            <ul>
              <li><Link to="/about">Về Chúng Tôi</Link></li>
              <li><Link to="/contact">Liên Hệ</Link></li>
              <li><a href="#">Chính Sách Đổi Trả</a></li>
              <li><a href="#">Hướng Dẫn Mua Hàng</a></li>
              <li><a href="#">Câu Hỏi Thường Gặp</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4 className="footer-title">Liên Hệ</h4>
            <div className="contact-item">
              <MapPin size={18} />
              <span>123 Nguyễn Huệ, Quận 1, TP.HCM</span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>1900 1234 56</span>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <span>info@optivision.vn</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; 2026 OptiVision. Tất cả quyền được bảo lưu.</p>
          <div className="footer-bottom-links">
            <a href="#">Điều Khoản Sử Dụng</a>
            <a href="#">Chính Sách Bảo Mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
