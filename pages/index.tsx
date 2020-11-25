/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import Head from "next/head";
import classNames from "classnames";
import { Avatar, jsx, sx, Box, Flex, Donut } from "theme-ui";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import { Transition } from "@tailwindui/react";
import MainHeader from "@components/MainHeader";
import SubHeader from "@components/SubHeader";
import withSession from "lib/session";
import useStore, { languageSelector } from "../store/index";
import NotificationNav from "@components/NotificationNav";
import { useQuery } from "react-query";
import { fetchdetail } from "lib/fetcher";

import { useI18n } from "next-localization";
import { useRouter } from "next/router";
import useLocales from "../hooks/useLocales";

const Index = ({ user }) => {
  const router = useRouter();
  const { translations } = useLocales();

  const { isLoading, isError, data, error } = useQuery("users", fetchdetail);

  const [isOpen, setIsOpen] = React.useState(false);

  const locales = useStore(languageSelector);
  const sampleCounter = useStore((state) => state.sampleCounter);
  const memoizedCallback = useStore(React.useCallback(languageSelector, []));

  const cardvariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
        type: "spring",
        stiffness: 500,
      },
    },
    hover: {
      scale: 1.05,
      textShadow: "0px 0px 8px rgb(255,255,255)",
    },
  };
  return (
    <React.Fragment>
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader
            title={translations.t("Dashboard")}
            subtitle=""
            isbordered={false}
          />
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <NotificationNav />
          <button onClick={sampleCounter}>click</button>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6 lg:px-8 bg-gray-100 ">
        <div className="py-2">
          <MainHeader
            title="Overview"
            subtitle="Some additional details goes here which looks good"
            isbordered={false}
          ></MainHeader>
        </div>

        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="my-2 py-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
            whileHover={{
              scale: 1.05,
              textShadow: "0px 0px 8px rgb(255,255,255)",
            }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                      Total Postings
                    </dt>
                    <dd>
                      <div className="text-lg leading-7 font-medium text-gray-900">
                        2,000
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm leading-5">
                <a
                  href="#"
                  className="font-medium text-teal-600 hover:text-teal-900 transition ease-in-out duration-150"
                >
                  View all
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={cardvariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0  bg-indigo-500 rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                      Total Active openings
                    </dt>
                    <dd>
                      <div className="text-lg leading-7 font-medium text-gray-900">
                        500
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm leading-5">
                <a
                  href="#"
                  className="font-medium text-teal-600 hover:text-teal-900 transition ease-in-out duration-150"
                >
                  View all
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 500 }}
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgb(255,255,255)",
            }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0  bg-green-500 rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                      Total Hiring (U.A.E Nationals / Expats)
                    </dt>
                    <dd>
                      <div className="text-lg leading-7 font-medium text-gray-900">
                        100/20
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm leading-5">
                <a
                  href="#"
                  className="font-medium text-teal-600 hover:text-teal-900 transition ease-in-out duration-150"
                >
                  View all
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <Flex>
          <Box className="flex flex-col w-1/5 px-2 text-center ">
            <SubHeader
              title="Journey Statistics"
              subtitle=""
              isbordered={false}
            />

            <div className="py-2">
              <SubHeader
                title=""
                subtitle="Stage wise statistics"
                isbordered={false}
              />
              <ul>
                <li>
                  <div className="border-b border-gray-200 py-2 flex flex-col md:flex-row">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                      <svg
                        className="mr-1.5 h-2 w-2 text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      5,000
                    </span>
                    <span className="inline-flex px-2 text-sm text-gray-500">
                      Total Matching
                    </span>
                  </div>
                </li>
                <li>
                  <div className="border-b border-gray-200 py-2 flex flex-col md:flex-row">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                      <svg
                        className="mr-1.5 h-2 w-2 text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      3,000
                    </span>
                    <span className="inline-flex px-2 text-sm  text-gray-500">
                      Total Interviews
                    </span>
                  </div>
                </li>
                <li>
                  <div className="py-2 flex flex-col md:flex-row">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                      <svg
                        className="mr-1.5 h-2 w-2 text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      1,000
                    </span>
                    <span className="inline-flex px-2 text-sm  text-gray-500">
                      Total Placements
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="py-2">
              <SubHeader
                title=""
                subtitle="I will give more journey details"
                isbordered={false}
              />
              <ul>
                <li>
                  <div className="border-b border-gray-200 py-2 flex flex-col md:flex-row">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                      <svg
                        className="mr-1.5 h-2 w-2 text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      5,000
                    </span>
                    <span className="inline-flex px-2 text-sm text-gray-500">
                      Total Accepted
                    </span>
                  </div>
                </li>
                <li>
                  <div className="border-b border-gray-200 py-2 flex flex-col md:flex-row">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                      <svg
                        className="mr-1.5 h-2 w-2 text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      3,000
                    </span>
                    <span className="inline-flex px-2 text-sm  text-gray-500">
                      Total Rejected
                    </span>
                  </div>
                </li>
                <li>
                  <div className="py-2 flex flex-col md:flex-row">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                      <svg
                        className="mr-1.5 h-2 w-2 text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      1,000
                    </span>
                    <span className="inline-flex px-2 text-sm  text-gray-500">
                      Total Hired
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </Box>
          <Box className="flex flex-col  w-3/5 border-t border-b border-gray-100 px-2 text-center sm:border-0 sm:border-l sm:border-r">
            <SubHeader
              title="Some Graphical representation"
              subtitle="Additional details about below graph"
              isbordered={false}
            />
            <img
              className="object-fill"
              src="/images/demograph.png"
              alt="demo graph"
            />
          </Box>
          <Box className="flex flex-col w-1/5 px-2 text-center ">
            <SubHeader title="Vacancy Status" subtitle="" isbordered={false} />
            <Box>
              <SubHeader
                title=""
                subtitle="Openings vs Emirati"
                isbordered={false}
              />
              <div>
                <Donut value={1 / 2} />
              </div>
            </Box>
            <Box mt={2}>
              <SubHeader
                title=""
                subtitle="Openings Vs Expats"
                isbordered={false}
              />
              <div>
                <Donut value={1 / 2} />
              </div>
            </Box>
          </Box>
        </Flex>
      </div>
      <div className="px-4 py-6 sm:px-6 lg:px-8 bg-gray-100">
        <SubHeader
          title=" Suggested  Jobseekers"
          subtitle="some content about sub header"
          isbordered={false}
        />
        <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">
          <li className="relative col-span-1 flex shadow-sm rounded-md">
            <div className="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm leading-5 font-medium rounded-l-md border-t border-l border-b">
              <Avatar src="/aditya.png" />
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                <a
                  href="#"
                  className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
                >
                  Aditya Kumar singh
                </a>
                <p className="text-gray-800">Experience 2 Yrs</p>
                <p className="text-gray-500 tuncate">
                  Bachelor in Computer Science
                </p>
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
            <div className="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm leading-5 font-medium rounded-l-md border-t border-l border-b">
              <Avatar src="/aditya.png" />
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                <a
                  href="#"
                  className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
                >
                  Aditya Kumar singh
                </a>
                <p className="text-gray-800">Experience 2 Yrs</p>
                <p className="text-gray-500 tuncate">
                  Bachelor in Computer Science
                </p>
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
            <div className="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm leading-5 font-medium rounded-l-md border-t border-l border-b">
              <Avatar src="/aditya.png" />
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                <a
                  href="#"
                  className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
                >
                  Aditya Kumar singh
                </a>
                <p className="text-gray-800">Experience 2 Yrs</p>
                <p className="text-gray-500 tuncate">
                  Bachelor in Computer Science
                </p>
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
            <div className="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm leading-5 font-medium rounded-l-md border-t border-l border-b">
              <Avatar src="/aditya.png" />
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                <a
                  href="#"
                  className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
                >
                  Aditya Kumar singh
                </a>
                <p className="text-gray-800">Experience 2 Yrs</p>
                <p className="text-gray-500 tuncate">
                  Bachelor in Computer Science
                </p>
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

      <div className="hidden sm:block">
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  <span className="lg:pl-2">Recent Postings</span>
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
                    <a href="#" className="truncate hover:text-gray-600">
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
                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
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
                    <a href="#" className="truncate hover:text-gray-600">
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
                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
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
                    <a href="#" className="truncate hover:text-gray-600">
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
                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
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
                    <a href="#" className="truncate hover:text-gray-600">
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
                    <a href="#" className="truncate hover:text-gray-600">
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
                    <a href="#" className="truncate hover:text-gray-600">
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
                    <a href="#" className="truncate hover:text-gray-600">
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
                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
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
    </React.Fragment>
  );
};

Index.getLayout = getLayout;

export const getServerSideProps = withSession;

//export default withTranslation("common")(Index);
export default Index;
