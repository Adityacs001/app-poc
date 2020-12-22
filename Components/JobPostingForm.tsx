import * as React from "react";
import { motion } from "framer-motion";
import MainHeader from "@components/MainHeader";
import { useRouter } from "next/router";
import Select from "react-select";

import produce from "immer";
import classnames from "classnames";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";

import { useSelectStyles } from "../hooks/useHelper";

import "suneditor/dist/css/suneditor.min.css";
import Message from "@components/Message";
import Spinner from "@components/Spinner";

import isEmpty from "lodash/isEmpty";
import isUndefined from "lodash/isUndefined";
import { OptionsDTO } from "../lib/commontypes";
import { yesnooptions } from "../lib/commonlookups";
import jobbenefits from "../data/jobbenefits";
import postingtypes from "../data/postingtypes";
import orgnizationunits from "../data/orgnizationunits";
import departments from "../data/departments";
import divisons from "../data/divisons";
import joblocations from "../data/joblocations";
import postingworktypes from "../data/postingworktypes";
import postingworkhours from "../data/postingworkhours";
import postingworkdays from "../data/postingworkdays";
import postingunpublishingreason from "../data/postingunpublishingreason";
import specialneeds from "../data/specialneeds";
import { CommonFormProps } from "../lib/commontypes";
import { useQuery } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FieldStarter from "./FieldStarter";
import useLocales from "../hooks/useLocales";
import useStore, { languageSelector } from "../store/index";

