import React from "react";

const PromoBanner = () => {
  return (
    <section className="py-0">
      <div
        className="bg-holder"
        style={{
          backgroundImage: "url(assets/img/gallery/rak_barang.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      <div className="container">
        <div className="row flex-center">
          <div className="col-xxl-9 py-7 text-center">
            <h1 className="fw-bold mb-4 text-white fs-6">
              Temukan barang terbaik untuk dibeli <br />
              atau disewa dengan mudah!
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
