import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="section1">
        <img
          src="Going offline-cuate (1).png"
          alt="Section 1"
          className="imgSection1"
        />
        <div className="section1Content">
          <h1> Attention-grabbing headline</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
            autem voluptatum explicabo accusamus tempore minus assumenda sunt
            facilis consectetur voluptatibus reprehenderit non repellat
            repudiandae, iure fugit a. A, soluta atque.
          </p>
        </div>
      </section>

      <section className="section2">
        <h2 className="feature-title">Key Features</h2>
        <div className="section2-content">
          <div className="feature1">
            <img src="Book lover-pana.png" alt="Feature 1" />
            <p className="feature-text">Feature 1 description</p>
          </div>
          <div className="feature2">
            <img src="Reading glasses-bro.png" alt="Feature 2" />
            <p className="feature-text">Feature 2 description</p>
          </div>
          <div className="feature3">
            <img src="Conversation-pana.png" alt="Feature 3" />
            <p className="feature-text">Feature 1 description</p>
          </div>
        </div>
      </section>

      <section className="section3">
        <div className="section-content">
          <h2 className="cta-title">Call to Action</h2>
          <div className="cta-text">Encouraging text to try the website.</div>
          <button className="cta-button">Try Now</button>
        </div>
      </section>

      <section className="section4">
        <div className="section-content">
          <img src="path/to/image2.jpg" alt="Image 1" />
          <img src="path/to/image3.jpg" alt="Image 2" />
          <img src="path/to/image4.jpg" alt="Image 3" />
          <img src="path/to/image5.jpg" alt="Image 4" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
