import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="text-center bg-body" data-bs-theme="dark">
    <div className="container py-4 py-lg-5">
      <ul className="list-inline">
        <li className="list-inline-item me-4">
          <a className="link-body-emphasis" href="#">Web design</a>
        </li>
        <li className="list-inline-item me-4">
          <a className="link-body-emphasis" href="#">Development</a>
        </li>
        <li className="list-inline-item">
          <a className="link-body-emphasis" href="#">Hosting</a>
        </li>
      </ul>
      <ul className="list-inline">
        {[
          { icon: "facebook", className: "bi-facebook" },
          { icon: "twitter", className: "bi-twitter-x" },
          { icon: "instagram", className: "bi-instagram" }
        ].map((social, index) => (
          <li key={index} className="list-inline-item me-4">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className={`bi ${social.className} text-body`}
              >
                {/* SVG path opcional */}
              </svg>
            </a>
          </li>
        ))}
      </ul>
      <p className="text-body mb-0">Copyright © 2025 Brand</p>
    </div>
  </footer>
);

export default Footer;