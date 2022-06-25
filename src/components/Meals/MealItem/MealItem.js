import React, { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
// import desired context
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  // Establish context connection
  const cartCtx = useContext(CartContext);

  const itemPrice = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amt) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amt,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{itemPrice}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
