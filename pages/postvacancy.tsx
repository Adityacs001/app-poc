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

const VacancyManager = () => {
  const router = useRouter();

  return (
    <React.Fragment>
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader title="Create/Edit" subtitle="" isbordered={false} />
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

          <div className="px-6">
            <span className="shadow-sm rounded-md">
              <button
                onClick={(e) => router.push("/vacancytemplate")}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Create Template
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="px-6 py-3  sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
          <PageTitle
            title="Fill in all mandatory fileds"
            subtitle="10 matching candidates will be automatically added on creating or editing vacancy"
            isbordered={false}
          />
        </div>
      </div>
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Postion Profile
                    </label>
                    <select
                      id="country"
                      className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    >
                      <option>Developer</option>
                      <option>Designed</option>
                      <option>CEO</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3 ">
                    <label
                      htmlFor="entityname_en"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Target Date
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                      <input
                        id="entityname_en"
                        className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        placeholder="YYYY-MM-DD"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3 ">
                    <label
                      htmlFor="entityname_en"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Openings
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                      <input
                        id="entityname_en"
                        className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      City
                    </label>
                    <select
                      id="country"
                      className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    >
                      <option>Abu Dhabi</option>
                      <option>Al Ain</option>
                      <option>Dubai</option>
                      <option>Sharjah</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="about"
                    className="block text-sm leading-5 font-medium text-gray-700"
                  >
                    Additional Details(Rich Text)
                  </label>
                  <div className="rounded-md shadow-sm">
                    <textarea
                      id="about"
                      rows="5"
                      className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      placeholder="you@example.com"
                    ></textarea>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    onClick={(e) => router.push("/vacancies")}
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Save
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

VacancyManager.getLayout = getLayout;

export const getServerSideProps = withSession;

export default VacancyManager;
