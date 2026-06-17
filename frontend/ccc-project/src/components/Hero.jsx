import "../index.css";

function Hero() {
  return (
    <>
      <section className="hero">
        <div className="content">
          <h1>Welcome to Our Website</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            quisquam ullam ducimus velit quasi dolorum deserunt in nihil quos.
          </p>
          <button>Learn More</button>
        </div>

        <div className="image">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/048/775/730/small/cute-shih-tzu-dog-in-pink-sweatshirt-and-sunglasses-on-pastel-background-photo.jpg"
            alt="Dog"
          />
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>
          We provide high-quality services and innovative solutions to help our
          customers achieve their goals.
        </p>
      </section>

      <section className="cards">
        <div className="card">
          <h3>Service 1</h3>
          <p>Professional and reliable solutions.</p>
        </div>

        <div className="card">
          <h3>Service 2</h3>
          <p>Modern technologies and best practices.</p>
        </div>

        <div className="card">
          <h3>Service 3</h3>
          <p>Dedicated support for all customers.</p>
        </div>
      </section>
    </>
  );
}

export default Hero;