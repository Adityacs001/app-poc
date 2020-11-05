import React from "react";

export default function FormSelect({ register, options, name, ...rest }) {
  return (
    <select id={name} name={name} ref={register} {...rest}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
