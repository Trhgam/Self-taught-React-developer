import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, Check } from 'lucide-react';
import { Button, Input } from '../components/UI';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    note: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Process order
      setOrderComplete(true);
      clearCart();
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="checkout-page empty">
        <h2>Giỏ hàng trống</h2>
        <Link to="/products">
          <Button>Tiếp tục mua sắm</Button>
        </Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="checkout-page success">
        <div className="order-success">
          <div className="success-icon">
            <Check size={48} />
          </div>
          <h2>Đặt Hàng Thành Công!</h2>
          <p>Cảm ơn bạn đã mua hàng tại OptiVision</p>
          <p className="order-number">Mã đơn hàng: #OV2026010612345</p>
          <p>Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng trong thời gian sớm nhất.</p>
          <div className="success-actions">
            <Button variant="primary" onClick={() => navigate('/')}>
              Về trang chủ
            </Button>
            <Button variant="outline" onClick={() => navigate('/products')}>
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const shippingFee = totalPrice >= 500000 ? 0 : 30000;
  const grandTotal = totalPrice + shippingFee;

  return (
    <div className="checkout-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Trang chủ</Link>
        <ChevronRight size={16} />
        <Link to="/cart">Giỏ hàng</Link>
        <ChevronRight size={16} />
        <span>Thanh toán</span>
      </nav>

      <h1 className="page-title">Thanh Toán</h1>

      {/* Progress Steps */}
      <div className="checkout-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-label">Thông tin</span>
        </div>
        <div className="step-line"></div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-label">Thanh toán</span>
        </div>
      </div>

      <div className="checkout-container">
        {/* Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-section">
              <h3><Truck size={20} /> Thông Tin Giao Hàng</h3>
              
              <div className="form-grid">
                <Input
                  label="Họ và tên"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập họ và tên"
                />
                <Input
                  label="Số điện thoại"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="0912 345 678"
                />
              </div>

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="email@example.com"
              />

              <Input
                label="Địa chỉ"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="Số nhà, tên đường..."
              />

              <div className="form-grid">
                <Input
                  label="Thành phố"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="TP. Hồ Chí Minh"
                />
                <Input
                  label="Quận/Huyện"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                  placeholder="Quận 1"
                />
              </div>

              <div className="input-wrapper">
                <label className="input-label">Ghi chú</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  placeholder="Ghi chú cho đơn hàng (tùy chọn)"
                  rows={3}
                  className="input"
                />
              </div>

              <Button variant="primary" size="lg" fullWidth type="submit">
                Tiếp tục thanh toán
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h3><CreditCard size={20} /> Phương Thức Thanh Toán</h3>

              <div className="payment-methods">
                <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-content">
                    <span className="payment-icon">💵</span>
                    <div>
                      <strong>Thanh toán khi nhận hàng (COD)</strong>
                      <p>Thanh toán tiền mặt khi nhận hàng</p>
                    </div>
                  </div>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'bank' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-content">
                    <span className="payment-icon">🏦</span>
                    <div>
                      <strong>Chuyển khoản ngân hàng</strong>
                      <p>Chuyển khoản trước qua tài khoản ngân hàng</p>
                    </div>
                  </div>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'momo' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={formData.paymentMethod === 'momo'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-content">
                    <span className="payment-icon">📱</span>
                    <div>
                      <strong>Ví MoMo</strong>
                      <p>Thanh toán qua ví điện tử MoMo</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="form-actions">
                <Button variant="outline" type="button" onClick={() => setStep(1)}>
                  Quay lại
                </Button>
                <Button variant="primary" size="lg" type="submit">
                  Đặt hàng
                </Button>
              </div>
            </div>
          )}
        </form>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Đơn Hàng ({items.length} sản phẩm)</h3>

          <div className="summary-items">
            {items.map(item => (
              <div key={item.product.id} className="summary-item">
                <div className="item-thumb">
                  <img src={item.product.image} alt={item.product.name} />
                  <span className="quantity">{item.quantity}</span>
                </div>
                <div className="item-info">
                  <span className="name">{item.product.name}</span>
                  <span className="brand">{item.product.brand}</span>
                </div>
                <span className="price">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="row">
              <span>Tạm tính</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="row">
              <span>Phí vận chuyển</span>
              <span>{shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}</span>
            </div>
            <div className="row total">
              <span>Tổng cộng</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
