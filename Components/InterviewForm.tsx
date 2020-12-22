import React from "react";

import classnames from "classnames";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import Message from "@components/Message";
import { useQuery } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormattedNumber from "react-number-format";
import interviewmodes from "../data/interviewmodes";
import replace from "lodash/replace";

const getInterviewsetup = async ({ queryKey }) => {
  const [_key, { rid }] = queryKey;

  const response = await fetch(`/api/getInterviewsetup?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const InterviewForm = ({
  rid,
  resumeid,
  reqid,
  reqresumeid,
  onFormSubmit,
}: {
  rid: string;
  resumeid: string;
  reqid: string;
  reqresumeid: string;
  onFormSubmit: () => void;
}) => {
  const {
    isLoading: interviewsetupisLoading,
    isError: interviewsetupisError,
    data: interviewsetupdata,
    error: interviewsetuperror,
  } = useQuery(["getInterviewsetup", { rid: reqresumeid }], getInterviewsetup, {
    enabled: !!reqresumeid,
    refetchOnWindowFocus: false,
  });

  type InterviewDTO = {
    interviewdate: Date | string;
    interviewduration: string;
    interviewpanel: number;
    interviewmode: number;
    interviewlocation: string;
    comment: string;
  };

  const Interviewschema = yup.object().shape({
    interviewdate: yup
      .string()

      .required("Interview Data is mandatory"),
    interviewduration: yup
      .string()

      .required("Interview Duration is mandatory"),

    interviewpanel: yup
      .number()
      .min(1, "Interview panel is mandatory")
      .required("Interview panel is mandatory"),

    interviewmode: yup
      .number()
      .min(1, "Interview mode is mandatory")
      .required("Interview mode is mandatory"),

    interviewlocation: yup.string().required("Interview location is mandatory"),
  });

  const Interviewmethods = useForm<InterviewDTO>({
    mode: "onChange",
    resolver: yupResolver(Interviewschema),
    defaultValues: {
      interviewdate: "",
      interviewduration: "",
      interviewpanel: 0,
      interviewmode: 0,
      interviewlocation: "",
      comment: "",
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
  } = Interviewmethods;

  const onInterviewSubmit = async ({
    interviewdate,
    interviewduration,
    interviewpanel,
    interviewmode,
    interviewlocation,
    comment,
  }) => {
    const saveobject = {
      rid,
      resumeid,
      reqid,
      reqresumeid,
      interviewdate: new Date(interviewdate).toISOString().slice(0, 10),
      interviewduration: replace(interviewduration, new RegExp(" ", "g"), ""),
      interviewpanel,
      interviewmode,
      interviewlocation,
      comment,
    };
    const response = await fetch("/api/saveinterviewschedular", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify(saveobject),
    });

    if (response.ok) {
      onFormSubmit();
      return cogoToast.success(
        <Message title="Success" text="saved successfully" type="success" />,
        {
          position: "bottom-center",
        },
      );
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

  return (
    <React.Fragment>
      <div className="md:grid md:grid-cols-1 md:gap-1">
        <div className="p-1">
          <div className="bg-white  overflow-hidden mt-1">
            <ul className="divide-y divide-gray-200">
              {!interviewsetupisLoading &&
                !!interviewsetupdata &&
                !!interviewsetupdata?.data &&
                !!interviewsetupdata?.data?.interviews &&
                interviewsetupdata?.data?.interviews.map((val, index) => (
                  <li key={index}>
                    <div className="block hover:bg-gray-50">
                      <div className="py-2 flex items-center px-2">
                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <div className="flex text-sm font-medium text-indigo-600 truncate">
                              <p>{val?.interviewmode}</p>
                              <p className="ml-1 font-normal text-gray-500">
                                at {val?.interviewlocation}
                              </p>
                            </div>
                            <div className="mt-2 flex">
                              <div className="flex items-center text-sm text-gray-500">
                                {/* Heroicon name: calendar */}
                                <svg
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <p className="flex">
                                  <time dateTime={val?.interviewdate}>
                                    {val?.interviewdate}
                                  </time>
                                  <span className="inline-flex px-3">
                                    <svg
                                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>

                                    {val?.interviewduration}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <p>By {val?.interviewpanel}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <h2
            id="interviewlist"
            className="text-lg font-medium text-gray-900 bg-white px-4 pt-4"
          >
            Add new Interview
          </h2>
          <FormProvider {...Interviewmethods}>
            <form onSubmit={handleSubmit(onInterviewSubmit)}>
              <div className="sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Interview Date
                      </label>
                      <div className="mt-1 flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <Controller
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          name="interviewdate"
                          id="interviewdate"
                          control={control}
                          render={({ onChange, value }) => (
                            <DatePicker
                              dateFormat="yyyy-MM-dd"
                              selected={value}
                              onChange={onChange}
                              className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          )}
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.interviewdate?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Interview Duration (HH:MM)
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <Controller
                          defaultValue={""}
                          id="interviewduration"
                          name="interviewduration"
                          allowNegative={false}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={([{ value }]) => {
                            return value;
                          }}
                          format="##:##"
                          as={<FormattedNumber />}
                          control={control}
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.interviewduration?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="postingtype"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Interview Panel
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="interviewpanel"
                          id="interviewpanel"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {!interviewsetupisLoading &&
                            !!interviewsetupdata &&
                            !!interviewsetupdata?.data &&
                            !!interviewsetupdata?.data?.interviewers &&
                            interviewsetupdata?.data?.interviewers.map(
                              (val, index) => (
                                <option
                                  key={index}
                                  value={val.value}
                                  className="text-gray-500 "
                                >
                                  {val.label}
                                </option>
                              ),
                            )}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.interviewpanel?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="postingtype"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Interview mode
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="interviewmode"
                          id="interviewmode"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {interviewmodes &&
                            interviewmodes.map((val, index) => (
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
                        {errors.interviewmode?.message}
                      </p>
                    </div>
                    <div className="col-span-6 ">
                      <label
                        htmlFor="matchingcriteria"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Interview Location
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <textarea
                          maxLength={100}
                          name="interviewlocation"
                          id="interviewlocation"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter interview location"
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.interviewlocation?.message}
                      </p>
                      <p className="mt-2 text-sm text-indigo-500 flex items-start">
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
                        <span className="inline-flex flex-col">
                          <span className="inline-block px-2">
                            Enter office location where jobseeker need to
                            walkinfor interview
                          </span>
                        </span>
                      </p>
                    </div>
                    <div className="col-span-6 ">
                      <label
                        htmlFor="matchingcriteria"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Comment
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <textarea
                          maxLength={200}
                          name="comment"
                          id="comment"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter any comment"
                        />
                      </div>
                      <p className="text-red-500">{errors.comment?.message}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-0.5 px-4 py-3 bg-white text-right sm:px-6">
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
                      onClick={() => reset()}
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

export default InterviewForm;
