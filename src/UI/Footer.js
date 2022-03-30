import React from "react";
import { Clock } from ".";
import classes from "./Footer.module.css";

const Footer = (props) => {
  return (
    <div className={classes.footer}>
      <Clock />
    </div>
  );
};

export default Footer;
