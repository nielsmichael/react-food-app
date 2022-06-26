import React, { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartBtn.module.css";

const HeaderCartBtn = (props) => {
  const [useBump, setUseBump] = useState(false);
  const cartCtx = useContext(CartContext);
  const items = cartCtx;

  const numOfCartItems = cartCtx.items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${useBump ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setUseBump(true);

    const timer = setTimeout(() => {
      setUseBump(false);
    }, 300);

    // called automatically by react as a cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, [items]); // pass items as dependancy

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartBtn;
