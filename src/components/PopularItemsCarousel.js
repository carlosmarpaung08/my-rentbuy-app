import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const popularItems = [
  { id: 1, img: "Mikrofon_Sound_Recorder.png", title: "Mikrofon", price: "Rp150.000" },
  { id: 2, img: "Lighting.png", title: "Lighting", price: "Rp200.000" },
  { id: 3, img: "Karpet_Tikar.png", title: "Karpet & Tikar", price: "Rp100.000" },
  { id: 4, img: "Kursi_Meja.png", title: "Kursi & Meja Lipat", price: "Rp20.000" },
  { id: 5, img: "Backdrop_Standing_Banner.png", title: "Backdrop & Standing", price: "Rp500.000" },
  { id: 6, img: "Tenda_Kanopi.png", title: "Tenda & Kanopi", price: "Rp800.000" },
  { id: 7, img: "Panggung_Podium.png", title: "Panggung atau Podium", price: "Rp1.500.000" },
  { id: 8, img: "Dispenser_Galon.png", title: "Dispenser & Galon", price: "Rp50.000" },
  { id: 9, img: "Peralatan_BBQ.png", title: "Peralatan BBQ", price: "Rp150.000" },
  { id: 10, img: "Termos_Besar.png", title: "Termos Besar", price: "Rp50.000" },
];

const PopularItemsCarousel = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleOrderClick = (id) => {
    if (user) {
      navigate(`/order/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="py-4 overflow-hidden">
      <div className="container">
        <div className="row h-100">
          <div className="col-lg-7 mx-auto text-center mt-7 mb-5">
            <h5 className="fw-bold fs-3 fs-lg-5 lh-sm">Popular items</h5>
          </div>
          <div className="col-12">
            <div
              className="carousel slide"
              id="carouselPopularItems"
              data-bs-touch="false"
              data-bs-interval="false"
            >
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <div className="row gx-3 h-100 align-items-center">
                    {popularItems.slice(0, 5).map(({ id, img, title, price }) => (
                      <div key={id} className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                        <div className="card card-span h-100 rounded-3">
                          <img
                            className="img-fluid rounded-3 h-100"
                            src={`assets/img/gallery/${img}`}
                            alt={title}
                          />
                          <div className="card-body ps-0">
                            <h5 className="fw-bold text-1000 text-truncate mb-1">{title}</h5>
                            <div>
                              <span className="text-warning me-2">
                                <i className="fas fa-map-marker-alt"></i>
                              </span>
                              <span className="text-primary">{price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-lg btn-danger"
                            onClick={() => handleOrderClick(id)}
                          >
                            Order now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="carousel-item" data-bs-interval="5000">
                  <div className="row gx-3 h-100 align-items-center">
                    {popularItems.slice(5).map(({ id, img, title, price }) => (
                      <div key={id} className="col-sm-6 col-md-4 col-xl mb-5 h-100">
                        <div className="card card-span h-100 rounded-3">
                          <img
                            className="img-fluid rounded-3 h-100"
                            src={`assets/img/gallery/${img}`}
                            alt={title}
                          />
                          <div className="card-body ps-0">
                            <h5 className="fw-bold text-1000 text-truncate mb-1">{title}</h5>
                            <div>
                              <span className="text-warning me-2">
                                <i className="fas fa-map-marker-alt"></i>
                              </span>
                              <span className="text-primary">{price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-lg btn-danger"
                            onClick={() => handleOrderClick(id)}
                          >
                            Order now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev carousel-icon"
                type="button"
                data-bs-target="#carouselPopularItems"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon hover-top-shadow"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next carousel-icon"
                type="button"
                data-bs-target="#carouselPopularItems"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon hover-top-shadow"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularItemsCarousel;
