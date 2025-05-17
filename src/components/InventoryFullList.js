import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const inventoryItems = [
  {
    img: "Kamera-DSLRMirrorless.png",
    title: "Kamera DSLR/irrorless",
    discount: "15% off",
    status: "Opens Tomorrow",
    price: "Rp300.000",
  },
  {
    img: "Tripod_Stabilizer.png",
    title: "Tripod & Stabilizer",
    discount: "10% off",
    status: "Opens Tomorrow",
    price: "Rp100.000",
  },
  {
    img: "Proyektor_Layar.png",
    title: "Proyektor & Layar",
    discount: "25% off",
    status: "Open Now",
    price: "Rp350.000",
  },
  {
    img: "Speaker_Sound_System.png",
    title: "Speaker & Sound System",
    discount: "20% off",
    status: "Open Now",
    price: "Rp500.000",
  },
  {
    img: "Mikrofon_Sound_Recorder.png",
    title: "Mikrofon",
    discount: "",
    status: "Open Now",
    price: "Rp150.000",
  },
  {
    img: "Lighting.png",
    title: "Lighting",
    discount: "",
    status: "Open Now",
    price: "Rp200.000",
  },
  {
    img: "Karpet_Tikar.png",
    title: "Karpet & Tikar",
    discount: "",
    status: "Open Now",
    price: "Rp100.000",
  },
  {
    img: "Kursi_Meja.png",
    title: "Kursi & Meja Lipat",
    discount: "",
    status: "Open Now",
    price: "Rp20.000",
  },
];

const InventoryFullList = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/products");
  };

  const handleCardClick = async (index) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      navigate(`/order/${index + 1}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <section id="testimonial">
      <div className="container">
        <div className="row h-100">
          <div className="col-lg-7 mx-auto text-center mb-6">
            <h5 className="fw-bold fs-3 fs-lg-5 lh-sm mb-3">Explore Our Full Inventory</h5>
          </div>
        </div>
        <div className="row gx-2">
          {inventoryItems.map(({ img, title, discount, status, price }, i) => (
            <div key={i} className="col-sm-6 col-md-4 col-lg-3 h-100 mb-5">
              <div
                className="card card-span h-100 text-white rounded-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(i)}
              >
                <img
                  className="img-fluid rounded-3 h-100"
                  src={`assets/img/gallery/${img}`}
                  alt={title}
                />
                <div className="card-img-overlay ps-0" style={{ pointerEvents: "none" }}>
                  {discount && (
                    <span className="badge bg-danger p-2 ms-3">
                      <i className="fas fa-tag me-2 fs-0"></i>
                      <span className="fs-0">{discount}</span>
                    </span>
                  )}
                  <span className="badge bg-primary ms-2 me-1 p-2"></span>
                </div>
                <div className="card-body ps-0">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-1 ms-3">
                      <h5 className="mb-0 fw-bold text-1000">{title}</h5>
                      <span className="text-primary fs--1 me-1">
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="mb-0 text-primary">{price}</span>
                    </div>
                  </div>
                  <span
                    className={`badge p-2 ${
                      status === "Open Now" ? "bg-soft-success text-success" : "bg-soft-danger text-danger"
                    } fw-bold fs-1`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="col-12 d-flex justify-content-center mt-5">
            <button className="btn btn-lg btn-primary" onClick={handleViewAll}>
              View All <i className="fas fa-chevron-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InventoryFullList;