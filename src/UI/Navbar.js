import React from "react";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <div className={classes.navbar}>
      <a href="#home">New Game</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
    </div>
  );
};
export default Navbar;
