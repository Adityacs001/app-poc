import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import useStore, { languageSelector } from "../store/index";

const ActiveLink = ({ children, href, className = "" }) => {
  const router = useRouter();
  const memoizedlocalestate = useStore(React.useCallback(languageSelector, []));

  return (
    <Link href={href} scroll={true}>
      <a
        className={classnames(
          `${
            router.pathname === href
              ? "text-gray-900 bg-gray-200"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          } ${className} group flex items-center px-2 py-2  leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150`,
          { "text-sm": memoizedlocalestate === "en" },
          { "text-base": memoizedlocalestate === "ae" },
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default ActiveLink;
