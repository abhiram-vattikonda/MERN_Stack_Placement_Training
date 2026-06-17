function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h3>CCC</h3>
          <p>Empowering students with industry-ready skills and career opportunities.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#mission-vision">Mission</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>📧 info@ccc.com</li>
            <li>📞 +91 98765 43210</li>
            <li>📍 Hyderabad, India</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="GitHub">GitHub</a>
            <a href="#" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 CCC. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
