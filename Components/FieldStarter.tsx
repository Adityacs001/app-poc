import React from "react";
import classnames from "classnames";

const FieldStarter = ({ locale }) => (
  <span
    className={classnames(
      "inline-flex items-center px-3  border  border-gray-300 bg-gray-50 text-gray-500 sm:text-sm",
      {
        "rounded-l-md border-r-0": locale === "en",
      },
      {
        "rounded-r-md border-l-0": locale === "ae",
      },
    )}
  ></span>
);

export default FieldStarter;
