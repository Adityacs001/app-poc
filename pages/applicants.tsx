import * as React from "react";
import Head from "next/head";
import classnames from "classnames";
import { jsx } from "theme-ui";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import { Transition } from "@tailwindui/react";
import MainHeader from "@components/MainHeader";
import { useRouter } from "next/router";

const OfferManager = () => {
  const router = useRouter();
  const [selectedtab, setSelectedtab] = React.useState(1);
  const [selectedrow, setSelectedrow] = React.useState(0);
  const [showdetail, setShowdetail] = React.useState(false);
  return (
    <React.Fragment>
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader title="Applications" subtitle="" isbordered={false} />
        </div>
        <div className="flex justify-between">
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <span className="inline-block relative order-1 ml-3 rounded-full sm:order-0 sm:ml-0 bg-gray-50">
              <motion.button
                whileHover={{
                  scale: 1.4,
                  transition: {
                    yoyo: Infinity,
                  },
                }}
                className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
                aria-label="Notifications"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </motion.button>
              <span
                className="absolute right-0 h-2 w-2  text-white "
                sx={{ top: "-10px", maxwidth: "0.5rem" }}
              >
                <span
                  sx={{ padding: "2px" }}
                  className="text-xs  bg-green-500 rounded-full truncate"
                >
                  100
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="px-6 py-3  sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
          <div className="flex flex-col md:flex-row items-center ">
            <h1 className="text-md font-medium leading-6 text-gray-900 sm:truncate px-2">
              List of all jobseeker in
            </h1>
            <select
              id="country"
              className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded text-gray-500 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
            >
              <option>--All Vacancies--</option>
              <option>Electric enginnering (HC/JC/63783/12)</option>
              <option>Mechnical enginnering (HC/JC/63783/20)</option>
            </select>
          </div>

          <div>
            <label htmlFor="search_candidate" className="sr-only">
              Search
            </label>
            <div className="flex rounded-md shadow-sm">
              <div className="relative flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search_candidate"
                  className="form-input block w-full rounded-none rounded-l-md pl-10 transition ease-in-out duration-150 sm:hidden"
                  placeholder="Search"
                />
                <input
                  id="search_candidate"
                  className="hidden form-input w-full rounded-none rounded-l-md pl-10 transition ease-in-out duration-150 sm:block sm:text-sm sm:leading-5"
                  placeholder="Search jobseekers"
                />
              </div>
              <button className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                </svg>
                <span className="ml-2">Option</span>

                <svg
                  className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="min-w-full px-4 bg-white pt-3">
          <div className="sm:hidden">
            <select
              aria-label="Selected tab"
              className="form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
            >
              <option selected>Nomination</option>

              <option>Interview</option>

              <option>Interview</option>

              <option>Offer</option>

              <option>Hired</option>
            </select>
          </div>

          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              <a
                onClick={(e) => setSelectedtab(1)}
                className={classnames(
                  "whitespace-no-wrap pb-1 px-1 border-b-2  font-medium text-base leading-5",
                  {
                    "border-b-2  border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700":
                      selectedtab === 1,
                  },
                  {
                    "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300":
                      selectedtab != 1,
                  },
                )}
              >
                Nomination
              </a>

              <a
                onClick={(e) => setSelectedtab(2)}
                className={classnames(
                  "whitespace-no-wrap pb-1 px-1  font-medium text-base leading-5",
                  {
                    "border-b-2 border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700":
                      selectedtab === 2,
                  },
                  {
                    "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300":
                      selectedtab != 2,
                  },
                )}
                aria-current="page"
              >
                Interview
              </a>

              <a
                onClick={(e) => setSelectedtab(3)}
                className={classnames(
                  "whitespace-no-wrap pb-1 px-1  font-medium text-base leading-5",
                  {
                    "border-b-2 border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700":
                      selectedtab === 3,
                  },
                  {
                    "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300":
                      selectedtab != 3,
                  },
                )}
              >
                Offer
              </a>

              <a
                onClick={(e) => setSelectedtab(4)}
                className={classnames(
                  "whitespace-no-wrap pb-1 px-1  font-medium text-base leading-5",
                  {
                    "border-b-2 border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700":
                      selectedtab === 4,
                  },
                  {
                    "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300":
                      selectedtab != 4,
                  },
                )}
              >
                Hired
              </a>
              <a
                onClick={(e) => setSelectedtab(5)}
                className={classnames(
                  "whitespace-no-wrap pb-1 px-1  font-medium text-base leading-5",
                  {
                    "border-b-2 border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700":
                      selectedtab === 5,
                  },
                  {
                    "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300":
                      selectedtab != 5,
                  },
                )}
              >
                Rejected
              </a>
            </nav>
          </div>
        </div>

        <div className="align-middle inline-block min-w-full mt-1">
          <ul className="bg-white">
            {Array.from({ length: 20 }, (value, key) => (
              <li key={key}>
                <a
                  href="#"
                  className="block bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out  border-b border-gray-200"
                >
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src="./images/aditya.png"
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                            Aditya Kumar Singh
                          </div>
                          <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="truncate">
                              aditya.singh@hra.gov.ae
                            </span>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <div className="text-sm leading-5 text-gray-900">
                              Applied on
                              <span className="px-2">2020-10-01</span>
                            </div>
                            <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                              <svg
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              {selectedtab === 1
                                ? "Nomination"
                                : selectedtab === 2
                                ? "Interview"
                                : selectedtab === 3
                                ? "Offer"
                                : selectedtab === 4
                                ? "Hired"
                                : selectedtab === 5
                                ? "Rejected"
                                : "NA"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button onClick={(e) => setShowdetail(true)}>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showdetail && (
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <Transition
              show={showdetail}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            >
              <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
                <Transition
                  show={showdetail}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                  className="w-screen max-w-2xl"
                >
                  <div className="w-screen max-w-2xl">
                    <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                      <header className="px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <h2 className="text-lg leading-7 font-medium text-gray-900">
                            Profile
                          </h2>
                          <div className="h-7 flex items-center">
                            <button
                              onClick={(e) => setShowdetail(false)}
                              aria-label="Close panel"
                              className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                            >
                              <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </header>

                      <div className="divide-y divide-gray-200">
                        <div className="pb-6">
                          <div className="bg-indigo-700 h-24 sm:h-20 lg:h-28"></div>
                          <div className="-mt-12 flow-root px-4 space-y-6 sm:-mt-8 sm:flex sm:items-end sm:px-6 sm:space-x-6 lg:-mt-15">
                            <div>
                              <div className="-m-1 flex">
                                <div className="inline-flex rounded-lg overflow-hidden border-4 border-white">
                                  <img
                                    className="flex-shrink-0 h-24 w-24 sm:h-40 sm:w-40 lg:w-48 lg:h-48"
                                    src="/images/aditya.png"
                                    alt="Jobseeker Photo"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-5 sm:flex-1">
                              <div>
                                <div className="flex items-center space-x-2.5">
                                  <h3 className="font-bold text-xl leading-7 text-gray-900 sm:text-2xl sm:leading-8">
                                    Aditya Kumar Singh
                                  </h3>
                                  <span
                                    aria-label="Online"
                                    className="bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full"
                                  ></span>
                                </div>
                                <p className="text-sm leading-5 text-gray-500">
                                  aditya.singh@hra.gov.ae
                                </p>
                              </div>
                              <div className="flex flex-wrap">
                                <span className="flex-shrink-0 w-full inline-flex rounded-md shadow-sm sm:flex-1">
                                  <button
                                    type="button"
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                                  >
                                    Schedule Interview
                                  </button>
                                </span>
                                <span className="mt-3 flex-1 w-full inline-flex rounded-md shadow-sm sm:mt-0 sm:ml-3">
                                  <button
                                    type="button"
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                                  >
                                    Reject
                                  </button>
                                </span>
                                <span className="mt-3 ml-3 inline-flex rounded-md shadow-sm sm:mt-0">
                                  <div className="relative inline-block text-left">
                                    <button
                                      type="button"
                                      className="inline-flex items-center p-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-400 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                                    >
                                      <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                      </svg>
                                    </button>

                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                      <div className="rounded-md bg-white shadow-xs">
                                        <div
                                          className="py-1"
                                          role="menu"
                                          aria-orientation="vertical"
                                          aria-labelledby="options-menu"
                                        >
                                          <a
                                            href="#"
                                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                            role="menuitem"
                                          >
                                            Unexperience
                                          </a>
                                          <a
                                            href="#"
                                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                            role="menuitem"
                                          >
                                            Lack technical skill
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-5 sm:px-0 sm:py-0">
                          <dl className="space-y-8 sm:space-y-0">
                            <div className="bg-gray-50  sm:flex sm:space-x-6 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Bio
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                <p>
                                  Lorem ipsum dolor sit amet consectetur,
                                  adipisicing elit. Distinctio ipsam hic beatae
                                  veniam neque quae harum, consequatur
                                  aspernatur odit. Quae culpa temporibus odit
                                  tempora odio eos cumque non voluptates
                                  dolores.
                                </p>
                              </dd>
                            </div>
                            <div className="sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Location
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                Al Ain, Abu Dhabi
                              </dd>
                            </div>
                            <div className="bg-gray-50  sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Education
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                Bachelor of Engineering in Computer Science
                              </dd>
                            </div>
                            <div className="sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Total Experience
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                2 yrs
                              </dd>
                            </div>
                            <div className="bg-gray-50 sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Skills
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                <div className="flex justify-between flex-wrap ">
                                  <span className="inline-flex items-center px-2 mx-2 mt-2  py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                                    <svg
                                      className="mr-1.5 h-2 w-2 text-indigo-400"
                                      fill="currentColor"
                                      viewBox="0 0 8 8"
                                    >
                                      <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    Designer
                                  </span>
                                  <span className="inline-flex items-center px-2 mx-2  mt-2  py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                                    <svg
                                      className="mr-1.5 h-2 w-2 text-indigo-400"
                                      fill="currentColor"
                                      viewBox="0 0 8 8"
                                    >
                                      <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    Driver
                                  </span>
                                  <span className="inline-flex items-center px-2 mx-2 mt-2  py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                                    <svg
                                      className="mr-1.5 h-2 w-2 text-indigo-400"
                                      fill="currentColor"
                                      viewBox="0 0 8 8"
                                    >
                                      <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    Cleaner
                                  </span>
                                  <span className="inline-flex items-center px-2 mx-2 mt-2  py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                                    <svg
                                      className="mr-1.5 h-2 w-2 text-indigo-400"
                                      fill="currentColor"
                                      viewBox="0 0 8 8"
                                    >
                                      <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    Kadak
                                  </span>
                                  <span className="inline-flex items-center px-2 mx-2 mt-2  py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                                    <svg
                                      className="mr-1.5 h-2 w-2 text-indigo-400"
                                      fill="currentColor"
                                      viewBox="0 0 8 8"
                                    >
                                      <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    Asp.Net
                                  </span>
                                </div>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </section>
            </Transition>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

OfferManager.getLayout = getLayout;

export default OfferManager;
