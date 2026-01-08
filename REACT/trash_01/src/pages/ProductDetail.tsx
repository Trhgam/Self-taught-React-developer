import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RefreshCw, Minus, Plus, ChevronRight } from 'lucide-react';
import { Button } from '../components/UI';
import ProductCard from '../components/ProductCard';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === Number(id));
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Không tìm thấy sản phẩm</h2>
        <Link to="/products">
          <Button>Quay lại cửa hàng</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Trang chủ</Link>
        <ChevronRight size={16} />
        <Link to="/products">Sản phẩm</Link>
        <ChevronRight size={16} />
        <span>{product.name}</span>
      </nav>

      {/* Product Section */}
      <div className="product-detail">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
            {product.originalPrice && (
              <span className="sale-badge">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info-detail">
          <span className="brand">{product.brand}</span>
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-meta">
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
              <span>{product.rating}</span>
              <span className="reviews">({product.reviews} đánh giá)</span>
            </div>
            {product.inStock ? (
              <span className="stock in-stock">Còn hàng</span>
            ) : (
              <span className="stock out-of-stock">Hết hàng</span>
            )}
          </div>

          <div className="price-section">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="description">{product.description}</p>

          {/* Specs */}
          <div className="specs">
            <div className="spec-item">
              <span className="label">Kiểu gọng:</span>
              <span className="value">{product.frameShape}</span>
            </div>
            <div className="spec-item">
              <span className="label">Chất liệu:</span>
              <span className="value">{product.frameMaterial}</span>
            </div>
            <div className="spec-item">
              <span className="label">Màu sắc:</span>
              <span className="value">{product.color}</span>
            </div>
            <div className="spec-item">
              <span className="label">Giới tính:</span>
              <span className="value">
                {product.gender === 'men' ? 'Nam' : 
                 product.gender === 'women' ? 'Nữ' : 'Unisex'}
              </span>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="purchase-section">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>
                <Plus size={18} />
              </button>
            </div>

            <Button 
              variant="primary" 
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart size={20} />
              Thêm vào giỏ hàng
            </Button>

            <button className="wishlist-btn">
              <Heart size={20} />
            </button>
          </div>

          {/* Benefits */}
          <div className="benefits">
            <div className="benefit">
              <Truck size={20} />
              <span>Miễn phí vận chuyển đơn từ 500k</span>
            </div>
            <div className="benefit">
              <Shield size={20} />
              <span>Bảo hành chính hãng 12 tháng</span>
            </div>
            <div className="benefit">
              <RefreshCw size={20} />
              <span>Đổi trả trong 30 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button 
            className={activeTab === 'description' ? 'active' : ''}
            onClick={() => setActiveTab('description')}
          >
            Mô tả
          </button>
          <button 
            className={activeTab === 'specs' ? 'active' : ''}
            onClick={() => setActiveTab('specs')}
          >
            Thông số
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            Đánh giá ({product.reviews})
          </button>
        </div>
        <div className="tabs-content">
          {activeTab === 'description' && (
            <div className="tab-panel">
              <p>{product.description}</p>
              <p>
                Sản phẩm chính hãng từ {product.brand}, được nhập khẩu trực tiếp 
                và phân phối độc quyền tại Việt Nam. Mỗi sản phẩm đều đi kèm với 
                hộp đựng, khăn lau và thẻ bảo hành chính hãng.
              </p>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="tab-panel">
              <table className="specs-table">
                <tbody>
                  <tr><td>Thương hiệu</td><td>{product.brand}</td></tr>
                  <tr><td>Kiểu gọng</td><td>{product.frameShape}</td></tr>
                  <tr><td>Chất liệu gọng</td><td>{product.frameMaterial}</td></tr>
                  <tr><td>Màu sắc</td><td>{product.color}</td></tr>
                  <tr><td>Danh mục</td><td>
                    {product.category === 'sunglasses' ? 'Kính mát' :
                     product.category === 'eyeglasses' ? 'Kính cận' :
                     product.category === 'sports' ? 'Kính thể thao' : 'Kính lão'}
                  </td></tr>
                  <tr><td>Giới tính</td><td>
                    {product.gender === 'men' ? 'Nam' : 
                     product.gender === 'women' ? 'Nữ' : 'Unisex'}
                  </td></tr>
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="tab-panel">
              <p>Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2>Sản Phẩm Liên Quan</h2>
          <div className="products-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
