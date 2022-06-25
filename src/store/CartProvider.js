import React, { useReducer } from "react";

import CartContext from "./cart-context";

// Declare default cart state
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Declare cart reducer outside of component function
const cartReducer = (state, action) => {
  if (action.type === "ADD_CART_ITEM") {
    // create an array to store items
    // concat different from push, returns new array via state instead of changing old array
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmt =
      state.totalAmount + action.item.price * action.item.amount;
    // return updated values
    return {
      items: updatedItems,
      totalAmount: updatedItems,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // handler function for when item is added to cart
  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_CART_ITEM", item: item });
  };

  // handler function for when item is removed from cart
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", id: id });
  };

  // declare cart context
  const cartCtx = {
    items: [],
    totalAmount: 0,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
