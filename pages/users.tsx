/** @jsxRuntime classic */
/** @jsx jsx */

import * as React from "react";
import Head from "next/head";
import classNames from "classnames";
import { Avatar, jsx, sx, Box, Flex, Donut } from "theme-ui";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import { Transition } from "@headlessui/react";
import MainHeader from "@components/MainHeader";
import SubHeader from "@components/SubHeader";
import { useRouter } from "next/router";
import withSession from "lib/session";
import PageTitle from "@components/PageTitle";
import NotificationNav from "@components/NotificationNav";

const UserList = () => {
  const router = useRouter();
  const [selectedrow, setSelectedrow] = React.useState(0);
  const [showdetail, setShowdetail] = React.useState(false);
  return (
    <React.Fragment>
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader title="Users" subtitle="" isbordered={false} />
        </div>
        <div className="flex justify-between">
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <NotificationNav />
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="px-6 py-3  sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0 border-b border-gray-200">
          <PageTitle
            title="List of all employees in Entity"
            subtitle="All employees  currently in  orgnization"
            isbordered={false}
          />
        </div>

        <div className="bg-white">
          <div className="mx-auto py-6 px-4 text-center ">
            <ul className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4  lg:gap-y-8 xl:grid-cols-6">
              {Array.from({ length: 20 }, (value, key) => (
                <li key={key}>
                  <div className="space-y-4">
                    <img
                      className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24"
                      src="/images/aditya.png"
                      alt=""
                    />
                    <div className="space-y-2">
                      <div className="text-xs leading-4 font-medium lg:text-sm lg:leading-5">
                        <h4 className="text-gray-900">Aditya Kumar</h4>
                        <p className="text-gray-500">Co-Founder / CTO</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-green-800">
                          <svg
                            className="mr-1.5 h-2 w-2 text-green-400"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
                                    Add to Vacancy
                                  </button>
                                </span>
                                <span className="mt-3 flex-1 w-full inline-flex rounded-md shadow-sm sm:mt-0 sm:ml-3">
                                  <button
                                    type="button"
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                                  >
                                    Add to favouriate
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
                                            Request Documents
                                          </a>
                                          <a
                                            href="#"
                                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                            role="menuitem"
                                          >
                                            Download CV
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

UserList.getLayout = getLayout;

export const getServerSideProps = withSession;

export default UserList;
