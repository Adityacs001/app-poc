import * as React from "react";
import HRALogo from "../public/images/logo.png";
import type { NextPage } from "next";
import Image from "next/image";
import { verifySchema } from "../schema/verifyschema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cogoToast from "cogo-toast";
import VerifyDTO from "../Model/verifyDTO";
import { useRouter } from "next/router";
import useLocales from "../hooks/useLocales";
import tw, { css } from "twin.macro";
import Link from "next/link";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import { fadeInUp, stagger, routeFade } from "../Animations/globalAnimations";

import { Disclosure, Listbox, Menu, Transition } from "@headlessui/react";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  OfficeBuildingIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  MailIcon,
  PencilIcon,
  SearchIcon,
  UsersIcon,
} from "@heroicons/react/solid";

const tabs = [
  { name: "Available", href: "#", count: "3", current: true },
  { name: "Applied", href: "#", count: "4", current: false },
];
const positions = [
  {
    id: 1,
    title: "Account Management",
    entity: "Human Resources Authority",
    type: "Full-time",
    location: "Abu Dhabi",
    department: "Accounts",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 2,
    title: "Business Administrator",
    entity: "Human Resources Authority",
    type: "Full-time",
    location: "Abu Dhabi",
    department: "Bussiness Management",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 3,
    title: "Networking",
    type: "Full-time",
    entity: "Department of Government Support",
    location: "Al Ain",
    department: "Engineering",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EOList: NextPage = () => {
  const router = useRouter();
  const { translations } = useLocales();

  return (
    <React.Fragment>
      <motion.div
        className="flex flex-col min-h-screen "
        variants={routeFade}
        initial="initial"
        animate="animate"
      >
        <div className="relative min-h-screen bg-white">
          <Header />
          {/* Page heading */}
          <header className="py-8 bg-gray-50">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Aditya Kumar
                </h1>
                <div className="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <BriefcaseIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    HRA/18938/21
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <LocationMarkerIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Abu Dhabi
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <AcademicCapIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Bachelor - Engineering - Computer Science
                  </div>
                </div>
              </div>
              <div className="flex mt-5 xl:mt-0 xl:ml-4">
                <span className="hidden sm:block">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                  >
                    <PencilIcon
                      className="w-5 h-5 mr-2 -ml-1 text-gray-400"
                      aria-hidden="true"
                    />
                    Edit CV on TAMM
                  </button>
                </span>
                <span className="hidden ml-3 sm:block">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                  >
                    <LinkIcon
                      className="w-5 h-5 mr-2 -ml-1 text-gray-400"
                      aria-hidden="true"
                    />
                    Logout
                  </button>
                </span>
              </div>
            </div>
          </header>

          <main className="pt-8 pb-16">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="px-4 sm:px-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Employment Opportunity List
                </h2>

                {/* Tabs */}
                <div className="sm:hidden">
                  <label htmlFor="tabs" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="tabs"
                    name="tabs"
                    className="block w-full py-2 pl-3 pr-10 mt-4 text-base border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden sm:block">
                  <div className="border-b border-gray-200">
                    <nav
                      className="flex mt-2 -mb-px space-x-8"
                      aria-label="Tabs"
                    >
                      {tabs.map((tab) => (
                        <a
                          key={tab.name}
                          href={tab.href}
                          className={classNames(
                            tab.current
                              ? "border-purple-500 text-purple-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:px-6"
                          )}
                        >
                          {tab.name}
                          {tab.count ? (
                            <span
                              className={classNames(
                                tab.current
                                  ? "bg-purple-100 text-purple-600"
                                  : "bg-gray-100 text-gray-900",
                                "hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
                              )}
                            >
                              {tab.count}
                            </span>
                          ) : null}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
              <motion.ul
                variants={stagger}
                initial="initial"
                animate="animate"
                role="list"
                className="divide-y divide-gray-200"
              >
                {positions.map((position) => (
                  <motion.li variants={fadeInUp} key={position.id}>
                    <a href="#" className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            {position.title}
                          </p>
                          <div className="flex flex-shrink-0 ml-2">
                            <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                              {position.type}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <OfficeBuildingIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              {position.entity}
                            </p>
                            <p className="flex items-center mt-2 text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <UsersIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              {position.department}
                            </p>
                            <p className="flex items-center mt-2 text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <LocationMarkerIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              {position.location}
                            </p>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-gray-500 sm:mt-0">
                            <CalendarIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <p>
                              Closing on{" "}
                              <time dateTime={position.closeDate}>
                                {position.closeDateFull}
                              </time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Pagination */}
              <nav
                className="flex items-center justify-between px-4 border-t border-gray-200 sm:px-0"
                aria-label="Pagination"
              >
                <div className="flex flex-1 w-0 -mt-px">
                  <a
                    href="#"
                    className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-200"
                  >
                    <ArrowNarrowLeftIcon
                      className="w-5 h-5 mr-3 text-gray-400"
                      aria-hidden="true"
                    />
                    Previous
                  </a>
                </div>
                <div className="hidden md:-mt-px md:flex">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 pt-4 text-sm font-medium text-purple-600 border-t-2 border-purple-500"
                  >
                    1
                  </a>
                  {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
                  <a
                    href="#"
                    className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-200"
                    aria-current="page"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-200"
                  >
                    3
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-200"
                  >
                    4
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-200"
                  >
                    5
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-200"
                  >
                    6
                  </a>
                </div>
                <div className="flex justify-end flex-1 w-0 -mt-px">
                  <a
                    href="#"
                    className="inline-flex items-center pt-4 pl-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-200"
                  >
                    Next
                    <ArrowNarrowRightIcon
                      className="w-5 h-5 ml-3 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </nav>
            </div>
          </main>
        </div>

        <Footer />
      </motion.div>
    </React.Fragment>
  );
};

export default EOList;
