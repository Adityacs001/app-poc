import React from "react";
import { Controller, ControllerProps, useFormContext } from "react-hook-form";
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

type SelectExtendedProps = Omit<ControllerProps<"select">, "render"> & {
  render: (args: {
    onChange: (...event: any[]) => void;
    value: any;
    onBlur: () => void;
    name: string;
    id: string;
    inputId: string;
    instanceId: string;
  }) => React.ReactElement;
  id: string;
  inputId: string;
  instanceId: string;
};

export const WrapperSelectController = (props: SelectExtendedProps) => {
  //const { formState } = useFormContext();

  return (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue={props.defaultValue}
      render={(innerProps) => {
        return props.render({
          ...innerProps,
          id: props.id,
          inputId: props.inputId,
          instanceId: props.instanceId,
        });
      }}
    />
  );
};
