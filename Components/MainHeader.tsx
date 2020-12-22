import React from "react";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import useStore, { languageSelector } from "../store/index";
const MainHeader = ({ title, subtitle, isbordered }) => {
  const router = useRouter();
  const memoizedlocalestate = useStore(React.useCallback(languageSelector, []));

  return (
    <React.Fragment>
      <div
        className={classnames(" flex justify-between py-1 px-2", {
          "border-b border-gray-200": isbordered,
        })}
      >
        <div className="flex flex-col">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            {title}
          </h1>
          <h3 className="text-gray-500 text-sm leading-5  font-medium  tracking-wide ">
            {subtitle}
          </h3>
        </div>
        <ul className="flex">
          <li>
            <Link
              href={{ pathname: router.pathname, query: { ...router.query } }}
              locale={memoizedlocalestate === "en" ? "ae" : "en"}
            >
              <a
                className={classnames(
                  "uppercase bg-gray-100 rounded-full font-semibold  text-gray-600 hover:bg-indigo-600 hover:text-white",
                  {
                    "p-2.5  text-sm ": memoizedlocalestate === "en",
                  },
                  {
                    "px-2 py-1 text-base ": memoizedlocalestate === "ae",
                  },
                )}
              >
                {memoizedlocalestate === "en" ? "ae" : "en"}
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default MainHeader;
