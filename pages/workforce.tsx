import * as React from "react";
import Head from "next/head";
import classnames from "classnames";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import { Transition } from "@tailwindui/react";
import MainHeader from "@components/MainHeader";
import SubHeader from "@components/SubHeader";
import { useRouter } from "next/router";
import { useSelectStyles } from "../hooks/useHelper";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Select from "react-select";

const Workforce = () => {
  const samplelookup = [
    {
      id: 1,
      value: 1,
      label: "Bachelor of Engineering in computer sicence",
      titleen: "Title 1",
      titleae: "Title 1",
    },
    {
      id: 2,
      value: 2,
      label: "Master of Business Administration in finance",
      titleen: "Title 2",
      titleae: "Title 2",
    },
    {
      id: 3,
      value: 3,
      label: "Diploma of Arts in design",
      titleen: "Title 2",
      titleae: "Title 2",
    },
    {
      id: 4,
      value: 4,
      label: "Certification 4/secondary - G12 - Any",
      titleen: "Title 2",
      titleae: "Title 2",
    },
    {
      id: 5,
      value: 5,
      label: "Post Graduate - Science - Mathematics",
      titleen: "Title 2",
      titleae: "Title 2",
    },
    {
      id: 6,
      value: 6,
      label: "Advance Diploma - Law - Legal",
      titleen: "Title 2",
      titleae: "Title 2",
    },
  ];

  const sampleskills = [
    {
      id: 1,
      value: 1,
      label: "Desinging",
      titleen: "Title 1",
      titleae: "Title 1",
    },
    {
      id: 2,
      value: 2,
      label: "Documentation",
      titleen: "Title 2",
      titleae: "Title 2",
    },
    {
      id: 3,
      value: 3,
      label: "Planning",
      titleen: "Title 2",
      titleae: "Title 2",
    },
    {
      id: 4,
      value: 4,
      label: "Architecutre",
      titleen: "Title 2",
      titleae: "Title 2",
    },
    {
      id: 5,
      value: 5,
      label: "Preaparing presentation",
      titleen: "Title 2",
      titleae: "Title 2",
    },
    {
      id: 6,
      value: 6,
      label: "Accounts management",
      titleen: "Title 2",
      titleae: "Title 2",
    },
  ];

  const samplecompetencies = [
    {
      id: 1,
      value: 1,
      label: "Adabtability to change",
      titleen: "Title 1",
      titleae: "Title 1",
    },
    {
      id: 2,
      value: 2,
      label: "Thought Foucs",
      titleen: "Title 2",
      titleae: "Title 2",
    },
    {
      id: 3,
      value: 3,
      label: "People Foucs",
      titleen: "Title 2",
      titleae: "Title 2",
    },
    {
      id: 4,
      value: 4,
      label: "Delivery Focus",
      titleen: "Title 2",
      titleae: "Title 2",
    },
    {
      id: 5,
      value: 5,
      label: "Expressiveness",
      titleen: "Title 2",
      titleae: "Title 2",
    },
    {
      id: 6,
      value: 6,
      label: "Stability",
      titleen: "Title 2",
      titleae: "Title 2",
    },
  ];

  const router = useRouter();
  const [selectedrow, setSelectedrow] = React.useState(0);
  const [showdetail, setShowdetail] = React.useState(false);
  return (
    <React.Fragment>
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader
            title="Workforce Planning"
            subtitle=""
            isbordered={false}
          />
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
        <div className="px-6 py-3  sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0 border-b border-gray-200">
          <MainHeader
            title="Workforce Planning"
            subtitle="All employees  "
            isbordered={false}
          />
          <div className="hidden">
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
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
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
                  placeholder="Select for year"
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
                <span className="ml-2">Choose</span>

                <svg
                  className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="md:grid md:grid-cols-1 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Target Year
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="emiratization"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Emiratizaton %
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                        <input
                          name="emiratization"
                          id="emiratization"
                          className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          placeholder="Enter emiratization %"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="emiratization"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Jobtitle English
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                        <input
                          name="jobtitlen"
                          id="jobtitlen"
                          className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          placeholder="Enter jobtite english"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="emiratization"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Jobtitle English
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                        <input
                          name="jobtitlae"
                          id="jobtitlae"
                          className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          placeholder="Enter jobtite arabic"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="emiratization"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Number of jobs
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                        <input
                          name="totalopenings"
                          id="totalopenings"
                          className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          placeholder="Enter total number of jobs"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Any</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="jobcategory"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Job category
                      </label>
                      <select
                        id="jobcategory"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>Administrative Support</option>
                        <option>Senior Management</option>
                        <option>Specialized– Specialized</option>
                        <option>Service Assistance</option>
                        <option>Technical & Handcraft</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="joblocation"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Job location
                      </label>
                      <select
                        id="jobcategory"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>Abu Dhabi</option>
                        <option>Al Ain</option>
                        <option>Al Dhafra</option>
                        <option>Dubai</option>
                        <option>Sharjha</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="joblocation"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Recuritment Methods
                      </label>
                      <select
                        id="jobcategory"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>Abu Dhabi</option>
                        <option>Al Ain</option>
                        <option>Al Dhafra</option>
                        <option>Dubai</option>
                        <option>Sharjha</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="education"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required Education
                    </label>

                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>

                      <Select
                        isMulti
                        name="colors"
                        options={samplelookup}
                        className="w-full rounded-none "
                        styles={useSelectStyles}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="education"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required skills
                    </label>

                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>

                      <Select
                        isMulti
                        name="colors"
                        options={sampleskills}
                        className="w-full rounded-none "
                        styles={useSelectStyles}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="education"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required competencies
                    </label>

                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>

                      <Select
                        isMulti
                        name="colors"
                        options={samplecompetencies}
                        className="w-full rounded-none "
                        styles={useSelectStyles}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="about"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Job Description(Rich Text)
                    </label>
                    <div className="rounded-md shadow-sm">
                      <SunEditor
                        setOptions={{
                          height: 200,
                          buttonList: [
                            ["font", "fontColor", "fontSize"],
                            ["bold", "underline", "italic", "strike"],
                            ["-right", "undo", "redo"],
                            [
                              "blockquote",
                              "horizontalRule",
                              "lineHeight",
                              "list",
                              "textStyle",
                              "align",
                            ],
                            ["fullScreen", "image"],
                          ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                          // Other option
                        }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-indigo-500 flex items-end">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span className="inline-block px-2">
                        Minimum 500 character
                      </span>
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <span className="inline-flex rounded-md shadow-sm">
                    <button
                      onClick={(e) => router.push("/vacancies")}
                      type="submit"
                      className={classnames(
                        " inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md  bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out opacity-100 text-white",
                      )}
                    >
                      Save
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Workforce.getLayout = getLayout;

export default Workforce;