const getpostinglookups = async ({ queryKey }) => {
  const response = await fetch(`/api/getpostinglookups`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const getvacancypostingbyid = async ({ queryKey }) => {
  const [_key, { rid }] = queryKey;
  const response = await fetch(`/api/getvacancypostingbyid?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const getjobdescriptionattachment = async (rid: string) => {
  const response = await fetch(`/api/getjobdescriptionattachment?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const JobPostingForm: React.FC<CommonFormProps> = ({
  rid,
  onFormSubmit,
}: CommonFormProps) => {
  const router = useRouter();

  const { translations } = useLocales();
  const memoizedlocalestate = useStore(React.useCallback(languageSelector, []));

  const {
    isLoading: islookupsLoading,
    isError: islookupsError,
    data: lookupsData,
    error: lookupsError,
  } = useQuery(["getpostinglookups"], getpostinglookups, {
    enabled: rid !== "",
    refetchOnWindowFocus: false,
  });

  const { isLoading, isError, data, error } = useQuery(
    ["getvacancypostingbyid", { rid }],
    getvacancypostingbyid,
    {
      enabled:
        rid !== "" &&
        rid !== process.env.NEXT_PUBLIC_RID_NEW &&
        lookupsData != undefined &&
        lookupsData?.data != undefined,
      refetchOnWindowFocus: false,
    },
  );

  type postingDTO = {
    rid: string;
    positionprofile: OptionsDTO;
    jobcode: string;
    sector: number;
    department: number;
    divison: number;
    city: number;
    openings: number;
    targetdate: Date | string;
    startdate: string;
    postingtype: number;
    worktype: number;
    workinghours: number;
    workingdays: number;
    additionalbenfits: Array<OptionsDTO>;
    specialneeds: Array<OptionsDTO>;
    ispublished: number;
    unpublishingreason: number;
    jobdescription: object;
  };

  type PostingSaveDTO = {
    jobdescriptionfilename: string;
    jobdescriptionconverted: string;
  } & postingDTO;

  const postingchema = yup.object().shape({
    rid: yup.string().required("rid must be initialized"),

    positionprofile: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })

      .required(translations.t("fieldismandatory")),

    sector: yup
      .number()
      .min(1, translations.t("selectnotapplicable"))
      .required(translations.t("fieldismandatory")),
    department: yup
      .number()
      .min(1, translations.t("selectnotapplicable"))
      .required(translations.t("fieldismandatory")),

    divison: yup
      .number()
      .min(1, translations.t("selectnotapplicable"))
      .required(translations.t("fieldismandatory")),

    city: yup
      .number()
      .min(1, translations.t("fieldismandatory"))
      .required(translations.t("fieldismandatory")),

    openings: yup
      .number()
      .min(1, translations.t("fieldismandatory"))
      .required(translations.t("fieldismandatory")),

    targetdate: yup.string().required(translations.t("fieldismandatory")),

    postingtype: yup
      .number()
      .min(1, translations.t("fieldismandatory"))
      .required(translations.t("fieldismandatory")),

    worktype: yup
      .number()
      .min(1, translations.t("fieldismandatory"))
      .required(translations.t("fieldismandatory")),

    workinghours: yup
      .number()
      .min(1, translations.t("fieldismandatory"))
      .required(translations.t("fieldismandatory")),

    workingdays: yup
      .number()
      .min(1, translations.t("fieldismandatory"))
      .required(translations.t("fieldismandatory")),

    ispublished: yup
      .number()
      .min(1, translations.t("fieldismandatory"))
      .required(translations.t("fieldismandatory")),

    unpublishingreason: yup.number().when("ispublished", {
      is: (ispublished) => ispublished == 2,
      then: yup.number().min(1, translations.t("fieldismandatory")),
    }),

    specialneeds: yup
      .mixed()
      .test("required", translations.t("specialneedsismandatory"), (value) => {
        if (
          getValues("postingtype") == 1 &&
          (value == null || value == undefined)
        )
          return false;
        return true;
      }),

    jobdescription: yup
      .mixed()
      .test("fileSize", translations.t("filesizeistoolarge"), (value) => {
        if (!value.length) return true;
        else return value && value[0].size <= 3000000;
      })
      .test("type", translations.t("alloweddoctypes"), (value) => {
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

  const postingmethods = useForm<postingDTO>({
    mode: "onChange",
    resolver: yupResolver(postingchema),
    defaultValues: {
      rid: rid || "",
      positionprofile: {},
      jobcode: "",
      sector: 0,
      department: 0,
      divison: 0,
      city: 0,
      openings: 0,
      targetdate: "",
      startdate: "",
      postingtype: 0,
      worktype: 0,
      workinghours: 0,
      workingdays: 0,
      additionalbenfits: [],
      specialneeds: [],
      ispublished: 0,
      unpublishingreason: 0,
      jobdescription: undefined,
    },
    shouldUnregister: false,
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
  } = postingmethods;

  const watchjobdescriptionfile = watch("jobdescription");
  const watchispublished = watch("ispublished");

  const onPostingSubmit = async ({
    rid,
    positionprofile,
    jobcode,
    sector,
    department,
    divison,
    city,
    openings,
    targetdate,
    startdate,
    postingtype,
    worktype,
    workinghours,
    workingdays,
    additionalbenfits,
    specialneeds,
    ispublished,
    unpublishingreason,
    jobdescription,
  }) => {
    let payload: PostingSaveDTO = {
      rid,
      positionprofile,
      jobcode,
      sector,
      department,
      divison,
      city,
      openings,
      targetdate: new Date(targetdate).toISOString().slice(0, 10),
      startdate,
      postingtype,
      worktype,
      workinghours,
      workingdays,
      additionalbenfits,
      specialneeds,
      ispublished,
      unpublishingreason,
      jobdescription,
      jobdescriptionfilename: "",
      jobdescriptionconverted: "",
    };

    if (
      jobdescription != undefined &&
      jobdescription != null &&
      jobdescription[0] != undefined
    ) {
      var uploadedfile = jobdescription[0];
      payload.jobdescriptionconverted = (await getBase64(
        uploadedfile,
      )) as string;
      payload.jobdescriptionfilename = uploadedfile.name.toLowerCase();
    } else {
      payload.jobdescriptionfilename = uploadedfilenameonly;
    }

    const { jobdescription: excludedprop, ...saveobject } = payload;

    const response = await fetch("/api/saveposting", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify(saveobject),
    });

    if (response.ok) {
      cogoToast.success(
        <Message
          title="Success"
          text={translations.t("savedsuccessfully")}
          type="success"
        />,
        {
          position: "bottom-center",
        },
      );
      return router.push("/vacancies");
    } else {
      return cogoToast.error(
        <Message title="Error" text={translations.t("error")} type="error" />,
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

  React.useEffect(() => {
    if (data != undefined && data.data != undefined) {
      const { data: vacanciesdefaultvalues } = data;

      setValue("additionalbenfits", vacanciesdefaultvalues.additionalbenfits);
      trigger("additionalbenfits");
      setValue("specialneeds", vacanciesdefaultvalues.specialneeds);
      trigger("specialneeds");
      setValue("jobcode", vacanciesdefaultvalues.jobcode);
      setValue("sector", vacanciesdefaultvalues.sector);
      setValue("department", vacanciesdefaultvalues.department);
      setValue("divison", vacanciesdefaultvalues.divison);
      setValue("city", vacanciesdefaultvalues.city);
      setValue("openings", vacanciesdefaultvalues.openings);
      setValue("targetdate", new Date(vacanciesdefaultvalues.targetdate));
      setValue("startdate", vacanciesdefaultvalues.startdate);
      setValue("postingtype", vacanciesdefaultvalues.postingtype);
      setValue("worktype", vacanciesdefaultvalues.worktype);
      setValue("workinghours", vacanciesdefaultvalues.workinghours);
      setValue("workingdays", vacanciesdefaultvalues.workingdays);

      //local react state for upload only
      setUploadedfilenameonly(vacanciesdefaultvalues.jobdescriptionfilename);
      try {
        setValue("positionprofile", vacanciesdefaultvalues.positionprofile);
        trigger("positionprofile");

        setValue("ispublished", vacanciesdefaultvalues.ispublished);

        setValue(
          "unpublishingreason",
          vacanciesdefaultvalues.unpublishingreason,
        );
      } catch (e) {
        console.log("check positionprofile assignment");
      }
    }
  }, [data]);

  const downloadfile = (filedata, filename) => {
    const linkSource = filedata;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = filename;
    downloadLink.click();
  };

  const ondownloadclick = () => {
    getjobdescriptionattachment(rid)
      .then(({ data }) => {
        if (!isEmpty(data.filename) && !isEmpty(data.filedata)) {
          downloadfile(data.filedata, data.filename);
        } else {
          return cogoToast.error(
            <Message
              title="Error"
              text={translations.t("filenotfound")}
              type="error"
            />,
            {
              position: "bottom-center",
            },
          );
        }
      })
      .catch(({ data }) => {
        return cogoToast.error(
          <Message title="Error" text={translations.t("error")} type="error" />,
          {
            position: "bottom-center",
          },
        );
      });
  };

  React.useEffect(() => {
    trigger("unpublishingreason");
  }, [watchispublished]);

  return (
    <React.Fragment>
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <FormProvider {...postingmethods}>
            <form onSubmit={handleSubmit(onPostingSubmit)}>
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
                        htmlFor="positionprofile"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("vacancytemplate")}
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />

                        <Controller
                          defaultValue={undefined}
                          id="positionprofile"
                          inputId="positionprofile"
                          instanceId="positionprofile"
                          name="positionprofile"
                          as={Select}
                          options={lookupsData?.data?.positionprofiles}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          isDisabled={
                            rid !== "" &&
                            rid !== process.env.NEXT_PUBLIC_RID_NEW
                          }
                          className="w-full rounded-none "
                          styles={useSelectStyles}
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.positionprofile?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="jobcode"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("jobcode")}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />
                        <input
                          disabled
                          name="jobcode"
                          id="jobcode"
                          ref={register}
                          className={classnames(
                            {
                              "rounded-r-md ": memoizedlocalestate === "en",
                            },
                            {
                              "rounded-l-md": memoizedlocalestate === "ae",
                            },

                            "inline-flex w-full border border-gray-300  py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100",
                          )}
                          placeholder="To be generated"
                        />
                      </div>
                      <p className="text-red-500">{errors.jobcode?.message}</p>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="postingtype"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("postingtype")}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />
                        <select
                          name="postingtype"
                          id="postingtype"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            {translations.t("select")}
                          </option>
                          {postingtypes &&
                            postingtypes.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {memoizedlocalestate === "en"
                                  ? val?.titleen
                                  : val?.titleae}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.postingtype?.message}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="sector"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("orgnizationsection")}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />
                        <select
                          name="sector"
                          id="sector"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            {translations.t("select")}
                          </option>
                          {orgnizationunits &&
                            orgnizationunits.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {memoizedlocalestate === "en"
                                  ? val?.titleen
                                  : val?.titleae}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">{errors.sector?.message}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="department"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("department")}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />
                        <select
                          name="department"
                          id="department"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            {translations.t("select")}
                          </option>
                          {departments &&
                            departments.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {memoizedlocalestate === "en"
                                  ? val?.titleen
                                  : val?.titleae}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.department?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="divison"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("divison")}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />
                        <select
                          name="divison"
                          id="divison"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            {translations.t("select")}
                          </option>
                          {divisons &&
                            divisons.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {memoizedlocalestate === "en"
                                  ? val?.titleen
                                  : val?.titleae}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">{errors.divison?.message}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="openings"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("openings")}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />
                        <input
                          name="openings"
                          id="openings"
                          ref={register}
                          className={classnames(
                            {
                              "rounded-r-md ": memoizedlocalestate === "en",
                            },
                            {
                              "rounded-l-md ": memoizedlocalestate === "ae",
                            },
                            "inline-flex w-full border border-gray-300  py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                          )}
                          placeholder={translations.t("enterdetails")}
                        />
                      </div>
                      <p className="text-red-500">{errors.openings?.message}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("city")}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />

                        <select
                          name="city"
                          id="city"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            {translations.t("select")}
                          </option>
                          {joblocations &&
                            joblocations.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {memoizedlocalestate === "en"
                                  ? val?.titleen
                                  : val?.titleae}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">{errors.city?.message}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="targetdate"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("targetdate")}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />

                        <Controller
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          name="targetdate"
                          id="targetdate"
                          control={control}
                          render={({ onChange, value }) => (
                            <DatePicker
                              dateFormat="yyyy-MM-dd"
                              selected={value}
                              onChange={onChange}
                              className={classnames(
                                {
                                  "rounded-r-md ": memoizedlocalestate === "en",
                                },
                                {
                                  "rounded-l-md ": memoizedlocalestate === "ae",
                                },
                                "inline-flex w-full border border-gray-300  py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                              )}
                            />
                          )}
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.targetdate?.message}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="worktype"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("worktype")}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />

                        <select
                          name="worktype"
                          id="worktype"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            {translations.t("select")}
                          </option>
                          {postingworktypes &&
                            postingworktypes.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {memoizedlocalestate === "en"
                                  ? val?.titleen
                                  : val?.titleae}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">{errors.worktype?.message}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="workinghours"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("workinghours")}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />

                        <select
                          name="workinghours"
                          id="workinghours"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            {translations.t("select")}
                          </option>
                          {postingworkhours &&
                            postingworkhours.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {memoizedlocalestate === "en"
                                  ? val?.titleen
                                  : val?.titleae}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.workinghours?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="workingdays"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("workingdays")}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />
                        <select
                          name="workingdays"
                          id="workingdays"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            {translations.t("select")}
                          </option>
                          {postingworkdays &&
                            postingworkdays.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {memoizedlocalestate === "en"
                                  ? val?.titleen
                                  : val?.titleae}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.workingdays?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="ispublished"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        {translations.t("ispublished")}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />
                        <select
                          name="ispublished"
                          id="ispublished"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            {translations.t("select")}
                          </option>
                          {yesnooptions &&
                            yesnooptions.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {memoizedlocalestate === "en"
                                  ? val?.titleen
                                  : val?.titleae}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.ispublished?.message}
                      </p>
                    </div>
                    {watchispublished == 2 && (
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="unpublishingreason"
                          className="block text-sm font-medium leading-5 text-gray-700"
                        >
                          {translations.t("unpublishingreason")}
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <FieldStarter locale={memoizedlocalestate} />
                          <select
                            name="unpublishingreason"
                            id="unpublishingreason"
                            ref={register}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                          >
                            <option value="0" className="text-gray-500 ">
                              {translations.t("select")}
                            </option>
                            {postingunpublishingreason &&
                              postingunpublishingreason.map((val, index) => (
                                <option
                                  key={index}
                                  value={val.value}
                                  className="text-gray-500 "
                                >
                                  {memoizedlocalestate === "en"
                                    ? val?.titleen
                                    : val?.titleae}
                                </option>
                              ))}
                          </select>
                        </div>
                        <p className="text-red-500">
                          {errors.unpublishingreason?.message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="specialneeds"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      {translations.t("specialneeds")}
                    </label>
                    <div className="rounded-md shadow-sm">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />
                        <Controller
                          defaultValue={getValues("specialneeds")}
                          isMulti
                          id="specialneeds"
                          inputId="specialneeds"
                          instanceId="specialneeds"
                          name="specialneeds"
                          as={Select}
                          options={specialneeds}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          className="w-full rounded-none "
                          styles={useSelectStyles}
                        />
                      </div>
                    </div>
                    <p className="text-red-500">
                      {errors.specialneeds?.message}
                    </p>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="additionalbenfits"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      {translations.t("additionalbenfits")}
                    </label>
                    <div className="rounded-md shadow-sm">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <FieldStarter locale={memoizedlocalestate} />
                        <Controller
                          defaultValue={getValues("additionalbenfits")}
                          isMulti
                          id="additionalbenfits"
                          inputId="additionalbenfits"
                          instanceId="additionalbenfits"
                          name="additionalbenfits"
                          as={Select}
                          options={jobbenefits}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          className="w-full rounded-none "
                          styles={useSelectStyles}
                        />
                      </div>
                    </div>
                    <p className="text-red-500">
                      {errors.additionalbenfits?.message}
                    </p>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="jobdescription"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      {translations.t("jobattachement")}
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
                            setValue("jobdescription", undefined);
                            clearErrors("jobdescription");
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
                    {!isUndefined(watchjobdescriptionfile) &&
                      !isEmpty(watchjobdescriptionfile) && (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                          {!isUndefined(watchjobdescriptionfile) &&
                          !isEmpty(watchjobdescriptionfile)
                            ? watchjobdescriptionfile[0].name
                            : "Not selected"}
                          <button
                            onClick={(e) => {
                              setValue("jobdescription", undefined);
                              clearErrors("jobdescription");
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
                              id="jobdescription"
                              name="jobdescription"
                              type="file"
                              ref={register}
                              className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="select file"
                              aria-label="select file"
                              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            />
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {translations.t("alloweddoctypes")}
                          </p>
                        </div>
                      </div>
                      <p className="text-red-500">
                        {errors.jobdescription?.message}
                      </p>
                    </div>
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
                      {translations.t("save")}
                    </button>
                    <button
                      className=" inline-flex justify-center py-2 px-4 mx-2 border border-transparent text-sm opacity-100 text-white leading-5 font-medium rounded-md  bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700 transition duration-150 ease-in-out"
                      type="button"
                      onClick={() =>
                        reset({
                          rid: rid,
                          jobdescription: "",
                          additionalbenfits: [],
                        })
                      }
                    >
                      {translations.t("clear")}
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

export default JobPostingForm;
