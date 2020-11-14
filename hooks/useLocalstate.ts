import React from "react";

export type LocalStogrageType = {
  key: string;
  seed: object;
};

export default function useLocalstate<c extends LocalStogrageType>(param: c) {
  const [value, setValue] = React.useState(() => {
    if (typeof window != "undefined") {
      const saved = window.localStorage.getItem(param.key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    }
    return param.seed;
  });

  React.useEffect(() => {
    window.localStorage.setItem(param.key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
