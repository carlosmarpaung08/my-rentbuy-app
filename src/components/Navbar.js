import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Navbar = () => {
  const navLinkStyle = {
    fontWeight: "600",
    fontSize: "1.1rem",
    padding: "0.75rem 1.2rem",
    borderRadius: "8px",
    transition: "background-color 0.3s ease, color 0.3s ease",
    color: "#FFB30E",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "#e6f0ff";
    e.currentTarget.style.color = "#FFB30E";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "";
    e.currentTarget.style.color = "#FFB30E";
  };

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
  ];

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Close dropdown on click outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      authListener.subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      data-navbar-on-scroll="data-navbar-on-scroll"
    >
      <div className="container">
        <Link className="navbar-brand d-inline-flex" to="/">
          <img
            className="d-inline-block"
            src="assets/img/gallery/Logo.png"
            alt="logo"
            style={{ width: "50px", height: "auto" }}
          />
          <span className="text-1000 fs-3 fw-bold ms-2 text-gradient">RentBuy</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div
          className="collapse navbar-collapse border-top border-lg-0 my-2 mt-lg-0"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map(({ name, href }) => (
              <li className="nav-item" key={name}>
                <Link
                  className={`nav-link${location.pathname === href ? " active" : ""}`}
                  to={href}
                  style={navLinkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="d-flex mt-4 mt-lg-0 ms-lg-auto ms-xl-0 position-relative"
            ref={dropdownRef}
          >
            {user ? (
              <div
                className="btn btn-white shadow-warning text-warning d-flex align-items-center"
                style={{ cursor: "pointer", userSelect: "none" }}
                onClick={toggleDropdown}
              >
                <i className="fas fa-user me-2"></i>
                {user.user_metadata?.full_name || user.email}
                <i
                  className={`fas fa-caret-${dropdownOpen ? "up" : "down"} ms-2`}
                  style={{ fontSize: "0.8rem" }}
                ></i>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-white shadow-warning text-warning"
                style={{ display: "flex", alignItems: "center" }}
              >
                Login
              </Link>
            )}

            {dropdownOpen && (
              <ul
                className="dropdown-menu show shadow"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "0.5rem",
                  minWidth: "10rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "#fff",
                  listStyle: "none",
                  padding: "0.5rem 0",
                  zIndex: 1050,
                }}
              >
                <li>
                  <Link
                    to="/history"
                    className="dropdown-item text-warning"
                    onClick={() => setDropdownOpen(false)}
                  >
                    History
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-warning"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
