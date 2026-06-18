export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h3>Products</h3>
          <a href="/">Current Weather</a>
          <a href="/">Forecast</a>
          <a href="/">Maps</a>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <a href="/">About</a>
          <a href="/">Pricing</a>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <a href="/">Help</a>
          <a href="/">FAQ</a>
        </div>

        <div className="footer-column">
          <h3>Offices</h3>
          <p>London</p>
          <p>USA</p>
        </div>

      </div>
    </footer>
  );
} 