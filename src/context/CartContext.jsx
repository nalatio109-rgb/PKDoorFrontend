import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('pkdoor_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('pkdoor_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                // Kiểm tra nếu số lượng trong giỏ đã đạt giới hạn tồn kho
                if (existingItem.quantity >= product.stock) {
                    alert(`⚠️ Rất tiếc, sản phẩm "${product.name}" chỉ còn ${product.stock} cái trong kho.`);
                    return prevItems;
                }
                return prevItems.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Nếu sản phẩm chưa có trong giỏ, kiểm tra xem còn hàng không
            if (product.stock <= 0) {
                alert(`⚠️ Sản phẩm "${product.name}" hiện đã hết hàng.`);
                return prevItems;
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item._id === id) {
                const newQuantity = item.quantity + delta;
                
                // Kiểm tra giới hạn dưới (ít nhất 1)
                if (newQuantity < 1) return item;

                // Kiểm tra giới hạn trên (không vượt quá tồn kho)
                if (newQuantity > item.stock) {
                    alert(`⚠️ Xin lỗi, chúng tôi chỉ còn tối đa ${item.stock} sản phẩm này.`);
                    return item;
                }

                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            cartCount, 
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};
