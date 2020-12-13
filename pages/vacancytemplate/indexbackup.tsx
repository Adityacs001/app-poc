import * as React from "react";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import MainHeader from "@components/MainHeader";
import { useRouter } from "next/router";
import { WrapperSelectController } from "@components/FormSelect";
import Select, { createFilter } from "react-select";
import AsyncSelect from "react-select/async";
import produce from "immer";
import classnames from "classnames";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import useEncodehtml from "../../hooks/useEncodehtml";
import { useSelectStyles } from "../../hooks/useHelper";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Message from "@components/Message";
import Spinner from "@components/Spinner";
import FormCombo, { OptimizedOption } from "@components/FormCombo";
import isEmpty from "lodash/isEmpty";
import isUndefined from "lodash/isUndefined";
import { OptionsDTO } from "../../lib/commontypes";
import { yesnooptions } from "../../lib/commonlookups";
import jobcriticalities from "../../data/jobcriticalities";
import jobgrades from "../../data/jobgrades";
import jobroles from "../../data/jobroles";
import jobcategories from "../../data/jobcategories";
import joblocations from "../../data/joblocations";
import jobexperience from "../../data/jobexperience";
import jobsalaries from "../../data/jobsalaries";
import jobcompetencies from "../../data/jobcompetencies";
import jobskills from "../../data/jobskills";
import gender from "../../data/gender";
import jobemploymenttype from "../../data/jobemploymenttype";
import jobcareerlevel from "../../data/jobcareerlevel";

import jobeducations from "../../data/jobeducations";

