import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

const products = [
  { id: 1, name: 'Kamera DSLR/Mirrorless', price: 'Rp300.000', image: 'Kamera-DSLRMirrorless.png' },
  { id: 2, name: 'Tripod & Stabilizer', price: 'Rp100.000', image: 'Tripod_Stabilizer.png' },
  { id: 3, name: 'Proyektor & Layar', price: 'Rp350.000', image: 'Proyektor_Layar.png' },
  { id: 4, name: 'Speaker & Sound System', price: 'Rp500.000', image: 'Speaker_Sound_System.png' },
  { id: 5, name: 'Mikrofon', price: 'Rp150.000', image: 'Mikrofon_Sound_Recorder.png' },
  { id: 6, name: 'Lighting', price: 'Rp200.000', image: 'Lighting.png' },
  { id: 7, name: 'Karpet & Tikar', price: 'Rp100.000', image: 'Karpet_Tikar.png' },
  { id: 8, name: 'Kursi & Meja Lipat', price: 'Rp20.000', image: 'Kursi_Meja.png' },
  { id: 9, name: 'Backdrop & Standing', price: 'Rp500.000', image: 'Backdrop_Standing_Banner.png' },
  { id: 10, name: 'Panggung atau Podium', price: 'Rp800.000', image: 'Panggung_Podium.png' },
  { id: 11, name: 'Dispenser & Galon', price: 'Rp50.000', image: 'Dispenser_Galon.png' },
  { id: 12, name: 'Peralatan BBQ', price: 'Rp150.000', image: 'Peralatan_BBQ.png' },
  { id: 13, name: 'Termos Besar', price: 'Rp50.000', image: 'Termos_Besar.png' },
  { id: 14, name: 'Nampan', price: 'Rp20.000', image: 'Nampan_Peralatan_Makan.png' },
  { id: 15, name: 'Kabel Ekstensi', price: 'Rp50.000', image: 'Kabel_Ekstensi_Stopkontak.png' },
  { id: 16, name: 'Genset atau UPS', price: 'Rp800.000', image: 'Genset.png' },
  { id: 17, name: 'Palu, Obeng, dll', price: 'Rp50.000', image: 'Palu_Obeng_dll.png' },
  { id: 18, name: 'Kostum Maskot', price: 'Rp500.000', image: 'Kostum_Maskot.png' },
  { id: 19, name: 'Jas Almamater', price: 'Rp150.000', image: 'Jas_Almamater.png' },
];

const paymentDetails = {
  "Transfer Bank": {
    title: "Transfer Bank",
    info: "Bank ABC - No Rekening: 123-456-7890\na.n. PT. Contoh",
  },
  "E-Wallet": {
    title: "E-Wallet",
    info: "OVO/DANA/GoPay - No HP: 0812-3456-7890",
  },
};

