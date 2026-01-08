import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../components/UI';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page empty">
        <div className="empty-cart">
          <ShoppingBag size={80} strokeWidth={1} />
          <h2>Giỏ hàng trống</h2>
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              Tiếp tục mua sắm
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Giỏ Hàng</h1>
        <p>{items.length} sản phẩm</p>
      </div>

      <div className="cart-container">
        {/* Cart Items */}
        <div className="cart-items">
          {items.map(item => (
            <div key={item.product.id} className="cart-item">
              <Link to={`/products/${item.product.id}`} className="item-image">
                <img src={item.product.image} alt={item.product.name} />
              </Link>

              <div className="item-details">
                <Link to={`/products/${item.product.id}`}>
                  <span className="item-brand">{item.product.brand}</span>
                  <h3 className="item-name">{item.product.name}</h3>
                </Link>
                <span className="item-specs">
                  {item.product.frameShape} • {item.product.color}
                </span>
              </div>

              <div className="item-quantity">
                <button 
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="item-price">
                <span className="price">{formatPrice(item.product.price * item.quantity)}</span>
                {item.quantity > 1 && (
                  <span className="unit-price">{formatPrice(item.product.price)} / chiếc</span>
                )}
              </div>

              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.product.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <div className="cart-actions">
            <Button variant="ghost" onClick={clearCart}>
              Xóa tất cả
            </Button>
            <Link to="/products">
              <Button variant="outline">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Tóm Tắt Đơn Hàng</h3>
          
          <div className="summary-row">
            <span>Tạm tính</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="summary-row">
            <span>Phí vận chuyển</span>
            <span>{totalPrice >= 500000 ? 'Miễn phí' : formatPrice(30000)}</span>
          </div>
          
          <div className="promo-code">
            <input type="text" placeholder="Mã giảm giá" />
            <Button variant="outline">Áp dụng</Button>
          </div>

          <div className="summary-total">
            <span>Tổng cộng</span>
            <span>{formatPrice(totalPrice + (totalPrice >= 500000 ? 0 : 30000))}</span>
          </div>

          <Link to="/checkout">
            <Button variant="primary" size="lg" fullWidth>
              Tiến hành thanh toán
              <ArrowRight size={18} />
            </Button>
          </Link>

          <p className="secure-checkout">🔒 Thanh toán an toàn & bảo mật</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