const PositionProfile = () => {
  const router = useRouter();
  const [isloading, setIsloading] = React.useState<boolean>(false);

  type positionDTO = {
    rid: string;
    jobtitleen: string;
    jobtitleae: string;
    criticality: OptionsDTO;
    grade: OptionsDTO;
    jobcategory: OptionsDTO;
    jobrole: OptionsDTO;
    city: OptionsDTO;
    experience: OptionsDTO;
    salaryrange: OptionsDTO;
    gender: OptionsDTO;
    employementype: OptionsDTO;
    careerlevel: OptionsDTO;
    isnationalonly: OptionsDTO;
    requirededucation: Array<OptionsDTO>;
    requiredskill: Array<OptionsDTO>;
    requiredabilities: Array<OptionsDTO>;
    responsbilities: string;
    description: string;
  };

  const positionschema = yup.object().shape({
    jobtitleen: yup.string().required("Jobtitle in english is mandatory"),
    jobtitleae: yup.string().required("Jobtitle in arabic is mandatory"),
    criticality: yup
      .number()
      .min(1, "job criticality level is mandatory")
      .required("job criticality level is mandatory"),
    grade: yup
      .number()
      .min(1, "job grade is mandatory")
      .required("job grade is mandatory"),
    jobcategory: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("job category is mandatory"),

    jobrole: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("job role is mandatory"),

    city: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("city is mandatory"),

    experience: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("city is mandatory"),

    salaryrange: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("salary range is mandatory"),

    gender: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("gender is mandatory"),

    employementype: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("employement type is mandatory"),

    careerlevel: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("career level is mandatory"),

    isnationalonly: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("is reserved for U.A.E national is mandatory"),

    requirededucation: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        }),
      )
      .nullable()
      .required("Required education is mandatory"),

    requiredskill: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        }),
      )
      .nullable()
      .required("Required skill is mandatory"),

    requiredabilities: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        }),
      )
      .nullable()
      .required("Required abilities is mandatory"),

    responsbilities: yup
      .string()
      .min(17, "minimum 500 characters")
      .max(5007, "maximum 5000 character")
      .required("Roles & Responsbilities is mandatory"),

    description: yup
      .string()
      .min(17, "minimum 500 characters")
      .max(5007, "maximum 5000 character")
      .required("Job description is mandatory"),
  });

  const positionmethods = useForm<positionDTO>({
    mode: "onChange",
    resolver: yupResolver(positionschema),
    defaultValues: {
      rid: 0,
    },
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
    watch,
  } = positionmethods;

  // const selectValue = watch("criticality");
  // React.useEffect(() => {
  //   console.log(selectValue);
  // }, [selectValue]);

  const onPositionSubmit = async ({
    jobtitleen,
    jobtitleae,
    criticality,
    grade,
    jobcategory,
    jobrole,
    city,
    experience,
    salaryrange,
    gender,
    employementype,
    careerlevel,
    isnationalonly,
    requirededucation,
    requiredskill,
    requiredabilities,
    responsbilities,
    description,
  }) => {
    console.log(
      jobtitleen,
      jobtitleae,
      criticality,
      grade,
      jobcategory,
      jobrole,
      city,
      experience,
      salaryrange,
      gender,
      employementype,
      careerlevel,
      isnationalonly,
      requirededucation,
      requiredskill,
      requiredabilities,
      responsbilities,
      description,
    );
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
                  {JSON.stringify(formState, null, 2)}
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="jobtitleen"
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
                        htmlFor="jobtitleae"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Job Title(In Arabic)
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <input
                          name="jobtitleae"
                          id="jobtitleae"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Human Resources Authority Arabic"
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.jobtitleae?.message}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="criticality"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Criticality level
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="criticality"
                          id="criticality"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {jobcriticalities &&
                            jobcriticalities.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.criticality?.message}
                      </p>
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

                        <select
                          name="grade"
                          id="grade"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {jobgrades &&
                            jobgrades.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">{errors.grade?.message}</p>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="jobcategory"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Job category
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="jobcategory"
                          id="jobcategory"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {jobcategories &&
                            jobcategories.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.jobcategory?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="jobrole"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Job Role
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="jobrole"
                          id="jobrole"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {jobroles &&
                            jobroles.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">{errors.jobrole?.message}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        City
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="city"
                          id="city"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {joblocations &&
                            joblocations.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">{errors.city?.message}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Experience
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="experience"
                          id="experience"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {jobexperience &&
                            jobexperience.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.experience?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="salaryrange"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Salary Range
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="salaryrange"
                          id="salaryrange"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {jobsalaries &&
                            jobsalaries.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.salaryrange?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Gender
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          id="gender"
                          name="gender"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {gender &&
                            gender.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">{errors.gender?.message}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="employementype"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Employement Type
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          id="employementype"
                          name="employementype"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {jobemploymenttype &&
                            jobemploymenttype.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.employementype?.message}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="careerlevel"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Career Level
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          id="careerlevel"
                          name="careerlevel"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {jobcareerlevel &&
                            jobcareerlevel.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.careerlevel?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="isnationalonly"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Is reserved for U.A.E nationals only ?
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          id="isnationalonly"
                          name="isnationalonly"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {yesnooptions &&
                            yesnooptions.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.isnationalonly?.message}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="requirededucation"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required Education
                    </label>
                    <div className="rounded-md shadow-sm">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>

                        <Controller
                          isMulti
                          id="requirededucation"
                          inputId="requirededucation"
                          instanceId="requirededucation"
                          name="requirededucation"
                          as={Select}
                          options={jobeducations}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          className="w-full rounded-none "
                          styles={useSelectStyles}
                        />
                      </div>
                    </div>
                    <p className="text-red-500">
                      {errors.requirededucation?.message}
                    </p>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="requiredskill"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required skills
                    </label>
                    <div className="rounded-md shadow-sm">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                        <Controller
                          isMulti
                          id="requiredskill"
                          inputId="requiredskill"
                          instanceId="requiredskill"
                          name="requiredskill"
                          ignoreAccents={false}
                          as={Select}
                          options={jobskills}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          className="w-full rounded-none shadow-none ring-transparent focus:ring-offset-transparent focus:ring-0 "
                          styles={useSelectStyles}
                        />
                      </div>
                    </div>
                    <p className="text-red-500">
                      {errors.requiredskill?.message}
                    </p>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="requiredabilities"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required Competences / Abilities
                    </label>
                    <div className="rounded-md shadow-sm">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>

                        <Controller
                          isMulti
                          id="requiredabilities"
                          inputId="requiredabilities"
                          instanceId="requiredabilities"
                          name="requiredabilities"
                          as={Select}
                          options={jobcompetencies}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          className="w-full rounded-none "
                          styles={useSelectStyles}
                        />
                      </div>
                    </div>
                    <p className="text-red-500">
                      {errors.requiredabilities?.message}
                    </p>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="about"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Roles and Responsbilities
                    </label>
                    <div className="rounded-md shadow-sm">
                      <Controller
                        defaultValue=""
                        className="form-input"
                        name="responsbilities"
                        id="responsbilities"
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
                              ],
                            }}
                          />
                        }
                        control={control}
                        rules={{ required: true }}
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.responsbilities?.message}
                    </p>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="about"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Job Description
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
                              ],
                            }}
                          />
                        }
                        control={control}
                        rules={{ required: true }}
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.description?.message}
                    </p>

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
