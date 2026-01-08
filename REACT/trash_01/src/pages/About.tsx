import React from 'react';
import { Award, Users, Eye, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <h1>Về Chúng Tôi</h1>
        <p>Nơi phong cách gặp gỡ tầm nhìn hoàn hảo</p>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="story-content">
          <h2>Câu Chuyện OptiVision</h2>
          <p>
            Ra đời từ năm 2015, OptiVision được thành lập với sứ mệnh mang đến cho 
            người Việt Nam những sản phẩm kính mắt chất lượng cao từ các thương hiệu 
            hàng đầu thế giới với giá cả hợp lý.
          </p>
          <p>
            Sau gần 10 năm hoạt động, chúng tôi tự hào là đối tác phân phối chính thức 
            của hơn 50 thương hiệu kính mắt nổi tiếng như Ray-Ban, Gucci, Tom Ford, 
            Oakley, Gentle Monster và nhiều thương hiệu khác.
          </p>
          <p>
            Với đội ngũ chuyên viên được đào tạo bài bản và trang thiết bị đo mắt 
            hiện đại, chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất và 
            dịch vụ chăm sóc khách hàng tận tâm.
          </p>
        </div>
        <div className="story-image">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600" 
            alt="OptiVision Store"
          />
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <h2>Giá Trị Cốt Lõi</h2>
        <div className="values-grid">
          <div className="value-item">
            <Award size={40} />
            <h3>Chất Lượng</h3>
            <p>100% sản phẩm chính hãng từ các thương hiệu uy tín</p>
          </div>
          <div className="value-item">
            <Eye size={40} />
            <h3>Chuyên Nghiệp</h3>
            <p>Đội ngũ tư vấn viên được đào tạo chuyên sâu</p>
          </div>
          <div className="value-item">
            <Heart size={40} />
            <h3>Tận Tâm</h3>
            <p>Dịch vụ chăm sóc khách hàng chu đáo, nhiệt tình</p>
          </div>
          <div className="value-item">
            <Users size={40} />
            <h3>Khách Hàng</h3>
            <p>Hơn 100,000 khách hàng tin tưởng lựa chọn</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="stat-item">
          <span className="stat-number">10+</span>
          <span className="stat-label">Năm kinh nghiệm</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50+</span>
          <span className="stat-label">Thương hiệu</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100K+</span>
          <span className="stat-label">Khách hàng</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">15</span>
          <span className="stat-label">Cửa hàng</span>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <h2>Đội Ngũ Của Chúng Tôi</h2>
        <p>
          Với đội ngũ hơn 100 nhân viên được đào tạo chuyên nghiệp, chúng tôi 
          luôn sẵn sàng phục vụ và tư vấn cho bạn những sản phẩm phù hợp nhất.
        </p>
      </section>
    </div>
  );
};

export default About;
