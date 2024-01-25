import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="section1">
        <div className="gridContainer">
          <img
            src="Going offline-cuate (1).png"
            alt="Section 1"
            className="imgSection1"
          />
          <div className="section1Content">
            <h1>Your Ultimate Book Haven</h1>
            <p>
              Searching for your next literary escape? Look no further! Our
              platform is your personal gateway to a vast universe of books,
              where you can effortlessly explore, discover, and add treasures to
              your ever-growing collection.
            </p>
          </div>
        </div>
      </section>

      <section className="section2">
        <div className="grid2Container">
          <div className="feature1">
            <h2 className="featureTitle">Effortless Book Discovery</h2>
            <img
              src="Book lover-pana.png"
              alt="Feature 1"
              className="featureImg"
            />
            <p className="featureText">
              Uncover hidden literary gems effortlessly. Whether you're seeking
              the latest bestseller, a timeless classic, or a niche favorite,
              Shelf-Indulgence is your compass in the vast world of literature.
            </p>
          </div>
          <div className="feature2">
            <h2 className="featureTitle">Personalized Collection Management</h2>
            <img
              src="Reading glasses-bro.png"
              alt="Feature 2"
              className="featureImg"
            />
            <p className="featureText">
              Curate your book haven with ease! Organize your collection
              seamlessly, marking books you've read, those waiting on your
              'to-read' list, and the ones currently captivating your attention.
              Your personalized library is just a click away, putting you in
              control of your literary universe.
            </p>
          </div>
          <div className="feature3">
            <h2 className="featureTitle">Social Reading Experience</h2>
            <img
              src="Conversation-pana.png"
              alt="Feature 3"
              className="featureImg"
            />
            <p className="featureText">
              Immerse yourself in the vibrant world of shared literary
              adventures! Connect with friends, see what books they're
              exploring, and share your own literary journey. Shelf-Indulgence
              goes beyond the solitary reading experience, fostering a community
              where book lovers can inspire and be inspired. Your next favorite
              book might just be a friend's recommendation away!
            </p>
          </div>
        </div>
      </section>

      <section className="section3">
        <div className="section-content">
          <h2 className="cta-title">Call to Action</h2>
          <div className="cta-text">
            Keep the magic alive by organizing your reads! Track the books
            you're currently immersed in, ones on your wishlist, and those
            you've conquered. Your reading journey, your way – Shelf-Indulgence
            empowers you to curate a reading experience as unique as you are.
          </div>
          <button className="cta-button">Try Now</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
