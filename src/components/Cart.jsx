import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { 
        cartItems, 
        isCartOpen, 
        setIsCartOpen, 
        updateQuantity, 
        removeFromCart, 
        cartTotal 
    } = useCart();

    const handleCheckoutZalo = () => {
        const phone = "0905943679";
        let message = "Chào PK DOOR, tôi muốn nhận báo giá cho các sản phẩm sau:\n\n";
        
        cartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - SL: ${item.quantity}\n`;
            message += `   Giá: ${item.price > 0 ? Number(item.price).toLocaleString() + 'đ' : 'Liên hệ'}\n\n`;
        });
        
        message += `Tổng cộng: ${cartTotal > 0 ? cartTotal.toLocaleString() + 'đ' : 'Liên hệ'}\n`;
        message += "Vui lòng tư vấn giúp tôi!";
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://zalo.me/${phone}?text=${encodedMessage}`, '_blank');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        className="cart-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Sidebar */}
                    <motion.div 
                        className="cart-sidebar"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="cart-header">
                            <div className="header-title">
                                <ShoppingBag size={24} />
                                <h2>Giỏ hàng của bạn</h2>
                            </div>
                            <button className="close-cart" onClick={() => setIsCartOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="cart-items-container">
                            {cartItems.length === 0 ? (
                                <div className="empty-cart">
                                    <div className="empty-icon">🛒</div>
                                    <p>Giỏ hàng đang trống</p>
                                    <button onClick={() => setIsCartOpen(false)}>Tiếp tục mua sắm</button>
                                </div>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item._id} className="cart-item">
                                        <div className="item-img">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <h3>{item.name}</h3>
                                            <p className="item-price">{item.price > 0 ? `${Number(item.price).toLocaleString()}đ` : 'Liên hệ'}</p>
                                            <div className="item-controls">
                                                <div className="quantity-box">
                                                    <button onClick={() => updateQuantity(item._id, -1)}><Minus size={14} /></button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item._id, 1)}><Plus size={14} /></button>
                                                </div>
                                                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="cart-footer">
                                <div className="total-row">
                                    <span>Tổng tạm tính:</span>
                                    <span className="total-amount">{cartTotal > 0 ? `${cartTotal.toLocaleString()}đ` : 'Liên hệ'}</span>
                                </div>
                                <Link 
                                    to="/cart" 
                                    className="view-full-cart-btn" 
                                    onClick={() => setIsCartOpen(false)}
                                >
                                    Xem chi tiết & Thanh toán <ArrowRight size={18} />
                                </Link>
                                <button className="checkout-btn" onClick={handleCheckoutZalo}>
                                    Gửi báo giá nhanh qua Zalo
                                </button>
                                <p className="footer-note">* PK DOOR sẽ liên hệ tư vấn ngay sau khi nhận được yêu cầu</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
