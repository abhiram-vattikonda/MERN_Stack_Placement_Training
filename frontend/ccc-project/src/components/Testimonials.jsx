const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Developer at TCS",
    text: "The MERN stack training was incredibly comprehensive. I landed my dream job within two months of completing the program!",
  },
  {
    name: "Rahul Verma",
    role: "Full Stack Engineer at Infosys",
    text: "The hands-on approach and mentorship helped me build real projects that stood out in my portfolio. Highly recommended!",
  },
  {
    name: "Ananya Reddy",
    role: "Frontend Developer at Wipro",
    text: "From zero coding experience to a confident developer — the journey was challenging but the support was exceptional.",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <h2>What Our Students Say</h2>

      <div className="testimonial-grid">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <p className="testimonial-text">"{t.text}"</p>
            <div className="testimonial-author">
              <div className="author-avatar">{t.name[0]}</div>
              <div>
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
