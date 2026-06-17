import heroImg from "../assets/hero.png";

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Welcome to CCC</h1>
        <p>
          Empowering students with cutting-edge technology skills and
          industry-ready expertise to build a brighter future.
        </p>
        <button className="btn-primary">Get Started</button>
      </div>

      <div className="hero-image">
        <img src={heroImg} alt="Hero illustration" />
      </div>
    </section>
  );
}

export default Hero;
