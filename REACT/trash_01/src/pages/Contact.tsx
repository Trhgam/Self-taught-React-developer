import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button, Input } from '../components/UI';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="contact-hero">
        <h1>Liên Hệ</h1>
        <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
      </section>

      <div className="contact-container">
        {/* Contact Info */}
        <div className="contact-info">
          <h2>Thông Tin Liên Hệ</h2>
          
          <div className="info-item">
            <MapPin size={24} />
            <div>
              <h4>Địa Chỉ</h4>
              <p>123 Nguyễn Huệ, Quận 1</p>
              <p>TP. Hồ Chí Minh, Việt Nam</p>
            </div>
          </div>

          <div className="info-item">
            <Phone size={24} />
            <div>
              <h4>Điện Thoại</h4>
              <p>Hotline: 1900 1234 56</p>
              <p>Tư vấn: 028 1234 5678</p>
            </div>
          </div>

          <div className="info-item">
            <Mail size={24} />
            <div>
              <h4>Email</h4>
              <p>info@optivision.vn</p>
              <p>support@optivision.vn</p>
            </div>
          </div>

          <div className="info-item">
            <Clock size={24} />
            <div>
              <h4>Giờ Làm Việc</h4>
              <p>Thứ 2 - Thứ 6: 8:00 - 21:00</p>
              <p>Thứ 7 - Chủ nhật: 9:00 - 20:00</p>
            </div>
          </div>

          {/* Map */}
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197145!2d106.70142517481873!3d10.778789189375753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc7%3A0x4db964d76bf6e18e!2sNguyen%20Hue%20Walking%20Street!5e0!3m2!1sen!2s!4v1704624000000!5m2!1sen!2s"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              title="OptiVision Location"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-wrapper">
          <h2>Gửi Tin Nhắn</h2>
          
          {submitted ? (
            <div className="form-success">
              <Send size={48} />
              <h3>Gửi thành công!</h3>
              <p>Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
              <Button onClick={() => setSubmitted(false)}>Gửi tin nhắn khác</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <Input
                  label="Họ và tên"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Nhập họ tên"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@example.com"
                />
              </div>

              <div className="form-row">
                <Input
                  label="Số điện thoại"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0912 345 678"
                />
                <div className="input-wrapper">
                  <label className="input-label">Chủ đề</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="product">Hỏi về sản phẩm</option>
                    <option value="order">Thông tin đơn hàng</option>
                    <option value="warranty">Bảo hành</option>
                    <option value="complaint">Khiếu nại</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>

              <div className="input-wrapper">
                <label className="input-label">Nội dung</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Nhập nội dung tin nhắn..."
                  className="input"
                />
              </div>

              <Button variant="primary" size="lg" fullWidth type="submit">
                <Send size={18} />
                Gửi tin nhắn
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
