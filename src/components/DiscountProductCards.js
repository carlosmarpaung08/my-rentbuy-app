import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const products = [
  {
    img: "Kamera-DSLRMirrorless.png",
    title: "Kamera DSLR/irrorless",
    discount: 15,
    remaining: "6 days Remaining",
  },
  {
    img: "Tripod_Stabilizer.png",
    title: "Tripod & Stabilizer",
    discount: 10,
    remaining: "6 days Remaining",
  },
  {
    img: "Proyektor_Layar.png",
    title: "Proyektor & Layar",
    discount: 25,
    remaining: "6 days Remaining",
  },
  {
    img: "Speaker_Sound_System.png",
    title: "Speaker & Sound System",
    discount: 20,
    remaining: "6 days Remaining",
  },
];

const DiscountProductCards = () => {
  const navigate = useNavigate();

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
    <section className="py-0">
      <div className="container">
        <div className="row h-100 gx-2 mt-7">
          {products.map(({ img, title, discount, remaining }, i) => (
            <div key={i} className="col-sm-6 col-lg-3 mb-3 mb-md-0 h-100 pb-4">
              <div
                className="card card-span h-100"
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(i)}
              >
                <div className="position-relative">
                  <img
                    className="img-fluid rounded-3 w-100"
                    src={`assets/img/gallery/${img}`}
                    alt={title}
                  />
                  <div className="card-actions">
                    <div
                      className="badge badge-foodwagon bg-primary p-4"
                      style={{ borderRadius: "0 12px 12px 0" }}
                    >
                      <div className="d-flex flex-between-center">
                        <div className="text-white fs-7">{discount}</div>
                        <div className="d-block text-white fs-2">
                          % <br />
                          <div className="fw-normal fs-1 mt-2">Off</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0">
                  <h5 className="fw-bold text-1000 text-truncate">{title}</h5>
                  <span className="badge bg-soft-danger py-2 px-3">
                    <span className="fs-1 text-danger">{remaining}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountProductCards;
