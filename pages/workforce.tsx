import * as React from "react";
import Head from "next/head";
import classnames from "classnames";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import { Transition } from "@headlessui/react";
import MainHeader from "@components/MainHeader";
import SubHeader from "@components/SubHeader";
import { useRouter } from "next/router";
import { useSelectStyles } from "../hooks/useHelper";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Select from "react-select";
import withSession from "lib/session";
import PageTitle from "@components/PageTitle";
import NotificationNav from "@components/NotificationNav";

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
        <div className="">
          <NotificationNav />
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="px-6 py-3  sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0 border-b border-gray-200">
          <PageTitle
            title="Workforce Planning"
            subtitle="All employees  "
            isbordered={false}
          />
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
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-r-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-r-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-r-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-r-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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

export const getServerSideProps = withSession;

export default Workforce;
