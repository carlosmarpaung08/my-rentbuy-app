import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import DiscountProductCards from "./components/DiscountProductCards";
import PopularItemsCarousel from "./components/PopularItemsCarousel";
import InventoryFullList from "./components/InventoryFullList";
import PromoBanner from "./components/PromoBanner";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProductPage from "./components/ProductPage";
import OrderDetail from "./components/OrderDetail";
import History from "./components/History"; 

const HomePage = () => (
  <>
    <HeroSection />
    <DiscountProductCards />
    <PopularItemsCarousel />
    <InventoryFullList />
    <PromoBanner />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="App">
        <main className="main" id="top">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
