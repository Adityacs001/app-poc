import * as React from "react";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import MainHeader from "@components/MainHeader";
import { useRouter } from "next/router";
import { WrapperSelectController } from "@components/FormSelect";
import Select from "react-select";
import produce from "immer";
import classnames from "classnames";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import useEncodehtml from "../hooks/useEncodehtml";
import { useSelectStyles } from "../hooks/useHelper";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Message from "@components/Message";
import Spinner from "@components/Spinner";
import isEmpty from "lodash/isEmpty";
import isUndefined from "lodash/isUndefined";

const PositionProfile = () => {
  const samplelookup = [
    {
      id: 1,
      value: 1,
      label: "Bachelor in computer sicence",
      titleen: "Title 1",
      titleae: "Title 1",
    },
    {
      id: 2,
      value: 2,
      label: "Master in computer science",
      titleen: "Title 2",
      titleae: "Title 2",
    },
  ];

  const router = useRouter();
  const [isloading, setIsloading] = React.useState<boolean>(false);

  type positionDTO = {
    templatetype: object;
    jobtitleen: string;
    jobtitleae: string;
    description: string;
  };

  const positionschema = yup.object().shape({
    templatetype: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("Template type is mandatory"),

    jobtitleen: yup.string().required("Jobtitle in english is mandatory"),
    jobtitleae: yup.string().required("Jobtitle in arabic is mandatory"),

    description: yup
      .string()
      .min(17, "minimum 500 characters")
      .max(5007, "maximum 5000 character")
      .required("Job description is mandatory"),
  });

  const positionmethods = useForm<positionDTO>({
    mode: "onChange",
    resolver: yupResolver(positionschema),
  });

  const {
    register,
    handleSubmit,
    formState,
    errors,
    setValue,
    setError,
    clearErrors,
    control,
    getValues,
    trigger,
  } = positionmethods;

  const onPositionSubmit = async ({
    templatetype,
    jobtitleen,
    jobtitleae,
    description,
  }) => {
    console.log(templatetype, jobtitleen, jobtitleae, description);
  };

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
                onClick={(e) => router.push("/postvacancy")}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Post Vacancy
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="px-6 py-3  sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
          <MainHeader
            title="Fill in all mandatory fileds"
            subtitle="10 matching candidates will be automatically added on creating or editing vacancy"
            isbordered={false}
          />
        </div>
      </div>
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <FormProvider {...positionmethods}>
            <form onSubmit={handleSubmit(onPositionSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Template Type
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                        <WrapperSelectController
                          className=""
                          defaultValue="0"
                          control={control}
                          name="templatetype"
                          id="templatetype"
                          inputId="templatetype"
                          instanceId="templatetype"
                          render={({
                            name,
                            value,
                            onChange,
                            id,
                            inputId,
                            instanceId,
                          }) => (
                            <Select
                              {...{
                                name,
                                value,
                                onChange,
                                id,
                                inputId,
                                instanceId,
                              }}
                              isClearable="true"
                              className="w-full rounded-none "
                              options={samplelookup}
                              styles={useSelectStyles}
                            />
                          )}
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.templatetype?.message}
                      </p>
                    </div>

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
                        htmlFor="entityname_en"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Job Title(In English)
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <input
                          name="jobtitleen"
                          id="jobtitleen"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter job title"
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.jobtitleen?.message}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="entityname_en"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Job Title(In Arabic)
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <input
                          id="entityname_en"
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Human Resources Authority Arabic"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Criticality level
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="entityname_en"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Grade
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <input
                          id="entityname_en"
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="1A"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Job category
                      </label>
                      <select
                        id="country"
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
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Job Role
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>Administration Jobs</option>
                        <option>Customer Service Jobs</option>
                        <option>Design/Creative Jobs</option>
                        <option>Education/Training Jobs</option>
                        <option>Engineering Jobs</option>
                        <option>Finance Jobs</option>
                        <option>Human Resources/Personnel Jobs</option>
                        <option>Legal Jobs</option>
                        <option>Logistics Jobs</option>
                        <option>Management Jobs</option>
                        <option>Marketing Jobs</option>
                        <option>Medical Jobs</option>
                        <option>Other Jobs</option>
                        <option>Purchasing Jobs</option>
                        <option>Quality Control Jobs</option>
                        <option>Research Jobs</option>
                        <option>Safety Jobs</option>
                        <option>Sales Jobs</option>
                        <option>Secretarial Jobs</option>
                        <option>Support Services Jobs</option>
                        <option>Technology Jobs</option>
                      </select>
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
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Experience
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>0-1 Yrs</option>
                        <option>2-4 Yrs</option>
                        <option>5-10 Yrs</option>
                        <option>11-15 Yrs</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Salary Range
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>0-10,000 AED</option>
                        <option>10,001-15,000 AED</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Gender
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Employement Type
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>Contract</option>
                        <option>Permanent Employee</option>
                        <option>Internship</option>
                        <option>Temporary Employee</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Recuritment Way
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Career Level
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>Entry level</option>
                        <option>Executive</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Work Type
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>Full Time</option>
                        <option>Shifts</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Work Timings
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>07:00 AM - 03:00 PM</option>
                        <option>08:30 AM - 05:30 PM</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Is reserved for U.A.E nationals only ?
                      </label>
                      <select
                        id="country"
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="about"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required Education
                    </label>
                    <div className="rounded-md shadow-sm">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>

                        <Controller
                          defaultValue={[samplelookup[0], samplelookup[1]]}
                          isMulti
                          id="educations"
                          inputId="educations"
                          instanceId="educations"
                          name="educations"
                          as={Select}
                          options={samplelookup}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          className="w-full rounded-none "
                          styles={useSelectStyles}
                        />
                      </div>
                    </div>
                    <p className="text-red-500 ">error message</p>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="about"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required skills
                    </label>
                    <div className="rounded-md ">
                      <textarea
                        id="about"
                        rows="3"
                        className="ring-1 ring-gray-300 inline-flex w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Required Skills for vacancies"
                      ></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-500"></p>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="about"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required Competences / Abilities
                    </label>
                    <div className="rounded-md shadow-sm">
                      <textarea
                        id="about"
                        rows="3"
                        className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        placeholder="Required Competences for vacancies"
                      ></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-500"></p>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="about"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Roles and Responsbilities
                    </label>
                    <div className="rounded-md shadow-sm">
                      <textarea
                        id="about"
                        rows="3"
                        className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        placeholder="Bullet points with all roles"
                      ></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-500"></p>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="about"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Job Description(Rich Text)
                    </label>
                    <div className="rounded-md shadow-sm">
                      <Controller
                        defaultValue=""
                        className="form-input"
                        name="description"
                        id="description"
                        as={
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
                        }
                        control={control}
                        rules={{ required: true }}
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
                      disabled={!formState.isValid}
                      onClick={(e) => router.push("/vacancies")}
                      type="submit"
                      className={classnames(
                        " inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md  bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out",
                        {
                          "opacity-25 text-gray-300": !formState.isValid,
                        },
                        {
                          "opacity-100 text-white": formState.isValid,
                        },
                      )}
                    >
                      Save
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </React.Fragment>
  );
};

PositionProfile.getLayout = getLayout;

export default PositionProfile;
