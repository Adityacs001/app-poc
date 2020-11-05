import React from "react";

export default function FormInput({ register, name, ...rest }) {
  return <input id={name} name={name} ref={register} {...rest} />;
}
