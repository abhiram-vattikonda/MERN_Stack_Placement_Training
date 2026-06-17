import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="nav-brand">CCC</div>

      <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        <span className={`hamburger ${menuOpen ? "open" : ""}`}></span>
      </button>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><a href="#hero" onClick={() => setMenuOpen(false)}>Home</a></li>
        <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
        <li><a href="#mission-vision" onClick={() => setMenuOpen(false)}>Mission</a></li>
        <li><a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a></li>
        <li><a href="#footer" onClick={() => setMenuOpen(false)}>Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
