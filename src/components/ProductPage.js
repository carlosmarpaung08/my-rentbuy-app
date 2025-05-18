
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const products = [
  { id: 1, name: "Kamera DSLR/Mirrorless", price: "Rp300.000", image: "Kamera-DSLRMirrorless.png" },
  { id: 2, name: "Tripod & Stabilizer", price: "Rp100.000", image: "Tripod_Stabilizer.png" },
  { id: 3, name: "Proyektor & Layar", price: "Rp350.000", image: "Proyektor_Layar.png" },
  { id: 4, name: "Speaker & Sound System", price: "Rp500.000", image: "Speaker_Sound_System.png" },
  { id: 5, name: "Mikrofon", price: "Rp150.000", image: "Mikrofon_Sound_Recorder.png" },
  { id: 6, name: "Lighting", price: "Rp200.000", image: "Lighting.png" },
  { id: 7, name: "Karpet & Tikar", price: "Rp100.000", image: "Karpet_Tikar.png" },
  { id: 8, name: "Kursi & Meja Lipat", price: "Rp20.000", image: "Kursi_Meja.png" },
  { id: 9, name: "Backdrop & Standing", price: "Rp500.000", image: "Backdrop_Standing_Banner.png" },
  { id: 10, name: "Panggung atau Podium", price: "Rp800.000", image: "Panggung_Podium.png" },
  { id: 11, name: "Dispenser & Galon", price: "Rp50.000", image: "Dispenser_Galon.png" },
  { id: 12, name: "Peralatan BBQ", price: "Rp150.000", image: "Peralatan_BBQ.png" },
  { id: 13, name: "Termos Besar", price: "Rp50.000", image: "Termos_Besar.png" },
  { id: 14, name: "Nampan", price: "Rp20.000", image: "Nampan_Peralatan_Makan.png" },
  { id: 15, name: "Kabel Ekstensi", price: "Rp50.000", image: "Kabel_Ekstensi_Stopkontak.png" },
  { id: 16, name: "Genset atau UPS", price: "Rp800.000", image: "Genset.png" },
  { id: 17, name: "Palu, Obeng, dll", price: "Rp50.000", image: "Palu_Obeng_dll.png" },
  { id: 18, name: "Kostum Maskot", price: "Rp500.000", image: "Kostum_Maskot.png" },
  { id: 19, name: "Jas Almamater", price: "Rp150.000", image: "Jas_Almamater.png" },
];

const ProductPage = () => {
  const [user, setUser] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    // Auth listener
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Responsive listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      authListener.subscription.unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOrderClick = (id) => {
    if (user) {
      navigate(`/order/${id}`);
    } else {
      navigate("/login");
    }
  };

  const getGridColumns = () => {
    if (windowWidth < 576) return '1fr';
    if (windowWidth < 768) return 'repeat(2, 1fr)'; 
    if (windowWidth < 992) return 'repeat(3, 1fr)';
    if (windowWidth < 1200) return 'repeat(4, 1fr)';
    return 'repeat(5, 1fr)'; 
  };

  return (
    <div style={{...styles.container, paddingTop: "100px"}}>
      <h2 style={styles.title}>List of Products</h2>
      <div style={{
        ...styles.grid,
        gridTemplateColumns: getGridColumns()
      }}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img
              src={`assets/img/gallery/${product.image}`}
              alt={product.name}
              style={styles.image}
            />
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.price}>{product.price}</p>
            <div className="d-grid gap-2">
              <button
                className="btn btn-lg btn-danger"
                onClick={() => handleOrderClick(product.id)}
                type="button"
              >
                Order now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: 1200,
    margin: "0 auto",
    paddingTop: "100px",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    color: "#FFB30E",
  },
  grid: {
    display: "grid",
    gap: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    }
  },
  image: {
    width: "100%",
    height: 150,
    objectFit: "contain",
    marginBottom: 15,
  },
  productName: {
    fontSize: 16,
    margin: "0 0 10px",
    color: "#333",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontWeight: "600",
    color: "#FFB30E",
    marginBottom: 15,
  },
};

export default ProductPage;