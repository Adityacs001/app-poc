import React from "react";
import { Transition } from "@headlessui/react";
import classnames from "classnames";
import { motion } from "framer-motion";
import Footer from "@components/Footer";
import Link from "next/link";
import ActiveLink from "@components/ActiveLink";
import useLocales from "../../hooks/useLocales";
import useStore, { languageSelector } from "../../store/index";

import { useRouter } from "next/router";

const DefaultLayout = ({ children, user }) => {
  const containervariants = {
    start: {
      opacity: 0,
      x: "100vw",
    },
    end: {
      opacity: 1,
      x: 0,
      transition: {
        type: "Tween",
        delay: 0.4,
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const svgpathvariants = {
    start: {
      opacity: 0,
      pathLength: 0,
    },
    end: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 3,
        ease: "easeInOut",
      },
    },
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const { translations } = useLocales();
  const memoizedlocalestate = useStore(React.useCallback(languageSelector, []));

  const [isTopUserInfoOpen, setIsTopUserInfoOpen] = React.useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = React.useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      return router.push("/logout");
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <div className={classnames("lg:hidden")}>
        <div
          className={classnames("fixed inset-0 flex z-40", {
            hidden: !isOpen,
          })}
        >
          <Transition
            show={isOpen}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed inset-0"
          >
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </Transition>
          <Transition
            show={isOpen}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="relative flex-1 flex flex-col max-w-xs w-full  bg-white"
          >
            <div className="absolute top-0 right-0 -mr-14 p-1">
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                aria-label="Close sidebar"
              >
                <svg
                  className="h-6 w-6 text-white"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center px-4">
              <img className="h-24 w-auto" src="/logo.png" alt="HRA" />
            </div>
            <div className="flex-1 h-0 overflow-y-auto">
              <div className="h-full flex-1 flex flex-col justify-between">
                <nav className="px-3 mt-6">
                  <div className="space-y-1">
                    <ActiveLink href="/">
                      <svg
                        className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <motion.path
                          variants={svgpathvariants}
                          initial="start"
                          animate="end"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      {translations.t("home")}
                    </ActiveLink>
                    <ActiveLink href="/vacancies">
                      <svg
                        className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                      </svg>
                      {translations.t("vacancies")}
                    </ActiveLink>
                    <ActiveLink href="/jobseekers">
                      <svg
                        className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        ></path>
                      </svg>
                      {translations.t("jobseekers")}
                    </ActiveLink>
                    <ActiveLink href="/applicants">
                      <svg
                        className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                      </svg>
                      {translations.t("applications")}
                    </ActiveLink>
                    <ActiveLink href="/expats">
                      <svg
                        className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        ></path>
                      </svg>
                      {translations.t("expats")}
                    </ActiveLink>
                    <ActiveLink href="/users">
                      <svg
                        className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>

                      {translations.t("orgnizationchart")}
                    </ActiveLink>
                    <ActiveLink href="/workforce" className="hidden">
                      <svg
                        className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm-2 4a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                      {translations.t("workforceplanning")}
                    </ActiveLink>
                  </div>
                  <div className="mt-8">
                    <h3
                      className="px-3 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                      id="teams-headline"
                    >
                      {translations.t("quicklinks")}
                    </h3>
                    <div
                      className="mt-1 space-y-1"
                      role="group"
                      aria-labelledby="teams-headline"
                    >
                      <Link href="/vacancytemplate">
                        <a className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150">
                          <span className="w-2.5 h-2.5 mx-2 bg-yellow-500 rounded-full"></span>
                          <span className="truncate">
                            {translations.t("createvacancytemplate")}
                          </span>
                        </a>
                      </Link>
                      <Link
                        href={`/vacancies/${process.env.NEXT_PUBLIC_RID_NEW}`}
                      >
                        <a className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150">
                          <span className="w-2.5 h-2.5 mx-2 bg-indigo-500 rounded-full"></span>
                          <span className="truncate">
                            {translations.t("postavacancy")}
                          </span>
                        </a>
                      </Link>
                      <Link
                        href={`/jobopportunity/${process.env.NEXT_PUBLIC_RID_NEW}`}
                      >
                        <a className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150">
                          <span className="w-2.5 h-2.5 mx-2 bg-green-500 rounded-full"></span>
                          <span className="truncate">
                            {" "}
                            {translations.t("postscholarship")}
                          </span>
                        </a>
                      </Link>
                      <Link href={`/expats/${process.env.NEXT_PUBLIC_RID_NEW}`}>
                        <span className="w-2.5 h-2.5 mx-2 bg-purple-500 rounded-full"></span>
                        <span className="truncate">
                          {" "}
                          {translations.t("addexpat")}{" "}
                        </span>
                      </Link>
                      <Link href={`/expats/${process.env.NEXT_PUBLIC_RID_NEW}`}>
                        <span className="w-2.5 h-2.5 mx-2 bg-pink-700 rounded-full"></span>
                        <span className="truncate">
                          {" "}
                          {translations.t("usermanual")}
                        </span>
                      </Link>
                    </div>
                  </div>
                </nav>
                <div className="px-3 py-2 border-t border-gray-200">
                  <button
                    onClick={(e) => handleLogout(e)}
                    className="group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                  >
                    <svg
                      className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                    {translations.t("logout")}
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200  bg-gray-100">
          <div className="flex items-center flex-shrink-0 px-6">
            <img className="h-auto w-auto" src="/logo.png" alt="Workflow" />
          </div>
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            <div className="px-3  relative inline-block">
              <div>
                <button
                  onClick={(e) => setIsUserInfoOpen(!isUserInfoOpen)}
                  type="button"
                  className="group w-full rounded-md px-3.5 py-2 text-sm leading-5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-500 focus:outline-none focus:bg-gray-200 focus:border-blue-300 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  <div className="flex w-full justify-between items-center">
                    <div className="flex items-center justify-between space-x-3">
                      <motion.img
                        whileHover={{
                          scale: 1.1,
                          transition: {
                            yoyo: Infinity,
                          },
                        }}
                        className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                        src="/aditya.png"
                        alt=""
                      />
                      <div className="flex-1 flex flex-col items-start px-1">
                        <h2
                          className={classnames(
                            "text-gray-900  leading-5 truncate font-medium ",
                            {
                              "text-sm ": memoizedlocalestate === "en",
                            },
                            {
                              "text-base ": memoizedlocalestate === "ae",
                            },
                          )}
                        >
                          {user?.displayname || "Aditya Kumar"}
                        </h2>
                        <p
                          className={classnames(
                            "text-gray-900  leading-5 truncate font-medium  ",
                            {
                              "text-sm ": memoizedlocalestate === "en",
                            },
                            {
                              "text-base ": memoizedlocalestate === "ae",
                            },
                          )}
                        >
                          {user?.employershortname || "@hra"}
                        </p>
                      </div>
                    </div>

                    <svg
                      className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              <Transition
                show={isUserInfoOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                className={classnames(
                  "z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg",
                )}
              >
                <div
                  className="rounded-md bg-white shadow-xs"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1">
                    <Link href="/changepassword">
                      <a
                        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        role="menuitem"
                      >
                        {translations.t("changepassword")}
                      </a>
                    </Link>
                    <Link href="#">
                      <a
                        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        role="menuitem"
                      >
                        {translations.t("settings")}
                      </a>
                    </Link>
                    <Link href="#">
                      <a
                        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        role="menuitem"
                      >
                        {translations.t("notifications")}
                      </a>
                    </Link>
                  </div>
                  <div className="border-t border-gray-100"></div>
                  <div className="py-1">
                    <Link href="#">
                      <a
                        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        role="menuitem"
                      >
                        {translations.t("usermanual")}
                      </a>
                    </Link>
                    <Link href="#">
                      <a
                        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        role="menuitem"
                      >
                        {translations.t("support")}
                      </a>
                    </Link>
                  </div>
                  <div className="border-t border-gray-100"></div>
                  <div className="py-1">
                    <button
                      onClick={(e) => handleLogout(e)}
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                    >
                      {translations.t("logout")}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
            <div className="px-3 mt-5">
              <label htmlFor="search" className="sr-only">
                {translations.t("home")}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <svg
                    className="mr-3 h-4 w-4 text-gray-400"
                    x-description="Heroicon name: search"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                  placeholder={translations.t("search")}
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <nav className="px-3 mt-6">
                <div className="space-y-1">
                  <ActiveLink href="/">
                    <svg
                      className="mx-2 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <motion.path
                        variants={svgpathvariants}
                        initial="start"
                        animate="end"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    {translations.t("home")}
                  </ActiveLink>
                  <ActiveLink href="/vacancies">
                    <svg
                      className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>

                    {translations.t("vacancies")}
                  </ActiveLink>
                  <ActiveLink href="/jobseekers">
                    <svg
                      className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                      ></path>
                    </svg>

                    {translations.t("jobseekers")}
                  </ActiveLink>
                  <ActiveLink href="/applicants">
                    <svg
                      className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                    {translations.t("applications")}
                  </ActiveLink>
                  <ActiveLink href="/expats">
                    <svg
                      className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      ></path>
                    </svg>
                    {translations.t("expats")}
                  </ActiveLink>
                  <ActiveLink href="/users">
                    <svg
                      className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {translations.t("orgnizationchart")}
                  </ActiveLink>
                  <ActiveLink href="/workforce" className="hidden">
                    <svg
                      className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm-2 4a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                      />
                    </svg>

                    {translations.t("workforceplanning")}
                  </ActiveLink>
                </div>
                <div className="mt-8">
                  <h3
                    className="px-3 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                    id="teams-headline"
                  >
                    {translations.t("quicklinks")}
                  </h3>
                  <div
                    className="mt-1 space-y-1"
                    role="group"
                    aria-labelledby="teams-headline"
                  >
                    <ActiveLink href="/vacancytemplate">
                      <span className="w-2.5 h-2.5 mx-2 bg-green-500 rounded-full"></span>
                      <span className="truncate">
                        {translations.t("createvacancytemplate")}
                      </span>
                    </ActiveLink>
                    <ActiveLink
                      href={`/vacancies/${process.env.NEXT_PUBLIC_RID_NEW}`}
                    >
                      <span className="w-2.5 h-2.5 mx-2 bg-blue-500 rounded-full"></span>
                      <span className="truncate">
                        {" "}
                        {translations.t("postavacancy")}
                      </span>
                    </ActiveLink>
                    <ActiveLink
                      href={`/jobopportunity/${process.env.NEXT_PUBLIC_RID_NEW}`}
                    >
                      <span className="w-2.5 h-2.5 mx-2 bg-green-500 rounded-full"></span>
                      <span className="truncate">
                        {translations.t("postscholarship")}
                      </span>
                    </ActiveLink>
                    <ActiveLink
                      href={`/expats/${process.env.NEXT_PUBLIC_RID_NEW}`}
                    >
                      <span className="w-2.5 h-2.5 mx-2 bg-purple-500 rounded-full"></span>
                      <span className="truncate">
                        {translations.t("addexpat")}
                      </span>
                    </ActiveLink>
                    <ActiveLink href="/manuals">
                      <span className="w-2.5 h-2.5 mx-2 bg-pink-700 rounded-full"></span>
                      <span className="truncate">
                        {translations.t("usermanual")}
                      </span>
                    </ActiveLink>
                  </div>
                </div>
              </nav>
              <div className="px-3 py-2 border-t border-gray-200">
                <button
                  onClick={(e) => handleLogout(e)}
                  className="group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                >
                  <svg
                    className="mx-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  {translations.t("logout")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
          <button
            onClick={(e) => setIsOpen(true)}
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden"
            aria-label="Open sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="quicksearch" className="sr-only">
                  {translations.t("search")}
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="quicksearch"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                    placeholder={translations.t("search")}
                    type="text"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={() => setIsTopUserInfoOpen(!isTopUserInfoOpen)}
                    className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="/aditya.png"
                      alt=""
                    />
                  </button>
                </div>

                <Transition
                  show={isTopUserInfoOpen}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                    <div
                      className="rounded-md bg-white shadow-xs"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <div className="py-1">
                        <Link href="/changepassword">
                          <a
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                          >
                            {translations.t("changepassword")}
                          </a>
                        </Link>
                        <Link href="#">
                          <a
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                          >
                            {translations.t("settings")}
                          </a>
                        </Link>

                        <Link href="#">
                          <a
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                          >
                            {translations.t("notifications")}
                          </a>
                        </Link>
                      </div>
                      <div className="border-t border-gray-100"></div>
                      <div className="py-1">
                        <Link href="#">
                          <a
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                          >
                            {translations.t("usermanual")}
                          </a>
                        </Link>
                        <Link href="#">
                          <a
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                          >
                            {translations.t("support")}
                          </a>
                        </Link>
                      </div>
                      <div className="border-t border-gray-100"></div>
                      <div className="py-1">
                        <button
                          onClick={(e) => handleLogout(e)}
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          role="menuitem"
                        >
                          {translations.t("logout")}
                        </button>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
        <main
          className="z-10 flex-1 relative overflow-y-auto focus:outline-none flex flex-col justify-between"
          tabIndex={0}
        >
          <motion.div
            variants={containervariants}
            initial="start"
            animate="end"
            className="min-h-screen"
          >
            {children}
          </motion.div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export const getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default DefaultLayout;
