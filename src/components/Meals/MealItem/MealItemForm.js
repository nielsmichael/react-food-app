import React, { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amtIsValid, setAmtIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmt = amountInputRef.current.value;
    // always .current for refs with useRef
    // value always a string so we need to convert to number
    const enteredAmtNum = +enteredAmt;

    // If amount is blank, less that one, or more than 5, return blank
    if (
      enteredAmt.trim().length === 0 ||
      enteredAmtNum < 1 ||
      enteredAmtNum > 5
    ) {
      // Set validity to false
      setAmtIsValid(false);
      // Return blank
      return;
    }

    props.onAddToCart(enteredAmtNum);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amtIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
