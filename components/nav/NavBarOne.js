import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/styles/Nav.css";
import logo from "./logo.jpg";

function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      try {
        window.removeEventListener("scroll");
      } catch (e) {
        console.log(e);
      }
    };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <Link to="/">
        <img
          className="nav__logo"
          // src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
          src={logo}
          alt="DFlix Logo"
        />
      </Link>

      <img
        className="nav__avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/220px-SNice.svg.png"
        alt="DFlix Logo"
      />
      <ul className="nav__ul">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
