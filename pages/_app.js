/** @jsx jsx */
import "../styles/tailwind.css";
import { useState } from "react";
import theme from "../styles/theme";
import { ThemeProvider, jsx, Styled, Button } from "theme-ui";
import { Transition } from "@tailwindui/react";
import classnames from "classnames";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

function MyApp({ Component, pageProps }) {
  const containervariants = {
    start: {
      opacity: 0,
      x: "100vw",
    },
    end: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        delay: 0.5,
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

  const [isOpen, setIsOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Styled.root>
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
                  <nav className="px-2">
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md text-gray-900 bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none transition ease-in-out duration-150"
                      >
                        <svg
                          className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        New
                      </a>

                      <a
                        href="#"
                        className="group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition ease-in-out duration-150"
                      >
                        <svg
                          className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
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
                        My tasks
                      </a>

                      <a
                        href="#"
                        className="group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition ease-in-out duration-150"
                      >
                        <svg
                          className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Recent
                      </a>
                    </div>
                    <div className="mt-8">
                      <h3
                        className="px-3 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                        id="teams-headline"
                      >
                        Teams
                      </h3>
                      <div
                        className="mt-1 space-y-1"
                        role="group"
                        aria-labelledby="teams-headline"
                      >
                        <a
                          href="#"
                          className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                        >
                          <span className="w-2.5 h-2.5 mr-4 bg-indigo-500 rounded-full"></span>
                          <span className="truncate"> Engineering </span>
                        </a>

                        <a
                          href="#"
                          className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                        >
                          <span className="w-2.5 h-2.5 mr-4 bg-teal-400 rounded-full"></span>
                          <span className="truncate"> Human Resources </span>
                        </a>

                        <a
                          href="#"
                          className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                        >
                          <span className="w-2.5 h-2.5 mr-4 bg-orange-500 rounded-full"></span>
                          <span className="truncate"> Customer Success </span>
                        </a>
                      </div>
                    </div>
                  </nav>
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
                <div className="px-3  relative inline-block text-left">
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
                          <div className="flex-1">
                            <h2 className="text-gray-900 text-sm leading-5 font-medium">
                              Aditya Kumarff
                            </h2>
                            <p className="text-gray-500 text-sm leading-5 truncate">
                              @adityakumar
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
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          role="menuitem"
                        >
                          View profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          role="menuitem"
                        >
                          Settings
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          role="menuitem"
                        >
                          Notifications
                        </a>
                      </div>
                      <div className="border-t border-gray-100"></div>
                      <div className="py-1">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          role="menuitem"
                        >
                          Get desktop app
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          role="menuitem"
                        >
                          Support
                        </a>
                      </div>
                      <div className="border-t border-gray-100"></div>
                      <div className="py-1">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          role="menuitem"
                        >
                          Logout
                        </a>
                      </div>
                    </div>
                  </Transition>
                </div>
                <div className="px-3 mt-5">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="mr-3 h-4 w-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="search"
                      className="form-input block w-full pl-9 sm:text-sm sm:leading-5"
                      placeholder="Search"
                    />
                  </div>
                </div>

                <nav className="px-3 mt-6">
                  <div className="space-y-1">
                    <a
                      href="#"
                      className="group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-900 bg-gray-200 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                    >
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
                      Dahsboard
                    </a>

                    <a
                      href="#"
                      className="group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                    >
                      <svg
                        className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
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
                      My tasks
                    </a>

                    <a
                      href="#"
                      className="group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                    >
                      <svg
                        className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Recent
                    </a>
                  </div>
                  <div className="mt-8">
                    <h3
                      className="px-3 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                      id="teams-headline"
                    >
                      Teams
                    </h3>
                    <div
                      className="mt-1 space-y-1"
                      role="group"
                      aria-labelledby="teams-headline"
                    >
                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <span className="w-2.5 h-2.5 mr-4 bg-indigo-500 rounded-full"></span>
                        <span className="truncate"> Engineering </span>
                      </a>

                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <span className="w-2.5 h-2.5 mr-4 bg-teal-400 rounded-full"></span>
                        <span className="truncate"> Human Resources </span>
                      </a>

                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <span className="w-2.5 h-2.5 mr-4 bg-orange-500 rounded-full"></span>
                        <span className="truncate"> Customer Success </span>
                      </a>
                    </div>
                  </div>
                </nav>
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
                    <label htmlFor="search_field" className="sr-only">
                      Search
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
                        id="search_field"
                        className="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </form>
                </div>
                <div className="flex items-center">
                  <div className="ml-3 relative">
                    <div>
                      <button
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
                      show={isOpen}
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
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              View profile
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              Settings
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              Notifications
                            </a>
                          </div>
                          <div className="border-t border-gray-100"></div>
                          <div className="py-1">
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              Get desktop app
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              Support
                            </a>
                          </div>
                          <div className="border-t border-gray-100"></div>
                          <div className="py-1">
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              Logout
                            </a>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
            </div>
            <main
              className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
              tabIndex="0"
            >
              <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                    Home
                  </h1>
                </div>
                <div className="mt-4 flex sm:mt-0 sm:ml-4">
                  <span className="order-1 ml-3 shadow-sm rounded-md sm:order-0 sm:ml-0">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      Share
                    </button>
                  </span>
                  <span className="order-0 sm:order-1 sm:ml-3 shadow-sm rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple focus:border-purple-700 active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Create
                    </button>
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 pt-12 sm:pt-16 hidden">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                      Trusted by developers from over 80 planets
                    </h2>
                    <p className="mt-3 text-xl leading-7 text-gray-500 sm:mt-4">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Repellendus repellat laudantium.
                    </p>
                  </div>
                </div>
                <div className="mt-10 pb-12 bg-white sm:pb-16">
                  <div className="relative">
                    <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
                    <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="max-w-4xl mx-auto">
                        <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                          <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                            <dt
                              className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"
                              id="item-1"
                            >
                              Pepperoni
                            </dt>
                            <dd
                              className="order-1 text-5xl leading-none font-extrabold text-indigo-600"
                              aria-describedby="item-1"
                            >
                              100%
                            </dd>
                          </div>
                          <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                              Delivery
                            </dt>
                            <dd className="order-1 text-5xl leading-none font-extrabold text-indigo-600">
                              24/7
                            </dd>
                          </div>
                          <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                              Calories
                            </dt>
                            <dd className="order-1 text-5xl leading-none font-extrabold text-indigo-600">
                              100k
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cool-gray-500 hidden">
                <div className="max-w-screen-xl mx-auto  px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl leading-7 font-bold text-white sm:text-4xl sm:leading-10">
                      Trusted by developers from over 80 planets
                    </h2>
                    <p className="mt-3 text-xl leading-7 text-indigo-200 sm:mt-4">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Repellendus repellat laudantium.
                    </p>
                  </div>
                  <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
                    <div className="flex flex-col">
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                        Pepperoni
                      </dt>
                      <dd className="order-1 text-5xl leading-none font-extrabold text-white">
                        100%
                      </dd>
                    </div>
                    <div className="flex flex-col mt-10 sm:mt-0">
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                        Delivery
                      </dt>
                      <dd className="order-1 text-5xl leading-none font-extrabold text-white">
                        24/7
                      </dd>
                    </div>
                    <div className="flex flex-col mt-10 sm:mt-0">
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                        Calories
                      </dt>
                      <dd className="order-1 text-5xl leading-none font-extrabold text-white">
                        100k+
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                  Pinned Projects
                </h2>
                <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">
                  <li className="relative col-span-1 flex shadow-sm rounded-md">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm leading-5 font-medium rounded-l-md">
                      GA
                    </div>
                    <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                      <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                        <a
                          href="#"
                          className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
                        >
                          GraphQL API
                        </a>
                        <p className="text-gray-500">12 Members</p>
                      </div>
                      <div className="flex-shrink-0 pr-2">
                        <button
                          id="pinned-project-options-menu-0"
                          className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
                        >
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        <Transition
                          show={isOpen}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <div className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg">
                            <div
                              className="rounded-md bg-white shadow-xs"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="pinned-project-options-menu-0"
                            >
                              <div className="py-1">
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                  role="menuitem"
                                >
                                  View
                                </a>
                              </div>
                              <div className="border-t border-gray-100"></div>
                              <div className="py-1">
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                  role="menuitem"
                                >
                                  Removed from pinned
                                </a>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                  role="menuitem"
                                >
                                  Share
                                </a>
                              </div>
                            </div>
                          </div>
                        </Transition>
                      </div>
                    </div>
                  </li>
                  <li className="relative col-span-1 flex shadow-sm rounded-md">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm leading-5 font-medium rounded-l-md">
                      GA
                    </div>
                    <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                      <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                        <a
                          href="#"
                          className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
                        >
                          GraphQL API
                        </a>
                        <p className="text-gray-500">12 Members</p>
                      </div>
                      <div className="flex-shrink-0 pr-2">
                        <button
                          id="pinned-project-options-menu-0"
                          className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
                        >
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        <Transition
                          show={isOpen}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <div className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg">
                            <div
                              className="rounded-md bg-white shadow-xs"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="pinned-project-options-menu-0"
                            >
                              <div className="py-1">
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                  role="menuitem"
                                >
                                  View
                                </a>
                              </div>
                              <div className="border-t border-gray-100"></div>
                              <div className="py-1">
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                  role="menuitem"
                                >
                                  Removed from pinned
                                </a>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                  role="menuitem"
                                >
                                  Share
                                </a>
                              </div>
                            </div>
                          </div>
                        </Transition>
                      </div>
                    </div>
                  </li>

                  <li className="relative col-span-1 flex shadow-sm rounded-md">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm leading-5 font-medium rounded-l-md">
                      GA
                    </div>
                    <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                      <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                        <a
                          href="#"
                          className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
                        >
                          GraphQL API
                        </a>
                        <p className="text-gray-500">12 Members</p>
                      </div>
                      <div className="flex-shrink-0 pr-2">
                        <button
                          id="pinned-project-options-menu-0"
                          className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
                        >
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        <Transition
                          show={isOpen}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <div className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg">
                            <div
                              className="rounded-md bg-white shadow-xs"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="pinned-project-options-menu-0"
                            >
                              <div className="py-1">
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                  role="menuitem"
                                >
                                  View
                                </a>
                              </div>
                              <div className="border-t border-gray-100"></div>
                              <div className="py-1">
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                  role="menuitem"
                                >
                                  Removed from pinned
                                </a>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                  role="menuitem"
                                >
                                  Share
                                </a>
                              </div>
                            </div>
                          </div>
                        </Transition>
                      </div>
                    </div>
                  </li>
                  <li className="relative col-span-1 flex shadow-sm rounded-md">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm leading-5 font-medium rounded-l-md">
                      GA
                    </div>
                    <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                      <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                        <a
                          href="#"
                          className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
                        >
                          GraphQL API
                        </a>
                        <p className="text-gray-500">12 Members</p>
                      </div>
                      <div className="flex-shrink-0 pr-2">
                        <button
                          id="pinned-project-options-menu-0"
                          className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
                        >
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        <Transition
                          show={isOpen}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <div className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg">
                            <div
                              className="rounded-md bg-white shadow-xs"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="pinned-project-options-menu-0"
                            >
                              <div className="py-1">
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                  role="menuitem"
                                >
                                  View
                                </a>
                              </div>
                              <div className="border-t border-gray-100"></div>
                              <div className="py-1">
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                  role="menuitem"
                                >
                                  Removed from pinned
                                </a>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                  role="menuitem"
                                >
                                  Share
                                </a>
                              </div>
                            </div>
                          </div>
                        </Transition>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-10 sm:hidden">
                <div className="px-4 sm:px-6">
                  <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                    Projects
                  </h2>
                </div>
                <ul className="mt-3 border-t border-gray-200 divide-y divide-gray-100">
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
                    >
                      <div className="flex items-center truncate space-x-3">
                        <div className="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-pink-600"></div>
                        <p className="font-medium truncate text-sm leading-6">
                          GraphQL API
                          <span className="truncate font-normal text-gray-500">
                            in Engineering
                          </span>
                        </p>
                      </div>

                      <svg
                        className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              <motion.div
                variants={containervariants}
                initial="start"
                animate="end"
                className="px-4 mt-6  sm:px-6 lg:px-8 bg-gray-100"
              >
                <Component {...pageProps} />
              </motion.div>
              <div className="hidden sm:block">
                <div className="align-middle inline-block min-w-full border-b border-gray-200">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-t border-gray-200">
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <span className="lg:pl-2">Project</span>
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Members
                        </th>
                        <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Last updated
                        </th>
                        <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-3 max-w-0 w-full whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                          <div className="flex items-center space-x-3 lg:pl-2">
                            <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600"></div>
                            <a
                              href="#"
                              className="truncate hover:text-gray-600"
                            >
                              <span>
                                GraphQL API
                                <span className="text-gray-500 font-normal">
                                  in Engineering
                                </span>
                              </span>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                          <div className="flex items-center space-x-2">
                            <div className="flex flex-shrink-0 -space-x-1">
                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>

                            <span className="flex-shrink-0 text-xs leading-5 font-medium">
                              +8
                            </span>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
                          March 17, 2020
                        </td>
                        <td className="pr-6">
                          <div className="relative flex justify-end items-center">
                            <button
                              id="project-options-menu-0"
                              type="button"
                              className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
                            >
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>

                            <Transition
                              show={isOpen}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <div className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg">
                                <div
                                  className="z-10 rounded-md bg-white shadow-xs"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="project-options-menu-0"
                                >
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Edit
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                                      </svg>
                                      Duplicate
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                      </svg>
                                      Share
                                    </a>
                                  </div>
                                  <div className="border-t border-gray-100"></div>
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Transition>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 max-w-0 w-full whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                          <div className="flex items-center space-x-3 lg:pl-2">
                            <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600"></div>
                            <a
                              href="#"
                              className="truncate hover:text-gray-600"
                            >
                              <span>
                                GraphQL API
                                <span className="text-gray-500 font-normal">
                                  in Engineering
                                </span>
                              </span>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                          <div className="flex items-center space-x-2">
                            <div className="flex flex-shrink-0 -space-x-1">
                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>

                            <span className="flex-shrink-0 text-xs leading-5 font-medium">
                              +8
                            </span>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
                          March 17, 2020
                        </td>
                        <td className="pr-6">
                          <div className="relative flex justify-end items-center">
                            <button
                              id="project-options-menu-0"
                              type="button"
                              className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
                            >
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>

                            <Transition
                              show={isOpen}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <div className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg">
                                <div
                                  className="z-10 rounded-md bg-white shadow-xs"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="project-options-menu-0"
                                >
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Edit
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                                      </svg>
                                      Duplicate
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                      </svg>
                                      Share
                                    </a>
                                  </div>
                                  <div className="border-t border-gray-100"></div>
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Transition>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 max-w-0 w-full whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                          <div className="flex items-center space-x-3 lg:pl-2">
                            <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600"></div>
                            <a
                              href="#"
                              className="truncate hover:text-gray-600"
                            >
                              <span>
                                GraphQL API
                                <span className="text-gray-500 font-normal">
                                  in Engineering
                                </span>
                              </span>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                          <div className="flex items-center space-x-2">
                            <div className="flex flex-shrink-0 -space-x-1">
                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>

                            <span className="flex-shrink-0 text-xs leading-5 font-medium">
                              +8
                            </span>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
                          March 17, 2020
                        </td>
                        <td className="pr-6">
                          <div className="relative flex justify-end items-center">
                            <button
                              id="project-options-menu-0"
                              type="button"
                              className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
                            >
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>

                            <Transition
                              show={isOpen}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <div className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg">
                                <div
                                  className="z-10 rounded-md bg-white shadow-xs"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="project-options-menu-0"
                                >
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Edit
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                                      </svg>
                                      Duplicate
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                      </svg>
                                      Share
                                    </a>
                                  </div>
                                  <div className="border-t border-gray-100"></div>
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Transition>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 max-w-0 w-full whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                          <div className="flex items-center space-x-3 lg:pl-2">
                            <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600"></div>
                            <a
                              href="#"
                              className="truncate hover:text-gray-600"
                            >
                              <span>
                                GraphQL API
                                <span className="text-gray-500 font-normal">
                                  in Engineering
                                </span>
                              </span>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                          <div className="flex items-center space-x-2">
                            <div className="flex flex-shrink-0 -space-x-1">
                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>

                            <span className="flex-shrink-0 text-xs leading-5 font-medium">
                              +8
                            </span>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
                          March 17, 2020
                        </td>
                        <td className="pr-6">
                          <div className="relative flex justify-end items-center">
                            <button
                              id="project-options-menu-0"
                              type="button"
                              className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
                            >
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>

                            <Transition
                              show={isOpen}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <div className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg">
                                <div
                                  className="z-10 rounded-md bg-white shadow-xs"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="project-options-menu-0"
                                >
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Edit
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                                      </svg>
                                      Duplicate
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                      </svg>
                                      Share
                                    </a>
                                  </div>
                                  <div className="border-t border-gray-100"></div>
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Transition>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 max-w-0 w-full whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                          <div className="flex items-center space-x-3 lg:pl-2">
                            <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600"></div>
                            <a
                              href="#"
                              className="truncate hover:text-gray-600"
                            >
                              <span>
                                GraphQL API
                                <span className="text-gray-500 font-normal">
                                  in Engineering
                                </span>
                              </span>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                          <div className="flex items-center space-x-2">
                            <div className="flex flex-shrink-0 -space-x-1">
                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>

                            <span className="flex-shrink-0 text-xs leading-5 font-medium">
                              +8
                            </span>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
                          March 17, 2020
                        </td>
                        <td className="pr-6">
                          <div className="relative flex justify-end items-center">
                            <button
                              id="project-options-menu-0"
                              type="button"
                              className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
                            >
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>

                            <Transition
                              show={isOpen}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <div className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg">
                                <div
                                  className="z-10 rounded-md bg-white shadow-xs"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="project-options-menu-0"
                                >
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Edit
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                                      </svg>
                                      Duplicate
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                      </svg>
                                      Share
                                    </a>
                                  </div>
                                  <div className="border-t border-gray-100"></div>
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Transition>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 max-w-0 w-full whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                          <div className="flex items-center space-x-3 lg:pl-2">
                            <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600"></div>
                            <a
                              href="#"
                              className="truncate hover:text-gray-600"
                            >
                              <span>
                                GraphQL API
                                <span className="text-gray-500 font-normal">
                                  in Engineering
                                </span>
                              </span>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                          <div className="flex items-center space-x-2">
                            <div className="flex flex-shrink-0 -space-x-1">
                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>

                            <span className="flex-shrink-0 text-xs leading-5 font-medium">
                              +8
                            </span>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
                          March 17, 2020
                        </td>
                        <td className="pr-6">
                          <div className="relative flex justify-end items-center">
                            <button
                              id="project-options-menu-0"
                              type="button"
                              className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
                            >
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>

                            <Transition
                              show={isOpen}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <div className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg">
                                <div
                                  className="z-10 rounded-md bg-white shadow-xs"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="project-options-menu-0"
                                >
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Edit
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                                      </svg>
                                      Duplicate
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                      </svg>
                                      Share
                                    </a>
                                  </div>
                                  <div className="border-t border-gray-100"></div>
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Transition>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 max-w-0 w-full whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                          <div className="flex items-center space-x-3 lg:pl-2">
                            <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600"></div>
                            <a
                              href="#"
                              className="truncate hover:text-gray-600"
                            >
                              <span>
                                GraphQL API
                                <span className="text-gray-500 font-normal">
                                  in Engineering
                                </span>
                              </span>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                          <div className="flex items-center space-x-2">
                            <div className="flex flex-shrink-0 -space-x-1">
                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />

                              <img
                                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>

                            <span className="flex-shrink-0 text-xs leading-5 font-medium">
                              +8
                            </span>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
                          March 17, 2020
                        </td>
                        <td className="pr-6">
                          <div className="relative flex justify-end items-center">
                            <button
                              id="project-options-menu-0"
                              type="button"
                              className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
                            >
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>

                            <Transition
                              show={isOpen}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <div className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg">
                                <div
                                  className="z-10 rounded-md bg-white shadow-xs"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="project-options-menu-0"
                                >
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Edit
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                                      </svg>
                                      Duplicate
                                    </a>
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                      </svg>
                                      Share
                                    </a>
                                  </div>
                                  <div className="border-t border-gray-100"></div>
                                  <div className="py-1">
                                    <a
                                      href="#"
                                      className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Transition>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <Footer />
            </main>
          </div>
        </div>
      </Styled.root>
    </ThemeProvider>
  );
}

export default MyApp;
