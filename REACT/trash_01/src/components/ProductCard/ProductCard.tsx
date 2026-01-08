import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        
        {/* Badges */}
        <div className="product-badges">
          {product.isNew && <span className="badge badge-new">Mới</span>}
          {product.isBestSeller && <span className="badge badge-bestseller">Bán Chạy</span>}
          {product.originalPrice && (
            <span className="badge badge-sale">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="product-actions">
          <button className="action-icon" aria-label="Yêu thích">
            <Heart size={18} />
          </button>
          <button 
            className="action-icon" 
            onClick={handleAddToCart}
            aria-label="Thêm vào giỏ"
            disabled={!product.inStock}
          >
            <ShoppingCart size={18} />
          </button>
        </div>

        {!product.inStock && (
          <div className="out-of-stock-overlay">
            <span>Hết Hàng</span>
          </div>
        )}
      </div>

      <div className="product-info">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <Star size={14} fill="currentColor" />
          <span>{product.rating}</span>
          <span className="rating-count">({product.reviews})</span>
        </div>

        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
