import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import PvcProducts from "./pages/PvcProducts";
import GhepThanhProducts from "./pages/GhepThanhProducts";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import FloatingContact from "./components/FloatingContact";

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gioi-thieu" element={<About />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="/quan-tri" element={<Admin />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/san-pham/composite" element={<Products />} />
          <Route path="/san-pham/pvc" element={<PvcProducts />} />
          <Route path="/san-pham/ghep-thanh" element={<GhepThanhProducts />} />
          <Route path="/san-pham-chi-tiet/:id" element={<ProductDetails />} />
          <Route path="/gio-hang" element={<CartPage />} />
        </Routes>
        <FloatingContact />
      </Router>
    </CartProvider>
  );
}

export default App;