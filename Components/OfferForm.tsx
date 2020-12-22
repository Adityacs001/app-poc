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
import replace from "lodash/replace";
import isUndefined from "lodash/isUndefined";
import isEmpty from "lodash/isEmpty";
const getOffersetup = async ({ queryKey }) => {
  const [_key, { rid }] = queryKey;

  const response = await fetch(`/api/getoffersetup?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const getofferletterattachment = async (rid: string) => {
  const response = await fetch(`/api/getofferletterattachment?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const OfferForm = ({
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
    isLoading: offersetupisLoading,
    isError: offersetupisError,
    data: offersetupdata,
    error: offersetuperror,
  } = useQuery(["getOffersetup", { rid: reqresumeid }], getOffersetup, {
    enabled: !!reqresumeid,
    refetchOnWindowFocus: false,
  });

  type OfferDTO = {
    joiningdate: Date | string;
    salary: string;
    offerletter: object;
    comment: string;
  };

  type OfferSaveDTO = {
    rid: string;
    resumeid: string;
    reqid: string;
    reqresumeid: string;
    offerfilename: string;
    offercontent: string;
  } & OfferDTO;

  const offerschema = yup.object().shape({
    joiningdate: yup.string().required("Joining Date is mandatory"),

    salary: yup.string().required("Joining Date is mandatory"),

    offerletter: yup
      .mixed()
      .test("fileSize", "This file is too large", (value) => {
        if (!value.length) return true;
        else return value && value[0].size <= 3000000;
      })
      .test("type", "only PDF , PNG, JPEG , JPG supported", (value) => {
        if (isUndefined(value[0])) return true;
        return (
          value &&
          (value[0].type === "image/jpeg" ||
            value[0].type === "image/png" ||
            value[0].type === "application/pdf" ||
            value[0].type === "image/jpg")
        );
      }),
  });

  const Offermethods = useForm<OfferDTO>({
    mode: "onChange",
    resolver: yupResolver(offerschema),
    defaultValues: {
      joiningdate: "",
      salary: "",
      offerletter: undefined,
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
  } = Offermethods;

  const watchofferletterfile = watch("offerletter");

  const onOfferSubmit = async ({
    joiningdate,
    salary,
    offerletter,
    comment,
  }) => {
    let salaryvalue = replace(salary, new RegExp(",", "g"), "");
    let payload: OfferSaveDTO = {
      rid,
      resumeid,
      reqid,
      reqresumeid,
      joiningdate: new Date(joiningdate).toISOString().slice(0, 10),
      salary: salaryvalue,
      offerletter,
      comment,
      offerfilename: "",
      offercontent: "",
    };

    if (
      offerletter != undefined &&
      offerletter != null &&
      offerletter[0] != undefined
    ) {
      var uploadedfile = offerletter[0];
      payload.offercontent = (await getBase64(uploadedfile)) as string;
      payload.offerfilename = uploadedfile.name.toLowerCase();
    } else {
      payload.offerfilename = uploadedfilenameonly;
    }

    const { offerletter: excludedprop, ...saveobject } = payload;

    const response = await fetch("/api/saveoffer", {
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

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      try {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          try {
            var regex = /^.*\.(pdf|PDF|JPEG|jpeg|JPG|jpg|PNG|png|DOC|doc|DOCX|docx)$/;
            if (regex.test(file.name.toLowerCase())) {
              return resolve(reader.result);
            } else {
              return reject(undefined);
            }
          } catch (e) {
            return reject(undefined);
          }
        };
        reader.onerror = function (error) {
          return reject(undefined);
        };
      } catch (e) {
        return reject(e);
      }
    });
  };

  const [uploadedfilenameonly, setUploadedfilenameonly] = React.useState();

  const downloadfile = (filedata, filename) => {
    const linkSource = filedata;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = filename;
    downloadLink.click();
  };

  const ondownloadclick = () => {
    getofferletterattachment(reqresumeid)
      .then(({ data }) => {
        if (!isEmpty(data.filename) && !isEmpty(data.filedata)) {
          downloadfile(data.filedata, data.filename);
        } else {
          return cogoToast.error(
            <Message title="Error" text="file not found" type="error" />,
            {
              position: "bottom-center",
            },
          );
        }
      })
      .catch(({ data }) => {
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
      });
  };

  React.useEffect(() => {
    if (offersetupdata != undefined && offersetupdata.data != undefined) {
      const { data: offerdefaultvalues } = offersetupdata;
      setValue("joiningdate", new Date(offerdefaultvalues.joiningdate));
      setValue("salary", offerdefaultvalues.salary);

      setValue("comment", offerdefaultvalues.comment);
      //local react state for upload only
      setUploadedfilenameonly(offerdefaultvalues.docname);
    }
  }, [offersetupdata]);

  React.useEffect(() => {
    if (!isUndefined(watchofferletterfile) && !isEmpty(watchofferletterfile))
      setUploadedfilenameonly(undefined);
  }, [watchofferletterfile]);

  return (
    <React.Fragment>
      <div className="md:grid md:grid-cols-1 md:gap-1">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <FormProvider {...Offermethods}>
            <form onSubmit={handleSubmit(onOfferSubmit)}>
              <div className="sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="joiningdate"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Joining Date
                      </label>
                      <div className="mt-1 flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <Controller
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          name="joiningdate"
                          id="joiningdate"
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
                        {errors.joiningdate?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="salary"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Monthly Salary (In AED)
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <Controller
                          defaultValue={""}
                          id="salary"
                          name="salary"
                          allowNegative={false}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={([{ value }]) => {
                            return value;
                          }}
                          thousandSeparator={true}
                          as={<FormattedNumber />}
                          control={control}
                        />
                      </div>
                      <p className="text-red-500">{errors.salary?.message}</p>
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

                    <div className="col-span-6 ">
                      <label
                        htmlFor="jobdescription"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Offer Letter
                      </label>
                      {uploadedfilenameonly && (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                          {uploadedfilenameonly}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              ondownloadclick();
                            }}
                            type="button"
                            className="flex-shrink-0 -mr-0.5 ml-1.5 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700"
                            aria-label="download attachement"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              setValue("offerletter", undefined);
                              clearErrors("offerletter");
                              setUploadedfilenameonly(undefined);
                            }}
                            type="button"
                            className="flex-shrink-0 -mr-0.5 ml-1.5 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700"
                            aria-label="Remove attachement"
                          >
                            <svg
                              className="h-2 w-2"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 8 8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeWidth="1.5"
                                d="M1 1l6 6m0-6L1 7"
                              />
                            </svg>
                          </button>
                        </span>
                      )}
                      {!isUndefined(watchofferletterfile) &&
                        !isEmpty(watchofferletterfile) && (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                            {!isUndefined(watchofferletterfile) &&
                            !isEmpty(watchofferletterfile)
                              ? watchofferletterfile[0].name
                              : "Not selected"}
                            <button
                              onClick={(e) => {
                                setValue("offerletter", undefined);
                                clearErrors("offerletter");
                              }}
                              type="button"
                              className="flex-shrink-0 -mr-0.5 ml-1.5 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700"
                              aria-label="Remove large badge"
                            >
                              <svg
                                className="h-2 w-2"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 8 8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeWidth="1.5"
                                  d="M1 1l6 6m0-6L1 7"
                                />
                              </svg>
                            </button>
                          </span>
                        )}
                      <div className="mt-2 max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="space-y-1 text-center ">
                            <p className="text-sm text-gray-600">
                              <input
                                id="offerletter"
                                name="offerletter"
                                type="file"
                                ref={register}
                                className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="select file"
                                aria-label="select file"
                                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              />
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              Accepted file formats are PDF,doc,docx to 3MB
                            </p>
                          </div>
                        </div>
                        <p className="text-red-500">
                          {errors.offerletter?.message}
                        </p>
                      </div>
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

export default OfferForm;
