import React from "react";

const HeroSection = () => {
  return (
    <section className="py-5 overflow-hidden bg-primary" id="home">
      <div className="container">
        <div className="row flex-center">
          <div className="col-md-5 col-lg-6 order-0 order-md-1 mt-8 mt-md-0">
            <a className="img-landing-banner" href="#!">
              <img
                className="img-fluid"
                src="assets/img/gallery/kamera.png"
                alt="hero-header"
              />
            </a>
          </div>
          <div className="col-md-7 col-lg-6 py-8 text-md-start text-center">
            <h1 className="display-1 fs-md-5 fs-lg-6 fs-xl-8 text-light">Butuh barang sekarang?</h1>
            <h1 className="text-800 mb-5 fs-4">
              Cukup beberapa klik, temukan barang sewa atau beli
              <br className="d-none d-xxl-block" /> yang tersedia di sekitarmu
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
