import { useState, useEffect } from "react";
import {
    PlusCircle,
    LayoutGrid,
    Search,
    Edit3,
    Trash2,
    Package,
    DollarSign,
    Image as ImageIcon,
    FileText,
    DoorOpen,
    CheckCircle,
    ClipboardList,
    Mail
} from "lucide-react";
import "./Admin.css";
import { API_URL } from "../config";

function Admin() {
    const [tab, setTab] = useState("add");
    const [searchQuery, setSearchQuery] = useState("");

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        image: "", // Main image
        images: [], // Gallery images
        features: "",
        specs: "",
        stock: 0,
        badge: "",
        colors: ""
    });

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [editId, setEditId] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]); // Array of files
    const [previewUrls, setPreviewUrls] = useState([]); // Array of previews
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

    const [tempColorName, setTempColorName] = useState("");
    const [tempColorHex, setTempColorHex] = useState("#000000");

    const handleAddColor = () => {
        if (!tempColorName.trim()) return;
        const newColorStr = `${tempColorName.trim()}:${tempColorHex}`;
        const updatedColors = form.colors ? `${form.colors},${newColorStr}` : newColorStr;
        setForm({ ...form, colors: updatedColors });
        setTempColorName("");
        setTempColorHex("#000000");
    };

    const handleRemoveColor = (indexToRemove) => {
        if (!form.colors) return;
        const colorArray = form.colors.split(",").map(c => c.trim()).filter(c => c);
        const updatedArray = colorArray.filter((_, idx) => idx !== indexToRemove);
        setForm({ ...form, colors: updatedArray.join(",") });
    };

    const handleEditColor = (indexToEdit) => {
        if (!form.colors) return;
        const colorArray = form.colors.split(",").map(c => c.trim()).filter(c => c);
        const colorToEdit = colorArray[indexToEdit];
        if (colorToEdit) {
            const [cName, cHex] = colorToEdit.split(":");
            setTempColorName(cName || "");
            setTempColorHex(cHex || "#000000");
            const updatedArray = colorArray.filter((_, idx) => idx !== indexToEdit);
            setForm({ ...form, colors: updatedArray.join(",") });
        }
    };

    // lấy danh sách tin nhắn liên hệ
    const fetchContacts = async () => {
        try {
            const res = await fetch(`${API_URL}/contacts`);
            const data = await res.json();
            setContacts(data);
        } catch (err) {
            console.log("Lỗi tải tin nhắn:", err);
        }
    };

    // lấy danh sách đơn hàng
    const fetchOrders = async () => {
        try {
            const res = await fetch(`${API_URL}/orders`);
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.log("Lỗi tải đơn hàng:", err);
        }
    };

    // lấy danh sách sản phẩm
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/products`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.log("Lỗi tải sản phẩm:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchOrders();
        fetchContacts();
    }, []);

    // nhập input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Xử lý chọn nhiều file
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setSelectedFiles(files);
            const urls = files.map(file => URL.createObjectURL(file));
            setPreviewUrls(urls);
        }
    };

    // Hàm upload ảnh lên server (Xử lý nhiều ảnh)
    const uploadImages = async () => {
        if (selectedFiles.length === 0) return { main: form.image, gallery: form.images || [] };

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append("images", file);
        });

        try {
            const res = await fetch(`${API_URL}/upload-multiple`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            // Ảnh đầu tiên là ảnh chính, còn lại là gallery
            return {
                main: data.imageUrls[0],
                gallery: data.imageUrls
            };
        } catch (err) {
            console.error("Lỗi upload ảnh:", err);
            return { main: form.image, gallery: form.images || [] };
        }
    };

    const updateOrderStatus = async (id, newStatus) => {
        try {
            await fetch(`${API_URL}/orders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
            fetchOrders();
            if (selectedOrder && selectedOrder._id === id) {
                setSelectedOrder(prev => ({ ...prev, status: newStatus }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteOrder = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
            try {
                await fetch(`${API_URL}/orders/${id}`, { method: "DELETE" });
                fetchOrders();
                setSelectedOrder(null);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const updateContactStatus = async (id, newStatus) => {
        try {
            await fetch(`${API_URL}/contacts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
            fetchContacts();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteContact = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa tin nhắn này?")) {
            try {
                await fetch(`${API_URL}/contacts/${id}`, { method: "DELETE" });
                fetchContacts();
            } catch (err) {
                console.error(err);
            }
        }
    };

    // thêm / sửa sản phẩm
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.price) {
            alert("Vui lòng nhập tên và giá sản phẩm!");
            return;
        }

        try {
            const uploadResult = await uploadImages();
            const productData = { 
                ...form, 
                image: uploadResult.main, 
                images: uploadResult.gallery 
            };

            if (editId) {
                await fetch(`${API_URL}/products/${editId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(productData),
                });
                alert("Sửa sản phẩm thành công!");
                setEditId(null);
            } else {
                await fetch(`${API_URL}/products`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(productData),
                });
                alert("Thêm sản phẩm thành công!");
            }

            setForm({
                name: "",
                price: "",
                description: "",
                image: "",
                features: "",
                specs: "",
                badge: "",
                colors: ""
            });
            setSelectedFiles([]);
            setPreviewUrls([]);

            fetchProducts();
            setTab("list");
        } catch (err) {
            alert("Đã có lỗi xảy ra!");
            console.log(err);
        }
    };

    // xoá sản phẩm
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
            await fetch(`${API_URL}/products/${id}`, {
                method: "DELETE",
            });
            alert("Đã xoá sản phẩm!");
            fetchProducts();
        }
    };

    // sửa sản phẩm
    const handleEdit = (item) => {
        setForm({
            name: item.name,
            price: item.price,
            description: item.description,
            image: item.image,
            images: item.images || [],
            features: item.features || "",
            specs: item.specs || "",
            stock: item.stock || 0,
            badge: item.badge || "",
            colors: item.colors || ""
        });
        const imagesToPreview = item.images && item.images.length > 0 ? item.images : (item.image ? [item.image] : []);
        setPreviewUrls(imagesToPreview); // Hiện gallery cũ hoặc ảnh chính cũ
        setSelectedFiles([]);
        setEditId(item._id);
        setTab("add");
    };

    // Lọc sản phẩm theo tìm kiếm
    const filteredProducts = products.filter(p =>
        (p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <div className="admin-sidebar">
                <h2>
                    <DoorOpen size={28} color="var(--admin-accent)" /> 
                    <span style={{ color: 'var(--admin-danger)' }}>PK</span>
                    <span style={{ color: 'var(--admin-accent)' }}>Door</span>
                </h2>

                <div className="admin-menu">
                    <div
                        className={`menu-item ${tab === "add" ? "active" : ""}`}
                        onClick={() => {
                            setTab("add");
                            setEditId(null);
                            setForm({ name: "", price: "", description: "", image: "", images: [], features: "", specs: "", badge: "", colors: "" });
                            setSelectedFiles([]);
                            setPreviewUrls([]);
                        }}
                    >
                        <PlusCircle size={20} /> Thêm sản phẩm
                    </div>

                    <div
                        className={`menu-item ${tab === "list" ? "active" : ""}`}
                        onClick={() => setTab("list")}
                    >
                        <LayoutGrid size={20} /> Quản lý sản phẩm
                    </div>

                    <div
                        className={`menu-item ${tab === "orders" ? "active" : ""}`}
                        onClick={() => setTab("orders")}
                    >
                        <ClipboardList size={20} /> Quản lý đơn hàng
                    </div>

                    <div
                        className={`menu-item ${tab === "contacts" ? "active" : ""}`}
                        onClick={() => setTab("contacts")}
                    >
                        <Mail size={20} /> Quản lý liên hệ
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="admin-main">
                {/* Form Add/Edit */}
                {tab === "add" && (
                    <>
                        <div className="admin-header">
                            <h1>{editId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h1>
                        </div>

                        <div className="admin-form-card">
                            <form className="admin-form" onSubmit={handleSubmit}>
                                <div className="form-group full-width">
                                    <label><Package size={16} /> Tên sản phẩm</label>
                                    <input
                                        name="name"
                                        placeholder="Ví dụ: Cửa gỗ Composite hiện đại"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label><DollarSign size={16} /> Giá bán (VNĐ)</label>
                                    <input
                                        name="price"
                                        type="number"
                                        placeholder="Nhập giá tiền"
                                        value={form.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label><Package size={16} /> Số lượng tồn kho</label>
                                    <input
                                        name="stock"
                                        type="number"
                                        placeholder="Số lượng trong kho"
                                        value={form.stock}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label><ImageIcon size={16} /> Hình ảnh sản phẩm</label>
                                    <div className="file-upload-wrapper">
                                        <input
                                            type="file"
                                            id="file-upload"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="file-upload" className="file-upload-btn">
                                            <ImageIcon size={18} />
                                            <span>{selectedFiles.length > 0 ? `Đã chọn ${selectedFiles.length} ảnh` : "Chọn nhiều ảnh từ máy tính"}</span>
                                        </label>
                                        
                                        {previewUrls.length > 0 && (
                                            <div className="admin-image-gallery">
                                                {previewUrls.map((url, idx) => (
                                                    <div className="image-preview-container" key={idx}>
                                                        <img src={url} alt={`Preview ${idx}`} className="image-preview" />
                                                        <span className="image-badge">{idx === 0 ? "Chính" : "Phụ"}</span>
                                                    </div>
                                                ))}
                                                <button 
                                                    type="button" 
                                                    className="btn-clear-images"
                                                    onClick={() => {
                                                        setSelectedFiles([]);
                                                        setPreviewUrls([]);
                                                        setForm({ ...form, image: "", images: [] });
                                                    }}
                                                >
                                                    Xóa tất cả ảnh
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group full-width">
                                    <label><FileText size={16} /> Mô tả sản phẩm</label>
                                    <textarea
                                        name="description"
                                        rows="3"
                                        placeholder="Nhập giới thiệu ngắn gọn về sản phẩm..."
                                        value={form.description}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><Package size={16} /> Nhãn nổi bật (Badge)</label>
                                    <input
                                        name="badge"
                                        placeholder="Ví dụ: BÁN CHẠY NHẤT"
                                        value={form.badge}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><Package size={16} /> Màu sắc</label>
                                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                        <input
                                            type="text"
                                            placeholder="Tên màu (VD: Trắng sứ)"
                                            value={tempColorName}
                                            onChange={(e) => setTempColorName(e.target.value)}
                                            style={{ flex: 1 }}
                                        />
                                        <input
                                            type="color"
                                            value={tempColorHex}
                                            onChange={(e) => setTempColorHex(e.target.value)}
                                            style={{ width: "50px", height: "40px", padding: "0", cursor: "pointer" }}
                                        />
                                        <button 
                                            type="button" 
                                            onClick={handleAddColor}
                                            style={{ padding: "0 15px", background: "var(--admin-accent)", color: "#fff", borderRadius: "4px", border: "none", cursor: "pointer" }}
                                        >
                                            Thêm màu
                                        </button>
                                    </div>
                                    <input type="hidden" name="colors" value={form.colors} />
                                    {form.colors && (
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                                            {form.colors.split(",").map((c, idx) => {
                                                const [cName, cHex] = c.split(":");
                                                return (
                                                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "5px", background: "#f1f5f9", padding: "5px 12px", borderRadius: "20px", border: "1px solid #cbd5e1" }}>
                                                        <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: cHex || "#ccc", border: "1px solid #94a3b8" }}></div>
                                                        <span style={{ fontSize: "14px", marginRight: "5px" }}>{cName}</span>
                                                        <button 
                                                            type="button" 
                                                            onClick={() => handleEditColor(idx)}
                                                            style={{ background: "transparent", border: "none", color: "#3b82f6", cursor: "pointer", display: "flex", alignItems: "center", padding: "2px" }}
                                                            title="Sửa màu"
                                                        >
                                                            <Edit3 size={14} />
                                                        </button>
                                                        <button 
                                                            type="button" 
                                                            onClick={() => handleRemoveColor(idx)}
                                                            style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", padding: "0" }}
                                                            title="Xóa màu"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label><CheckCircle size={16} /> Đặc điểm nổi bật (Mỗi dòng một ý)</label>
                                    <textarea
                                        name="features"
                                        rows="5"
                                        placeholder="Ví dụ:&#10;Kháng nước 100%&#10;Không cong vênh&#10;Màu sắc đa dạng"
                                        value={form.features}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label><LayoutGrid size={16} /> Thông số kỹ thuật (Định dạng Tên: Giá trị)</label>
                                    <textarea
                                        name="specs"
                                        rows="5"
                                        placeholder="Ví dụ:&#10;Kích thước: 900 x 2200 mm&#10;Độ dày cánh: 40mm&#10;Chất liệu: Nhựa Composite"
                                        value={form.specs}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit">
                                    {editId ? "Cập nhật sản phẩm" : "Lưu sản phẩm"}
                                </button>
                            </form>
                        </div>
                    </>
                )}

                {/* Product list */}
                {tab === "list" && (
                    <>
                        <div className="admin-header">
                            <h1>Danh sách sản phẩm</h1>
                            <div className="admin-search-wrapper">
                                <Search size={18} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Tìm tên hoặc mô tả sản phẩm..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button className="clear-search-admin" onClick={() => setSearchQuery("")}>
                                        ×
                                    </button>
                                )}
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="product-grid">
                                {filteredProducts.map((item) => (
                                    <div className="product-card" key={item._id}>
                                        <div className="card-image-wrapper">
                                            <img src={item.image || "https://via.placeholder.com/300"} alt={item.name} />
                                            <div className="card-price-tag">
                                                {Number(item.price).toLocaleString()}đ
                                            </div>
                                        </div>

                                        <div className="product-content">
                                            <h3>{item.name}</h3>
                                            <div className="stock-admin-badge">
                                                Kho: <strong>{item.stock || 0}</strong>
                                            </div>
                                            <p>{item.description}</p>

                                            <div className="product-actions">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <Edit3 size={16} /> Sửa
                                                </button>

                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    <Trash2 size={16} /> Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                                <Package size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <p>Không tìm thấy sản phẩm nào.</p>
                            </div>
                        )}
                    </>
                )}

                {tab === "orders" && (
                    <div className="orders-section">
                        <div className="admin-header">
                            <h1>Quản lý đơn hàng</h1>
                        </div>

                        <div className="orders-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Ngày đặt</th>
                                        <th>Khách hàng</th>
                                        <th>Số điện thoại</th>
                                        <th>Sản phẩm</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                                            <td><strong>{order.customerInfo.name}</strong></td>
                                            <td>{order.customerInfo.phone}</td>
                                            <td>
                                                {order.items && order.items.length > 0 ? (
                                                    <div style={{ fontSize: '0.85rem', color: '#475569', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}>
                                                        {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                                                    </div>
                                                ) : "Không có SP"}
                                            </td>
                                            <td><span className="price-bold">{order.totalAmount.toLocaleString()}đ</span></td>
                                            <td>
                                                <select 
                                                    className={`status-select ${order.status === 'Chờ xác nhận' ? 'pending' : 'confirmed'}`}
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                >
                                                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                                                    <option value="Đã xác nhận">Đã xác nhận</option>
                                                    <option value="Đang giao">Đang giao</option>
                                                    <option value="Hoàn thành">Hoàn thành</option>
                                                    <option value="Đã hủy">Đã hủy</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div className="order-actions">
                                                    <button className="btn-view" onClick={() => setSelectedOrder(order)}>Chi tiết</button>
                                                    <button className="btn-delete-order" onClick={() => deleteOrder(order._id)}><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {selectedOrder && (
                            <div className="order-modal-overlay" onClick={() => setSelectedOrder(null)}>
                                <div className="order-modal-content" onClick={e => e.stopPropagation()}>
                                    <div className="modal-header">
                                        <h3>Chi tiết đơn hàng</h3>
                                        <button className="btn-close" onClick={() => setSelectedOrder(null)}>×</button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="modal-info-section">
                                            <h4><FileText size={18} /> Thông tin khách hàng</h4>
                                            <p><strong>Họ tên:</strong> {selectedOrder.customerInfo.name}</p>
                                            <p><strong>Điện thoại:</strong> {selectedOrder.customerInfo.phone}</p>
                                            <p><strong>Địa chỉ:</strong> {selectedOrder.customerInfo.address}</p>
                                            {selectedOrder.customerInfo.note && <p><strong>Ghi chú:</strong> {selectedOrder.customerInfo.note}</p>}
                                        </div>

                                        <div className="modal-items-section">
                                            <h4><Package size={18} /> Danh sách sản phẩm</h4>
                                            {selectedOrder.items.map((item, idx) => (
                                                <div key={idx} className="order-item-detail">
                                                    <img src={item.image} alt={item.name} />
                                                    <div className="item-txt">
                                                        <p className="name">{item.name}</p>
                                                        <p className="qty">{item.quantity} x {item.price.toLocaleString()}đ</p>
                                                    </div>
                                                    <div className="item-total">
                                                        {(item.quantity * item.price).toLocaleString()}đ
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="modal-footer-total">
                                                <span>TỔNG CỘNG:</span>
                                                <span className="total">{selectedOrder.totalAmount.toLocaleString()}đ</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {tab === "contacts" && (
                    <div className="orders-section">
                        <div className="admin-header">
                            <h1>Quản lý liên hệ</h1>
                        </div>

                        <div className="orders-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Ngày gửi</th>
                                        <th>Khách hàng</th>
                                        <th>Điện thoại</th>
                                        <th>Loại quan tâm</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map(contact => (
                                        <tr key={contact._id}>
                                            <td>{new Date(contact.createdAt).toLocaleDateString('vi-VN')}</td>
                                            <td><strong>{contact.name}</strong><br /><small>{contact.email}</small></td>
                                            <td>{contact.phone}</td>
                                            <td>{contact.category || "N/A"}</td>
                                            <td>
                                                <select 
                                                    className={`status-select ${contact.status === 'Chưa đọc' ? 'pending' : 'confirmed'}`}
                                                    value={contact.status}
                                                    onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                                                >
                                                    <option value="Chưa đọc">Chưa đọc</option>
                                                    <option value="Đã liên hệ">Đã liên hệ</option>
                                                    <option value="Đã hoàn thành">Đã hoàn thành</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div className="order-actions">
                                                    <button className="btn-view" onClick={() => setSelectedContact(contact)}>Xem tin</button>
                                                    <button className="btn-delete-order" onClick={() => deleteContact(contact._id)}><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {selectedContact && (
                            <div className="order-modal-overlay" onClick={() => setSelectedContact(null)}>
                                <div className="order-modal-content" onClick={e => e.stopPropagation()}>
                                    <div className="modal-header">
                                        <h3>Chi tiết tin nhắn liên hệ</h3>
                                        <button className="btn-close" onClick={() => setSelectedContact(null)}>×</button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="modal-info-section">
                                            <h4><FileText size={18} /> Thông tin khách hàng</h4>
                                            <p><strong>Họ tên:</strong> {selectedContact.name}</p>
                                            <p><strong>Email:</strong> {selectedContact.email}</p>
                                            <p><strong>Điện thoại:</strong> {selectedContact.phone}</p>
                                            <p><strong>Loại quan tâm:</strong> {selectedContact.category || "N/A"}</p>
                                            <p><strong>Ngày gửi:</strong> {new Date(selectedContact.createdAt).toLocaleString('vi-VN')}</p>
                                        </div>

                                        <div className="modal-info-section" style={{ marginTop: '1.5rem' }}>
                                            <h4><Mail size={18} /> Nội dung lời nhắn</h4>
                                            <div className="contact-message-box" style={{ 
                                                padding: '1rem', 
                                                background: '#f8fafc', 
                                                borderRadius: '8px', 
                                                border: '1px solid #e2e8f0',
                                                lineHeight: '1.6',
                                                whiteSpace: 'pre-wrap'
                                            }}>
                                                {selectedContact.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer" style={{ padding: '1.5rem', textAlign: 'right', borderTop: '1px solid #e2e8f0' }}>
                                        <button className="btn-close-modal" onClick={() => setSelectedContact(null)} style={{
                                            padding: '0.6rem 1.5rem',
                                            background: '#64748b',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer'
                                        }}>Đóng</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;