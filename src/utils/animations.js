import { API_URL } from '../config';

export const flyToCart = (event, imageUrl) => {
    const cartBtn = document.querySelector('.cart-toggle-btn');
    if (!cartBtn) {
        console.error("Không tìm thấy nút giỏ hàng .cart-toggle-btn");
        return;
    }

    const cartRect = cartBtn.getBoundingClientRect();
    const cartX = cartRect.left + cartRect.width / 2;
    const cartY = cartRect.top + cartRect.height / 2;

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    let finalImageUrl = imageUrl;
    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
        finalImageUrl = `${API_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    }

    const flyer = document.createElement('img');
    flyer.src = finalImageUrl || "https://via.placeholder.com/100";
    flyer.className = 'flying-image';
    
    // Thiết lập vị trí ban đầu cực kỳ tường minh
    flyer.style.position = 'fixed';
    flyer.style.zIndex = '100000';
    flyer.style.width = '70px';
    flyer.style.height = '70px';
    flyer.style.left = `${startX - 35}px`;
    flyer.style.top = `${startY - 35}px`;
    flyer.style.borderRadius = '12px';
    flyer.style.objectFit = 'cover';
    flyer.style.backgroundColor = '#fff'; // Màu nền dự phòng
    flyer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    flyer.style.transition = 'all 0.9s cubic-bezier(0.1, 0.25, 0.1, 1)'; // Đường bay mượt hơn

    document.body.appendChild(flyer);

    // Dùng requestAnimationFrame để đảm bảo trình duyệt đã vẽ ảnh xong rồi mới bay
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            flyer.style.left = `${cartX - 10}px`;
            flyer.style.top = `${cartY - 10}px`;
            flyer.style.width = '20px';
            flyer.style.height = '20px';
            flyer.style.opacity = '0.7';
            flyer.style.transform = 'rotate(720deg) scale(0.5)';
        });
    });

    setTimeout(() => {
        cartBtn.classList.add('cart-pulse');
        const badge = cartBtn.querySelector('.cart-badge');
        if (badge) badge.classList.add('cart-badge-pulse');

        setTimeout(() => {
            cartBtn.classList.remove('cart-pulse');
            if (badge) badge.classList.remove('cart-badge-pulse');
            if (document.body.contains(flyer)) {
                document.body.removeChild(flyer);
            }
        }, 500);
    }, 950);
};
