import React from "react";
import classnames from "classnames";
import { useRouter } from "next/router";
import useLocales from "../hooks/useLocales";

const PageTitle = ({ title, subtitle, isbordered }) => {
  const router = useRouter();
  const { translations } = useLocales();

  return (
    <React.Fragment>
      <div
        className={classnames(" flex justify-between py-1 px-2", {
          "border-b border-gray-200": isbordered,
        })}
      >
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            {title}
          </h1>
          <h3 className="text-gray-500 text-sm leading-5  font-medium  tracking-wide ">
            {subtitle}
          </h3>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageTitle;
