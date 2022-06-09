import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input
        {
          ...props.input
          // This ensures that all key value pairs of objects we recieve are added as props to input
          // example: type="text"
          // Makes component modifyable from outside
        }
      />
    </div>
  );
};

export default Input;
