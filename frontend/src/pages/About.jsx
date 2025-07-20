import React from "react";

export default function About() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">📘 About Us</h2>
      <p className="lead">
        Welcome to <strong>BookSto</strong> – your smart book discovery
        companion. Our mission is to connect readers with books they'll love,
        using intelligent recommendations and a passion for reading.
      </p>

      <hr className="my-4" />

      <div className="row mb-5">
        <div className="col-md-12">
          <h4>🎯 Our Mission</h4>
          <p>
            To make book discovery easy, personalized, and enjoyable for
            everyone—whether you're a casual reader or a lifelong learner.
          </p>
        </div>
        <div className="col-md-12">
          <h4>🌟 Our Vision</h4>
          <p>
            To become the most trusted book recommendation platform that
            inspires people to read more and grow through literature.
          </p>
        </div>
      </div>
    </div>
  );
}
