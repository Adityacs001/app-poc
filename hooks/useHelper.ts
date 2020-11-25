const useSelectStyles = {
  control: (styles) => ({ ...styles, borderRadius: "0", zIndex: 0 }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      zIndex: 1,
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    zIndex: 2,
  }),
};

export { useSelectStyles };
