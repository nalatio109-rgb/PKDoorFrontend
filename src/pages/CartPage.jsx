import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Trash2, Plus, Minus, ShoppingBag, MapPin, User, Phone, MessageSquare, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CartPage.css';
import { API_URL } from '../config';

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const [isOrdering, setIsOrdering] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        address: '',
        note: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
            alert("Vui lòng điền đầy đủ thông tin giao hàng!");
            return;
        }

        setIsOrdering(true);

        try {
            // 1. Chuẩn bị dữ liệu đơn hàng
            const orderData = {
                customerInfo: customerInfo,
                items: cartItems.map(item => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                    selectedColor: item.selectedColor
                })),
                totalAmount: cartTotal
            };

            // 2. Gửi lên Backend
            const response = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                alert("🎉 Đơn hàng của bạn đã được gửi thành công! PK DOOR sẽ sớm liên hệ với bạn qua số điện thoại đã cung cấp.");
                
                // 3. Xóa giỏ hàng và chuyển hướng (Không mở Zalo nữa)
                clearCart();
            } else {
                throw new Error("Lỗi khi gửi đơn hàng");
            }
        } catch (err) {
            console.error(err);
            alert("Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
        } finally {
            setIsOrdering(false);
        }
    };

    return (
        <div className="cart-page-wrapper">
            <Navbar alwaysSolid={true} />
            
            <div className="cart-hero">
                <div className="container">
                    <h1>Giỏ hàng của bạn</h1>
                    <p>Hoàn tất thông tin để PK DOOR tư vấn và báo giá chính xác nhất</p>
                </div>
            </div>

            <div className="container cart-main-content section-padding">
                {cartItems.length === 0 ? (
                    <motion.div 
                        className="empty-cart-state"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="empty-icon-box">🛒</div>
                        <h2>Giỏ hàng của bạn đang trống</h2>
                        <p>Hãy tham khảo các mẫu cửa mới nhất của chúng tôi</p>
                        <Link to="/san-pham" className="btn-shop-now">
                            Xem sản phẩm <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="cart-grid">
                        {/* Left: Cart Items */}
                        <div className="cart-items-section">
                            <div className="section-header">
                                <ShoppingBag size={20} />
                                <h3>Danh sách sản phẩm ({cartItems.length})</h3>
                            </div>
                            
                            <div className="items-list">
                                {cartItems.map(item => (
                                    <div key={item.cartItemId || item._id} className="cart-page-item">
                                        <div className="item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="item-info">
                                            <h4>{item.name}</h4>
                                            {item.selectedColor && <p className="item-color" style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0' }}>Màu sắc: <strong style={{ color: '#1a2a40' }}>{item.selectedColor}</strong></p>}
                                            <p className="item-price-unit">{item.price > 0 ? `${Number(item.price).toLocaleString()}đ` : 'Liên hệ'}</p>
                                            <div className="item-controls-row">
                                                <div className="quantity-selector">
                                                    <button onClick={() => updateQuantity(item.cartItemId || item._id, -1)}><Minus size={14} /></button>
                                                    <span>{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.cartItemId || item._id, 1)}
                                                        disabled={item.quantity >= item.stock}
                                                        className={item.quantity >= item.stock ? 'disabled' : ''}
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button className="remove-item-link" onClick={() => removeFromCart(item.cartItemId || item._id)}>
                                                    <Trash2 size={16} /> Xóa
                                                </button>
                                            </div>
                                        </div>
                                        <div className="item-subtotal">
                                            {item.price > 0 ? `${(item.price * item.quantity).toLocaleString()}đ` : 'Liên hệ'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link to="/san-pham" className="continue-shopping">
                                <ArrowLeft size={16} /> Tiếp tục chọn thêm sản phẩm
                            </Link>
                        </div>

                        {/* Right: Checkout Form */}
                        <div className="checkout-section">
                            <div className="checkout-card">
                                <h3>Thông tin giao hàng</h3>
                                <form onSubmit={handlePlaceOrder}>
                                    <div className="form-group">
                                        <label><User size={16} /> Họ và tên *</label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            placeholder="Ví dụ: Nguyễn Văn A"
                                            value={customerInfo.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label><Phone size={16} /> Số điện thoại *</label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            placeholder="Nhập số điện thoại của bạn"
                                            value={customerInfo.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label><MapPin size={16} /> Địa chỉ nhận hàng *</label>
                                        <textarea 
                                            name="address"
                                            placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                                            value={customerInfo.address}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label><MessageSquare size={16} /> Ghi chú (nếu có)</label>
                                        <textarea 
                                            name="note"
                                            placeholder="Ví dụ: Giao vào giờ hành chính, yêu cầu thêm phụ kiện..."
                                            value={customerInfo.note}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>

                                    <div className="order-summary">
                                        <div className="summary-row">
                                            <span>Tổng giá trị hàng hóa:</span>
                                            <span>{cartTotal > 0 ? `${cartTotal.toLocaleString()}đ` : 'Liên hệ'}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Phí vận chuyển:</span>
                                            <span className="free-shipping">Liên hệ báo giá</span>
                                        </div>
                                        <div className="summary-total">
                                            <span>TỔNG CỘNG:</span>
                                            <span>{cartTotal > 0 ? `${cartTotal.toLocaleString()}đ` : 'Liên hệ'}</span>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn-confirm-order" disabled={isOrdering}>
                                        {isOrdering ? "ĐANG XỬ LÝ..." : "ĐẶT HÀNG"}
                                    </button>
                                </form>
                                <p className="security-note">🛡️ PK DOOR cam kết bảo mật thông tin khách hàng tuyệt đối.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default CartPage;
