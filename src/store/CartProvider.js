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
    const updatedTotalAmt =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    // return updated values
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmt,
    };
  }

  // check if item type is for removal
  if (action.type === "REMOVE_CART_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmt = state.totalAmount - existingCartItem.price;
    let updatedItems;

    // check if item to be removed is last item
    if (existingCartItem.amount === 1) {
      // whole item to be removed
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      // keep item in cart if item is more than one, but reduce amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // return new state object
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmt,
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
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
