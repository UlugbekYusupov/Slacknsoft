import React, { useRef, useImperativeHandle } from "react";
import classes from "./InsertPopup/InsertPop.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div className={classes.control}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        // contentEditable={true}
        label={props.label}
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      ></input>
    </div>
  );
});

export default Input;
