function About() {
  return (
    <section id="about" className="about">
      <h2>About Us</h2>
      <p>
        We are a dedicated team committed to providing high-quality training and
        innovative solutions. Our mission is to bridge the gap between academic
        learning and industry requirements, ensuring every student is
        career-ready.
      </p>

      <div className="cards">
        <div className="card">
          <div className="card-icon">🎓</div>
          <h3>Expert Training</h3>
          <p>Learn from industry professionals with real-world experience.</p>
        </div>

        <div className="card">
          <div className="card-icon">🚀</div>
          <h3>Modern Tech Stack</h3>
          <p>Hands-on projects using the latest technologies and frameworks.</p>
        </div>

        <div className="card">
          <div className="card-icon">💼</div>
          <h3>Career Support</h3>
          <p>Resume building, mock interviews, and placement assistance.</p>
        </div>
      </div>
    </section>
  );
}

export default About;
