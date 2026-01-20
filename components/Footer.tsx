"use client";

import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footerInner">
        {/* Left: locations */}
        <div className="footerLocations">
        <div className="locationItem">
            <span className="locationDot locationDotBlue" />
            <span>Ann Arbor, Michigan</span>
        </div>

        <div className="locationItem">
            <span className="locationDot locationDotYellow" />
            <span>New Hyde Park, New York</span>
        </div>
        </div>

        {/* Center: copyright */}
        <div className="footerCopyright">
          © {year} Sandeep Sawhney
        </div>

        {/* Right: socials */}
        <div className="footerSocials">
          <a
            href="https://www.linkedin.com/in/sandeep-sawhney-894b12301/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/SandeepSawhney2015"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.instagram.com/sanders11_/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="mailto:ssawhney@umich.edu"
            target="_blank"
            rel="noreferrer"
            aria-label="Gmail"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
