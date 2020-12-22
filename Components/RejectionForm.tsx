import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import Message from "@components/Message";
import rejectionreason from "../data/rejectionreason";
import classnames from "classnames";
const RejectForm = ({
  rid,
  resumeid,
  reqid,
  reqresumeid,
  statusid,
  onFormSubmit,
}: {
  rid: string;
  resumeid: string;
  reqid: string;
  reqresumeid: string;
  statusid: number;
  onFormSubmit: (data) => void;
}) => {
  type RejectionDTO = {
    reasonid: number;
    comment: string;
  };

  const rejectschema = yup.object().shape({
    reasonid: yup
      .number()
      .min(1, "Reason is mandatory")
      .required("Reason is mandatory"),

    comment: yup.string().min(25).required("Specify reason for rejection"),
  });

  const rejectionmethods = useForm<RejectionDTO>({
    mode: "onChange",
    resolver: yupResolver(rejectschema),
    defaultValues: {
      reasonid: 0,
      comment: "",
    },
  });

  const { register, handleSubmit, errors, formState, reset } = rejectionmethods;

  const onRejectSubmit = async ({ reasonid, comment }) => {
    const saveobject = {
      rid,
      resumeid,
      reqid,
      reqresumeid,
      reasonid,
      comment,
      currentstatus: statusid,
      actiontype: 2,
    };
    const response = await fetch("/api/updatejourneystatus", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify(saveobject),
    });

    if (response.ok) {
      const result = await response.json();
      if (!!result && result.status === 200) onFormSubmit(result.data);
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
        <div className="mt-5 md:mt-0 md:col-span-2">
          <FormProvider {...rejectionmethods}>
            <form onSubmit={handleSubmit(onRejectSubmit)}>
              <div className="sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="reason"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Reason
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="reasonid"
                          id="reasonid"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {rejectionreason.map((val, index) => (
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
                      <p className="text-red-500">{errors.reasonid?.message}</p>
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
                          minLength={25}
                          name="comment"
                          id="comment"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter any comment"
                        />
                      </div>
                      <p className="text-red-500">{errors.comment?.message}</p>
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
                            Minimum 25 characters
                          </span>
                        </span>
                      </p>
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

export default RejectForm;
