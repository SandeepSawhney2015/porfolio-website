"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";


export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`topbar ${scrolled ? "topbarScrolled" : ""}`}>
      <div className="topbarInner">
        <div className="navSocials">
            <a
                href="https://www.linkedin.com/in/sandeep-sawhney-894b12301/"
                target="_blank"
                rel="noreferrer"
                className="navSocialIcon"
                aria-label="LinkedIn"
            >
                <FaLinkedin />
            </a>

            <a
                href="https://github.com/SandeepSawhney2015"
                target="_blank"
                rel="noreferrer"
                className="navSocialIcon"
                aria-label="GitHub"
            >
                <FaGithub />
            </a>

            <a
                href="https://www.instagram.com/sanders11_/"
                target="_blank"
                rel="noreferrer"
                className="navSocialIcon"
                aria-label="Instagram"
            >
                <FaInstagram />
            </a>
        </div>


        <nav className="nav" aria-label="Primary">
          <a className="navItem" href="#home">Home</a>
          <a className="navItem" href="#about">About Me</a>
          <a className="navItem" href="#projects">Projects</a>
        </nav>

        <div className="logo" aria-label="Logo">
          <Image
            src="/generalIcon.png"
            alt="Logo"
            width={36}
            height={36}
            priority
          />
        </div>
      </div>
    </header>
  );
}
