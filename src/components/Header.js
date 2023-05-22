import React from "react";
import Nav from "./Nav";
import { SiArgos } from "react-icons/si";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <h2>
        <Link to="/">
          <SiArgos style={{ borderRadius: "50%", color: "white" }} />
        </Link>
      </h2>
      <Nav />
    </div>
  );
}

export default Header;
