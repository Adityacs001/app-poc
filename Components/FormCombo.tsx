import React from "react";
import { FixedSizeList as List } from "react-window";
import Select, { components, OptionTypeBase, OptionProps } from "react-select";

const FormCombo = ({ options, children, maxHeight, getValue }) => {
  const height = 35;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <React.Fragment>
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    </React.Fragment>
  );
};

const OptimizedOption = ({ props }) => {
  delete props.innerProps.onMouseMove;
  delete props.innerProps.onMouseOver;

  return <components.Option {...props}>{props.children}</components.Option>;
};

export { OptimizedOption };
export default FormCombo;
