import * as React from "react";
import { motion } from "framer-motion";
import MainHeader from "@components/MainHeader";
import { useRouter } from "next/router";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import produce from "immer";
import classnames from "classnames";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import useEncodehtml from "../hooks/useEncodehtml";
import { useSelectStyles } from "../hooks/useHelper";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Message from "@components/Message";
import Spinner from "@components/Spinner";
import FormCombo, { OptimizedOption } from "@components/FormCombo";
import isEmpty from "lodash/isEmpty";
import isUndefined from "lodash/isUndefined";
import { OptionsDTO, OptionsDependentDTO } from "../lib/commontypes";
import { yesnooptions } from "../lib/commonlookups";
import jobcriticalities from "../data/jobcriticalities";
import jobgrades from "../data/jobgrades";
import jobroles from "../data/jobroles";
import jobcategories from "../data/jobcategories";
import jobexperience from "../data/jobexperience";
import jobsalaries from "../data/jobsalaries";
import jobcompetencies from "../data/jobcompetencies";
import jobskills from "../data/jobskills";
import gender from "../data/gender";
import jobemploymenttype from "../data/jobemploymenttype";
import jobcareerlevel from "../data/jobcareerlevel";
import jobeducations from "../data/jobeducations";
import { CommonFormProps } from "../lib/commontypes";
import { useQuery } from "react-query";

