import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RefreshCw, Headphones } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/UI';
import { featuredProducts, newArrivals, categories } from '../data/products';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Khám Phá Phong Cách
            <span className="highlight">Qua Đôi Mắt</span>
          </h1>
          <p className="hero-subtitle">
            Bộ sưu tập kính mắt cao cấp từ các thương hiệu hàng đầu thế giới. 
            Tìm kiếm sự hoàn hảo cho phong cách của bạn.
          </p>
          <div className="hero-actions">
            <Link to="/products">
              <Button variant="primary" size="lg">
                Khám Phá Ngay
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Tìm Hiểu Thêm
              </Button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800" 
            alt="Eyewear Collection"
          />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="features-grid">
          <div className="feature-item">
            <Truck size={32} />
            <h3>Miễn Phí Vận Chuyển</h3>
            <p>Cho đơn hàng từ 500k</p>
          </div>
          <div className="feature-item">
            <Shield size={32} />
            <h3>Chính Hãng 100%</h3>
            <p>Cam kết hàng chính hãng</p>
          </div>
          <div className="feature-item">
            <RefreshCw size={32} />
            <h3>Đổi Trả 30 Ngày</h3>
            <p>Dễ dàng & nhanh chóng</p>
          </div>
          <div className="feature-item">
            <Headphones size={32} />
            <h3>Hỗ Trợ 24/7</h3>
            <p>Tư vấn chuyên nghiệp</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section categories-section">
        <div className="section-header">
          <h2 className="section-title">Danh Mục Sản Phẩm</h2>
          <p className="section-subtitle">Khám phá các bộ sưu tập đa dạng của chúng tôi</p>
        </div>
        <div className="categories-grid">
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.id}`}
              className="category-card"
            >
              <img src={category.image} alt={category.name} />
              <div className="category-overlay">
                <h3>{category.name}</h3>
                <span>{category.productCount} sản phẩm</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Sản Phẩm Bán Chạy</h2>
          <Link to="/products" className="view-all">
            Xem tất cả <ArrowRight size={16} />
          </Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <span className="promo-tag">Ưu đãi đặc biệt</span>
          <h2>Giảm Đến 30% Kính Mát</h2>
          <p>Áp dụng cho tất cả sản phẩm kính mát từ các thương hiệu hàng đầu</p>
          <Link to="/products?category=sunglasses">
            <Button variant="primary" size="lg">
              Mua Ngay
            </Button>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Hàng Mới Về</h2>
          <Link to="/products" className="view-all">
            Xem tất cả <ArrowRight size={16} />
          </Link>
        </div>
        <div className="products-grid">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Đăng Ký Nhận Tin</h2>
          <p>Nhận thông tin khuyến mãi và sản phẩm mới nhất</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Nhập email của bạn" />
            <Button variant="primary">Đăng Ký</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
