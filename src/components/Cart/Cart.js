import React, { useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  // Declare context
  const cartCtx = useContext(CartContext);

  const totalAmt = `$${cartCtx.totalAmount.toFixed(2)}`;
  // hasItems to check if items are in the cart
  const hasItems = cartCtx.items.length > 0;

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {
        // Pass cart items via context to ul list to be mapped
        cartCtx.items.map((item) => (
          <li>{item.name}</li>
        ))
      }
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total:</span>
        {/* Hardcode for now */}
        <span>{totalAmt}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