const getvacancytemplatebyid = async ({ queryKey }) => {
  const [_key, { rid }] = queryKey;
  const response = await fetch(`/api/getvacancytemplatebyid?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};
const PositionProfileForm: React.FC<CommonFormProps> = ({
  rid,
  onFormSubmit,
}: CommonFormProps) => {
  //const jobdescriptionlocalref = React.useRef<HTMLInputElement | null>(null);

  const { isLoading, isError, data, error } = useQuery(
    ["getvacancytemplatebyid", { rid }],
    getvacancytemplatebyid,
    {
      enabled: rid !== "" && rid !== process.env.NEXT_PUBLIC_RID_NEW,
      refetchOnWindowFocus: false,
    },
  );

  const router = useRouter();

  type positionDTO = {
    rid: string;
    jobtitleen: string;
    jobtitleae: string;
    criticality: number;
    grade: number;
    jobcategory: number;
    jobrole: number;
    experience: number;
    salaryrange: number;
    gender: number;
    employementype: number;
    careerlevel: number;
    isnationalonly: number;
    isactive: number;
    requirededucation: Array<OptionsDependentDTO>;
    requiredskill: Array<OptionsMultiDTO>;
    requiredabilities: Array<OptionsMultiDTO>;
    responsbilities: string;
    description: string;
  };

  const positionschema = yup.object().shape({
    rid: yup.string().required("rid must be initialized"),
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
      .number()
      .min(1, "job category is mandatory")
      .required("job category is mandatory"),

    jobrole: yup
      .number()
      .min(1, "job role is mandatory")
      .required("job role is mandatory"),

    experience: yup
      .number()
      .min(1, "experience is mandatory")
      .required("experience is mandatory"),

    salaryrange: yup
      .number()
      .min(1, "salary range is mandatory")
      .required("salary range is mandatory"),

    gender: yup
      .number()
      .min(1, "gender is mandatory")
      .required("gender is mandatory"),

    employementype: yup
      .number()
      .min(1, "employment type is mandatory")
      .required("employment type is mandatory"),

    careerlevel: yup
      .number()
      .min(1, "career level is mandatory")
      .required("career level is mandatory"),

    isnationalonly: yup
      .number()
      .min(1, "Is national only is mandatory")
      .required("is reserved for U.A.E national is mandatory"),

    isactive: yup
      .number()
      .min(1, "Template status is mandatory")
      .required("Template status is mandatory"),

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
      .max(4007, "maximum 4000 character")
      .required("Roles & Responsbilities is mandatory"),

    description: yup
      .string()
      .min(17, "minimum 500 characters")
      .max(4007, "maximum 4000 character")
      .required("Job description is mandatory"),
  });

  const positionmethods = useForm<positionDTO>({
    mode: "onChange",
    resolver: yupResolver(positionschema),
    defaultValues: {
      rid: rid || "",
      careerlevel: 0,
      criticality: 0,
      description: "",
      employementype: 0,
      experience: 0,
      gender: 0,
      grade: 0,
      isactive: 0,
      isnationalonly: 0,
      jobcategory: 0,
      jobrole: 0,
      jobtitleae: "",
      jobtitleen: "",
      requiredabilities: [],
      requirededucation: [],
      requiredskill: [],
      responsbilities: "",
      salaryrange: 0,
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
    reset,
  } = positionmethods;

  const escapeHtml = (input) => {
    var tagsToReplace = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
    };
    return input.replace(/[&<>]/g, function (tag) {
      return tagsToReplace[tag] || tag;
    });
  };

  const onPositionSubmit = async ({
    rid,
    jobtitleen,
    jobtitleae,
    criticality,
    grade,
    jobcategory,
    jobrole,
    experience,
    salaryrange,
    gender,
    employementype,
    careerlevel,
    isnationalonly,
    isactive,
    requirededucation,
    requiredskill,
    requiredabilities,
    responsbilities,
    description,
  }) => {
    let payload: positionDTO = {
      rid,
      jobtitleen,
      jobtitleae,
      criticality,
      grade,
      jobcategory,
      jobrole,
      experience,
      salaryrange,
      gender,
      employementype,
      careerlevel,
      isnationalonly,
      isactive,
      requirededucation,
      requiredskill,
      requiredabilities,
      responsbilities: escapeHtml(responsbilities),
      description: escapeHtml(description),
    };
    //console.log(JSON.stringify(payload, null, 2));
    //onFormSubmit({ issaved: true, message: "saved successfully" });
    const response = await fetch("/api/savevacancytemplate", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      cogoToast.success(
        <Message title="Success" text="saved successfully" type="success" />,
        {
          position: "bottom-center",
        },
      );
      return router.push("/vacancytemplate");
    } else {
      return cogoToast.error(
        <Message
          title="Error"
          text="something went wrong while saving, we are looking into issue. Please try some time later"
          type="error"
        />,
        {
          position: "bottom-center",
        },
      );
    }
  };

  React.useEffect(() => {
    if (data != undefined && data.data != undefined) {
      const { data: profiledefaultvalues } = data;
      setValue("requirededucation", profiledefaultvalues.requirededucation);
      trigger("requirededucation");
      setValue("requiredskill", profiledefaultvalues.requiredskill);
      trigger("requiredskill");
      setValue("requiredabilities", profiledefaultvalues.requiredabilities);
      trigger("requiredabilities");
      setValue("responsbilities", profiledefaultvalues.responsbilities);
      trigger("responsbilities");
      setValue("description", profiledefaultvalues.description);
      trigger("description");
      setValue("jobtitleen", profiledefaultvalues.jobtitleen);
      setValue("jobtitleae", profiledefaultvalues.jobtitleae);
      setValue("criticality", profiledefaultvalues.criticality);
      setValue("grade", profiledefaultvalues.grade);
      setValue("jobcategory", profiledefaultvalues.jobcategory);
      setValue("jobrole", profiledefaultvalues.jobrole);
      setValue("experience", profiledefaultvalues.experience);
      setValue("salaryrange", profiledefaultvalues.salaryrange);
      setValue("gender", profiledefaultvalues.gender);
      setValue("employementype", profiledefaultvalues.employementype);
      setValue("careerlevel", profiledefaultvalues.careerlevel);
      setValue("isnationalonly", profiledefaultvalues.isnationalonly);
      setValue("isactive", profiledefaultvalues.isactive);
    }
  }, [data]);

  return (
    <React.Fragment>
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <FormProvider {...positionmethods}>
            <form onSubmit={handleSubmit(onPositionSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 ">
                      <input
                        type="hidden"
                        id="rid"
                        name="rid"
                        value={rid || ""}
                        ref={register}
                      />
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

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="isactive"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Is template active for vacancy posting ?
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          id="isactive"
                          name="isactive"
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
                      <p className="text-red-500">{errors.isactive?.message}</p>
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
                          defaultValue={getValues("requirededucation")}
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
                          defaultValue={getValues("requiredskill")}
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
                          defaultValue={getValues("requiredabilities")}
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
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        name="responsbilities"
                        id="responsbilities"
                        as={
                          <SunEditor
                            setContents={getValues("responsbilities")}
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
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        name="description"
                        id="description"
                        as={
                          <SunEditor
                            setContents={getValues("description")}
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
                  <span className="inline-flex rounded-md shadow-sm justify-between">
                    <button
                      disabled={!formState.isValid}
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
                    <button
                      className=" inline-flex justify-center py-2 px-4 mx-2 border border-transparent text-sm opacity-100 text-white leading-5 font-medium rounded-md  bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700 transition duration-150 ease-in-out"
                      type="button"
                      onClick={() =>
                        reset({
                          rid: rid,
                          description: "",
                          requirededucation: [],
                          requiredskill: [],
                          requiredabilities: [],
                        })
                      }
                    >
                      Clear
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

export default PositionProfileForm;
