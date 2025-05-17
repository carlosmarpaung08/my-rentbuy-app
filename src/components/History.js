import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const products = [
  { id: 1, name: "Kamera DSLR/Mirrorless" },
  { id: 2, name: "Tripod & Stabilizer" },
  { id: 3, name: "Proyektor & Layar" },
  { id: 4, name: "Speaker & Sound System" },
  { id: 5, name: "Mikrofon" },
  { id: 6, name: "Lighting" },
  { id: 7, name: "Karpet & Tikar" },
  { id: 8, name: "Kursi & Meja Lipat" },
  { id: 9, name: "Backdrop & Standing" },
  { id: 10, name: "Panggung atau Podium" },
  { id: 11, name: "Dispenser & Galon" },
  { id: 12, name: "Peralatan BBQ" },
  { id: 13, name: "Termos Besar" },
  { id: 14, name: "Nampan" },
  { id: 15, name: "Kabel Ekstensi" },
  { id: 16, name: "Genset atau UPS" },
  { id: 17, name: "Palu, Obeng, dll" },
  { id: 18, name: "Kostum Maskot" },
  { id: 19, name: "Jas Almamater" },
];

const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          setError("Anda harus login untuk melihat history.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("orders")
          .select(`id, product_id, order_type, quantity, payment_method, total_price, created_at`)
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (error) return <p style={{ ...styles.message, color: "red" }}>{error}</p>;

  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : "Produk tidak diketahui";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Riwayat Pesanan</h2>
      {orders.length === 0 ? (
        <p style={styles.message}>Belum ada riwayat pesanan.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>No</th>
              <th style={styles.th}>Produk</th>
              <th style={styles.th}>Tipe Pesanan</th>
              <th style={styles.th}>Jumlah</th>
              <th style={styles.th}>Metode Pembayaran</th>
              <th style={styles.th}>Total Harga</th>
              <th style={styles.th}>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td style={styles.tdCenter}>{index + 1}</td>
                <td style={styles.td}>{getProductName(order.product_id)}</td>
                <td style={styles.tdCenter}>{order.order_type}</td>
                <td style={styles.tdCenter}>{order.quantity}</td>
                <td style={styles.tdCenter}>{order.payment_method}</td>
                <td style={styles.tdRight}>
                  Rp{order.total_price.toLocaleString("id-ID")}
                </td>
                <td style={styles.td}>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 1100,
    margin: "40px auto",
    padding: "0 15px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  title: {
    color: "#FFB30E",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "700",
    fontSize: 28,
  },
  message: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 30,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 4px 10px rgb(0 0 0 / 0.1)",
    borderRadius: 8,
    overflow: "hidden",
  },
  theadRow: {
    backgroundColor: "#FFB30E",
    color: "#fff",
    fontWeight: "700",
    textAlign: "left",
  },
  th: {
    padding: "12px 15px",
    borderBottom: "2px solid rgba(255,255,255,0.3)",
  },
  td: {
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
  },
  tdCenter: {
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
  },
  tdRight: {
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
    textAlign: "right",
    fontWeight: "600",
    color: "#FF7F50",
  },
  evenRow: {
    backgroundColor: "#fafafa",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
};

export default History;