const OrderDetail = () => {
  const { id } = useParams();
  const [orderType, setOrderType] = useState('beli');
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [user, setUser] = useState(null);

  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
  }, []);

  if (!product) return <p style={{ textAlign: 'center', marginTop: 50 }}>Produk tidak ditemukan.</p>;

  const parsePrice = (priceStr) => Number(priceStr.replace(/[^0-9]/g, ''));
  const formatRupiah = (number) =>
    "Rp" + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const basePrice = parsePrice(product.price);
  const pricePerUnit = orderType === 'sewa' ? basePrice / 2 : basePrice;
  const totalPrice = pricePerUnit * quantity;

  const handleOrderTypeChange = (e) => setOrderType(e.target.value);
  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val >= 1) setQuantity(val);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPaymentMethod('');
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Fungsi untuk simpan data order ke Supabase
  const saveOrder = async () => {
    if (!user) {
      setAlertMessage("Anda harus login untuk melakukan pemesanan");
      return false;
    }

    const { data, error } = await supabase.from('orders').insert([
      {
        user_id: user.id,
        product_id: product.id,
        order_type: orderType,
        quantity,
        payment_method: paymentMethod,
        total_price: totalPrice,
      }
    ]);

    if (error) {
      setAlertMessage("Gagal menyimpan pesanan: " + error.message);
      return false;
    } else {
      setAlertMessage("Pesanan berhasil disimpan!");
      return true;
    }
  };

  // Handler konfirmasi pembayaran
  const handleConfirmPayment = async () => {
    if (!paymentMethod) {
      setAlertMessage("Silakan pilih metode pembayaran!");
      return;
    }

    const success = await saveOrder();

    if (success) {
      setShowModal(false);
      // Bisa redirect ke halaman lain jika mau, contoh:
      // navigate('/orders');
    }
  };

  return (
    <div style={styles.container}>
      {alertMessage && (
        <div style={styles.alertBox}>
          {alertMessage}
          <button onClick={() => setAlertMessage(null)} style={styles.alertClose} aria-label="Close alert">&times;</button>
        </div>
      )}

      <div style={styles.card}>
        <img
          src={`/assets/img/gallery/${product.image}`}
          alt={product.name}
          style={styles.image}
        />
        <h2 style={styles.name}>{product.name}</h2>
        <p style={styles.price}>{formatRupiah(totalPrice)}</p>

        <form onSubmit={handleOpenModal} style={styles.form}>
          <div style={styles.orderOptions}>
            <label style={{ ...styles.radioLabel, ...styles.orderOptionLabel, ...(orderType === 'beli' ? styles.activeOption : {}) }}>
              <input
                type="radio"
                name="orderType"
                value="beli"
                checked={orderType === 'beli'}
                onChange={handleOrderTypeChange}
                style={styles.radioInput}
              />
              Beli
            </label>
            <label style={{ ...styles.radioLabel, ...styles.orderOptionLabel, ...(orderType === 'sewa' ? styles.activeOption : {}) }}>
              <input
                type="radio"
                name="orderType"
                value="sewa"
                checked={orderType === 'sewa'}
                onChange={handleOrderTypeChange}
                style={styles.radioInput}
              />
              Sewa
            </label>
          </div>

          <div style={styles.quantityWrapper}>
            <label htmlFor="quantity" style={styles.label}>Jumlah</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Pesan Sekarang
          </button>
        </form>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Pilih Metode Pembayaran</h3>
              <button 
                onClick={handleCloseModal} 
                style={styles.closeButton} 
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div style={styles.orderSummary}>
              <h4 style={styles.summaryTitle}>Ringkasan Pesanan</h4>
              <div style={styles.summaryRow}>
                <span>Produk:</span>
                <span style={styles.summaryValue}>{product.name}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Jumlah:</span>
                <span style={styles.summaryValue}>{quantity}</span>
              </div>
              <div style={styles.summaryDivider}></div>
              <div style={styles.totalRow}>
                <span>Total:</span>
                <span style={styles.totalValue}>{formatRupiah(totalPrice)}</span>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.selectLabel}>Metode Pembayaran</label>
              <div style={styles.selectWrapper}>
                <select
                  value={paymentMethod}
                  onChange={handlePaymentChange}
                  style={styles.select}
                >
                  <option value="">-- Pilih Metode Pembayaran --</option>
                  <option value="Transfer Bank">Transfer Bank</option>
                  <option value="E-Wallet">E-Wallet</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
                <div style={styles.selectArrow}></div>
              </div>
            </div>

            {(paymentMethod === "Transfer Bank" || paymentMethod === "E-Wallet") && (
              <div style={styles.paymentInfo}>
                <div style={styles.paymentInfoHeader}>
                  <div style={styles.paymentIconWrapper}>
                    <div style={styles.paymentIcon}>
                      {paymentMethod === "Transfer Bank" ? "🏦" : "💳"}
                    </div>
                  </div>
                  <h4 style={styles.paymentTitle}>{paymentDetails[paymentMethod].title}</h4>
                </div>
                <p style={{ ...styles.paymentDesc, whiteSpace: 'pre-line' }}>
                  {paymentDetails[paymentMethod].info}
                </p>
              </div>
            )}

            <div style={styles.modalButtons}>
              <button 
                onClick={handleCloseModal} 
                style={styles.cancelButton}
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmPayment} 
                style={styles.confirmButton}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    maxWidth: 600,
    margin: "40px auto",
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 30,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 250,
    objectFit: "contain",
    borderRadius: 8,
    marginBottom: 20,
  },
  name: {
    color: "#FFB30E",
    fontSize: 24,
    marginBottom: 10,
  },
  price: {
    fontWeight: "700",
    color: "#FFB30E",
    fontSize: 18,
    marginBottom: 15,
  },
  form: {
    marginTop: 20,
    textAlign: "left",
  },
  orderOptions: {
    display: "flex",
    justifyContent: "center",
    gap: 40,
    marginBottom: 25,
  },
  orderOptionLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 18,
    color: "#FFB30E",
    userSelect: "none",
    padding: "6px 12px",
    borderRadius: 6,
    border: "2px solid #FFB30E",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  activeOption: {
    backgroundColor: "#FFF7E0",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
    userSelect: "none",
  },
  radioInput: {
    marginRight: 10,
    cursor: "pointer",
  },
  quantityWrapper: {
    marginBottom: 25,
    display: "flex",
    flexDirection: "column",
    maxWidth: 150,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  input: {
    padding: "10px 12px",
    fontSize: 16,
    borderRadius: 6,
    border: "1.5px solid #ccc",
    outlineColor: "#FFB30E",
  },
  button: {
    width: "100%",
    padding: "14px 0",
    backgroundColor: "#FFB30E",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0 4px 8px rgba(255, 179, 14, 0.3)",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "90%",
    maxWidth: 450,
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    position: "relative",
    overflow: "hidden",
    animation: "scaleIn 0.3s ease-out",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #f0f0f0",
    backgroundColor: "#FFF9E6",
  },
  modalTitle: {
    margin: 0,
    fontWeight: "700",
    color: "#FFB30E",
    fontSize: 22,
  },
  closeButton: {
    background: "transparent",
    border: "none",
    fontSize: 28,
    fontWeight: "700",
    color: "#FFB30E",
    cursor: "pointer",
    lineHeight: 1,
    padding: 0,
    transition: "transform 0.2s ease",
  },
  orderSummary: {
    margin: "20px 24px",
    backgroundColor: "#FFF9E6",
    borderRadius: 12,
    padding: 16,
    border: "1px solid rgba(255,179,14,0.3)",
  },
  summaryTitle: {
    margin: "0 0 12px 0",
    fontSize: 16,
    fontWeight: 600,
    color: "#996A00",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
    fontSize: 15,
    color: "#555",
  },
  summaryValue: {
    fontWeight: 500,
    color: "#333",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "rgba(255,179,14,0.3)",
    margin: "12px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 700,
    fontSize: 16,
  },
  totalValue: {
    color: "#FFB30E",
    fontWeight: 700,
  },
  formGroup: {
    margin: "0 24px 20px",
  },
  selectLabel: {
    display: "block",
    marginBottom: 8,
    fontSize: 15,
    fontWeight: 500,
    color: "#555",
  },
  selectWrapper: {
    position: "relative",
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    fontSize: 16,
    borderRadius: 10,
    border: "1.5px solid #ddd",
    appearance: "none",
    color: "#333",
    backgroundColor: "#fff",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  },
  selectArrow: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: "translateY(-50%)",
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderTop: "8px solid #FFB30E",
    pointerEvents: "none",
  },
  paymentInfo: {
    margin: "0 24px 20px",
    backgroundColor: "#F0F7FF",
    borderRadius: 12,
    padding: 16,
    border: "1px solid rgba(66,133,244,0.3)",
    animation: "fadeIn 0.4s ease-out",
  },
  paymentInfoHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
  },
  paymentIconWrapper: {
    marginRight: 12,
  },
  paymentIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3EFFF",
    width: 32,
    height: 32,
    borderRadius: "50%",
    fontSize: 18,
  },
  paymentTitle: {
    margin: 0,
    fontWeight: 600,
    color: "#2D5FB3",
    fontSize: 16,
  },
  paymentDesc: {
    margin: "0 0 0 44px",
    fontSize: 14,
    color: "#4A6FA5",
    lineHeight: 1.4,
  },
  modalButtons: {
    display: "flex",
    borderTop: "1px solid #f0f0f0",
  },
  cancelButton: {
    flex: 1,
    padding: "16px 0",
    fontWeight: 600,
    fontSize: 16,
    border: "none",
    backgroundColor: "#f5f5f5",
    color: "#666",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  confirmButton: {
    flex: 1,
    padding: "16px 0",
    fontWeight: 600,
    fontSize: 16,
    border: "none",
    backgroundColor: "#FFB30E",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  alertBox: {
    position: "fixed",
    top: 30,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "16px 28px",
    borderRadius: 30,
    boxShadow: "0 6px 16px rgba(40,167,69,0.5)",
    fontSize: 16,
    fontWeight: "700",
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    gap: 12,
    maxWidth: 360,
    userSelect: "none",
    animation: "slideDown 0.4s ease-out",
  },
  alertClose: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 20,
    cursor: "pointer",
    padding: 0,
    lineHeight: 1,
  },
};

// Tambahkan CSS animation global
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { opacity: 0; transform: translate(-50%, -20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
`;
document.head.appendChild(styleSheet);

export default OrderDetail;