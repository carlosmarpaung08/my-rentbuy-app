import React from "react";

const Footer = () => {
  return (
    <section className="py-5 bg-1000 text-white">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">About Us</h5>
            <p>
              Your trusted platform for renting and buying a wide range of
              high-quality electronics with ease, offering the best deals and
              exceptional customer service to meet all your needs.
            </p>
          </div>
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Customer Service</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-200 text-decoration-none">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#!" className="text-200 text-decoration-none">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#!" className="text-200 text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#!" className="text-200 text-decoration-none">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p>Email: support@rentbuy.com</p>
            <p>Phone: +62 123 456 7890</p>
            <p>Address: Jl. Contoh No.123, Jakarta</p>
          </div>
        </div>

        <hr className="border border-800" />

        <div className="row flex-center pb-3">
          <div className="col-md-6 order-0">
            <p className="text-200 text-center text-md-start">
              © 2025 RentBuy. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 order-1"></div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
