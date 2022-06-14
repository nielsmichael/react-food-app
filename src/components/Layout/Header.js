import React from "react";

import mealsImg from "../../assets/meals.jpeg";
import classes from "./Header.module.css";
import HeaderCartBtn from "./HeaderCartBtn";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Niels' Meals!</h1>
        <HeaderCartBtn onClick={props.onCartClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="table with food. yum." />
      </div>
    </>
  );
};

export default Header;
