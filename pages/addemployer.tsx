import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import Footer from "@components/Footer";
import { WrapperSelectController } from "@components/FormSelect";
import Select from "react-select";
import produce from "immer";
import classnames from "classnames";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import useEncodehtml from "../hooks/useEncodehtml";
import { useRouter } from "next/router";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Message from "@components/Message";
import Spinner from "@components/Spinner";
import isEmpty from "lodash/isEmpty";
import isUndefined from "lodash/isUndefined";
import mothercompanies from "../data/mothercompanies";
import tradelicenseauthority from "../data/tradelicenseauthority";
import sectors from "../data/sectors";
import industry from "../data/industry";
import cities from "../data/cities";

type OptionsDTO = {
  id: number;
  value: number;
  label: string;
  titleen: string;
  titleae: string;
};
const entities = [
  {
    id: 1,
    value: 1,
    label: "some title",
    titleen: "Mother 1",
    titleae: "Mother 1",
  },
  {
    id: 2,
    value: 2,
    label: "some title 2",
    titleen: "Mother 2",
    titleae: "Mother 2",
  },
];

interface Props {
  userAgent?: string;
}

type Step1DTO = {
  nameen: string;
  nameae: string;
  mothercompany: OptionsDTO;
  companysize: number;
  tradelicense: string;
  tadelicenseauthority: OptionsDTO;
  sector: OptionsDTO;
  industry: OptionsDTO;
  city: OptionsDTO;
  website: string;
  about: string;
};

type Step2DTO = {
  fullname: string;
  emailaddress: string;
  mobilenumber: string;
  phonenumber: string;
  username: string;
  password: string;
};

type Step3DTO = {
  tradelicensefile: object;
  companylogo: object;
  isagreed: boolean;
};

type RegistrationDTO = {
  main: Step1DTO;
  contact: Step2DTO;
  attachement: Step3DTO;
};

type RegistrationsaveDTO = {
  nameen: string;
  nameae: string;
  mothercompanyid: number;
  companysize: number;
  tradelicense: string;
  tadelicenseauthorityid: number;
  sectorid: number;
  industryid: number;
  cityid: number;
  website: string;
  about: string;
  fullname: string;
  emailaddress: string;
  mobilenumber: string;
  phonenumber: string;
  username: string;
  password: string;
  tradelicensefile: string;
  companylogo: string;
};

const AddEmployer: NextPage<Props> = ({ userAgent }) => {
  const selectStyles = {
    control: (styles) => ({ ...styles, borderRadius: "0" }),
  };
  const router = useRouter();
  const logoinputcontrol = React.useRef(null);
  const tradelicenseinputcontrol = React.useRef(null);

  const [currentstep, setCurrentstep] = React.useState(1);
  const [
    registrationdetails,
    setRegistrationdetails,
  ] = React.useState<RegistrationDTO>({
    main: undefined,
    contact: undefined,
    attachement: undefined,
  });

  const [isloading, setIsloading] = React.useState<boolean>(false);

  //Step 1
  const step1schema = yup.object().shape({
    nameen: yup.string().required("company name in english is mandatory"),
    nameae: yup.string().required("company name in arabic is mandatory"),
    mothercompany: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("mother company is mandatory"),
    companysize: yup
      .number("company size must be number")
      .positive()
      .integer()

      .required("company size is mandatory"),
    tradelicense: yup.string().required("trade license is mandatory"),
    tadelicenseauthority: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("trade license authority is mandatory"),
    sector: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("sector is mandatory"),
    industry: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("industry is mandatory"),
    city: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("city is mandatory"),
    website: yup.string().required("website is mandatory"),
    about: yup
      .string()
      .min(17, "minimum 500 characters")
      .max(5007, "maximum 5000 character")
      .required("About is mandatory"),
  });

  const step1methods = useForm<Step1DTO>({
    mode: "onChange",
    resolver: yupResolver(step1schema),
  });

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

  const {
    register: step1register,
    handleSubmit: step1handleSubmit,
    formState: step1formState,
    errors: step1errors,
    setValue: step1setValue,
    setError: step1setError,
    clearErrors: step1clearErrors,
    control: step1Control,
    getValues: step1getValues,
    trigger: step1trigger,
  } = step1methods;

  const onStep1Submit = async ({
    nameen,
    nameae,
    mothercompany,
    companysize,
    tradelicense,
    tadelicenseauthority,
    sector,
    industry,
    city,
    website,
    about,
  }) => {
    setRegistrationdetails(
      produce(registrationdetails, (draftState) => {
        draftState.main = {
          ...{
            ...registrationdetails.main,
            nameen,
            nameae,
            mothercompany,
            companysize,
            tradelicense,
            tadelicenseauthority,
            sector,
            industry,
            city,
            website,
            about: escapeHtml(about),
          },
        };
      }),
    );

    setCurrentstep(2);
  };

  //step 2:
  const step2schema = yup.object().shape({
    fullname: yup.string().required("Full name is mandatory"),
    emailaddress: yup.string().email().required("Email is mandatory"),
    mobilenumber: yup
      .number("Mobile number must be number")
      .positive()
      .integer()
      .required("Mobile number is mandatory"),
    phonenumber: yup
      .number("Phone number must be number")
      .positive()
      .integer()
      .required("Phone number is mandatory"),
    username: yup
      .string()
      .min(8, "minimum 8 characters")
      .max(16, "maximum 5000 character")
      .required("Username is mandatory"),
    password: yup
      .string()
      .min(8, "minimum 8 characters")
      .matches(
        /^.*(?=.{10,})(?=.*[a-z])(?=.*[A-Z]).*$/,
        "Password can only contain Latin letters.",
      )
      .required("Password is mandatory"),
  });

  const step2methods = useForm<Step2DTO>({
    mode: "onChange",
    resolver: yupResolver(step2schema),
  });

  const {
    register: step2register,
    handleSubmit: step2handleSubmit,
    formState: step2formState,
    errors: step2errors,
    setValue: step2setValue,
    setError: step2setError,
    clearErrors: step2clearErrors,
    control: step2Control,
    getValues: step2getValues,
    trigger: step2trigger,
  } = step2methods;

  const onStep2Submit = async ({
    fullname,
    emailaddress,
    mobilenumber,
    phonenumber,
    username,
    password,
  }) => {
    setRegistrationdetails(
      produce(registrationdetails, (draftState) => {
        draftState.contact = {
          ...{
            ...registrationdetails.main,
            fullname,
            emailaddress,
            mobilenumber,
            phonenumber,
            username,
            password,
          },
        };
      }),
    );
    setCurrentstep(3);
  };

  //step 3
  const step3schema = yup.object().shape({
    tradelicensefile: yup
      .mixed()
      .required("Trade license is mandatory")
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
      })
      .test("exist", "Trade license is required", (value) => !isEmpty(value)),

    companylogo: yup
      .mixed()
      .required("Company Logo is mandatory")
      .nullable()
      .test("fileSize", "This file is too large", (value) => {
        if (!value.length) return true;
        else return value && value[0].size <= 1000000;
      })
      .test("type", "only PNG, JPEG , JPG supported", (value) => {
        if (isUndefined(value[0])) return true;
        return (
          value &&
          (value[0].type === "image/jpeg" ||
            value[0].type === "image/png" ||
            value[0].type === "image/jpg")
        );
      })
      .test("exist", "Company logo is required", (value) => !isEmpty(value)),
    isagreed: yup.boolean().required("Accept terms and conditions"),
  });

  const step3methods = useForm<Step3DTO>({
    mode: "onChange",
    resolver: yupResolver(step3schema),
  });

  const {
    register: step3register,
    handleSubmit: step3handleSubmit,
    formState: step3formState,
    errors: step3errors,
    setValue: step3setValue,
    setError: step3setError,
    clearErrors: step3clearErrors,
    control: step3Control,
    getValues: step3getValues,
    watch: step3watch,
  } = step3methods;

  const watchisagreed = step3watch("isagreed");
  const watchtradelicensefile = step3watch("tradelicensefile");
  const watchcompanylogo = step3watch("companylogo");

  const onStep3Submit = async (formparam: Step3DTO) => {
    const { tradelicensefile, companylogo, isagreed } = formparam;

    const payload = produce(registrationdetails, (draftState) => {
      draftState.attachement = {
        ...{
          ...registrationdetails.main,
          ...registrationdetails.contact,
          tradelicensefile,
          companylogo,
          isagreed,
        },
      };
    });
    setRegistrationdetails(payload);

    const tradelicenseconverted = await getBase64(tradelicensefile[0]);
    const componeylogoconverted = await getBase64(tradelicensefile[0]);

    const registrationsave: RegistrationsaveDTO = {
      nameen: payload.main.nameen,
      nameae: payload.main.nameae,
      mothercompanyid: payload.main.mothercompany?.value,
      companysize: payload.main.companysize,
      tradelicense: payload.main.tradelicense,
      tadelicenseauthorityid: payload.main.tadelicenseauthority?.value,
      sectorid: payload.main.sector?.value,
      industryid: payload.main.industry?.value,
      cityid: payload.main.city?.value,
      website: payload.main.website,
      about: payload.main.about,
      fullname: payload.contact.fullname,
      emailaddress: payload.contact.emailaddress,
      mobilenumber: payload.contact.mobilenumber,
      phonenumber: payload.contact.phonenumber,
      username: payload.contact.username,
      password: payload.contact.password,
      tradelicensefile: tradelicenseconverted as string,
      companylogo: componeylogoconverted as string,
    };

    const response = await fetch("/api/saveregistration", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify(registrationsave),
    });

    if (response.ok) {
      cogoToast.error(
        <Message
          title="Registration"
          text="Account registered successfully"
          type="success"
        />,
        {
          position: "bottom-center",
        },
      );
      return router.push("/SignIn");
    } else {
      return cogoToast.error(
        <Message title="Registration" text="invalid input" type="error" />,
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Head>
        <title>HRA Registration</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <React.Fragment>
        {isloading && <Spinner />}
        <div
          className={classnames("content-wrapper", { "opacity-25": isloading })}
        >
          <div className="bg-gray-800 pb-32 ">
            <nav className="bg-gray-800 pt-3">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 md:h-16 w-32  md:w-56"
                          src="/images/logowhite.png"
                          alt="HRA logo"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Link href="/SignIn">
                        <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                          Sign in
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <header className="py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl leading-9 font-bold text-white">
                  Employer Registration
                </h1>
              </div>
            </header>
          </div>
          <main className="-mt-32 flex-1">
            <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow ">
                <nav className="mx-auto max-w-screen-xl">
                  <ul className="rounded-md overflow-hidden lg:flex ">
                    <li className="relative overflow-hidden lg:flex-1">
                      <div className="border border-gray-200 overflow-hidden border-b-0 rounded-t-md lg:border-0">
                        <a
                          className="group text-left"
                          onClick={(e) => setCurrentstep(1)}
                        >
                          <div
                            className={classnames(
                              "absolute top-0 left-0 w-1 h-full bg-transparent  group-hover:bg-gray-200 group-focus:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto",
                              {
                                "bg-indigo-600": currentstep === 1,
                              },
                            )}
                          ></div>
                          <div className="px-6 py-5 flex items-start text-sm leading-5 font-medium space-x-4">
                            <div className="flex-shrink-0">
                              <div
                                className={classnames(
                                  "w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full",
                                  { hidden: currentstep === 1 },
                                )}
                              >
                                <p className="text-indigo-600">01</p>
                              </div>
                              <div
                                className={classnames(
                                  "w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full",
                                  {
                                    hidden: currentstep != 1,
                                  },
                                )}
                              >
                                <svg
                                  className="w-6 h-6 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="mt-0.5 min-w-0">
                              <h3 className="text-xs leading-4 font-semibold uppercase tracking-wide">
                                Entity Details
                              </h3>
                              <p className="text-sm leading-5 font-normal text-gray-500">
                                Basic entity details
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </li>

                    <li className="relative overflow-hidden lg:flex-1">
                      <div className="border border-gray-200 overflow-hidden border-b-0 rounded-t-md lg:border-0">
                        <a
                          className="group text-left"
                          onClick={(e) => setCurrentstep(2)}
                        >
                          <div
                            className={classnames(
                              "absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 group-focus:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto",
                              {
                                "bg-indigo-600": currentstep === 2,
                              },
                            )}
                          ></div>
                          <div className="px-6 py-5 flex items-start text-sm leading-5 font-medium space-x-4 lg:pl-9">
                            <div className="flex-shrink-0">
                              <div
                                className={classnames(
                                  "w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full",
                                  { hidden: currentstep === 2 },
                                )}
                              >
                                <p className="text-indigo-600">02</p>
                              </div>
                              <div
                                className={classnames(
                                  "w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full",
                                  {
                                    hidden: currentstep != 2,
                                  },
                                )}
                              >
                                <svg
                                  className="w-6 h-6 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="mt-0.5 min-w-0">
                              <h3 className="text-xs leading-4 font-semibold text-indigo-600 uppercase tracking-wide">
                                Primary Contact Details
                              </h3>
                              <p className="text-sm leading-5 font-normal text-gray-500">
                                Provide HR Manager Details
                              </p>
                            </div>
                          </div>

                          <div className="hidden absolute top-0 left-0 w-3 inset-0 lg:block">
                            <svg
                              className="h-full w-full text-gray-300"
                              viewBox="0 0 12 82"
                              fill="none"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M0.5 0V31L10.5 41L0.5 51V82"
                                stroke="currentcolor"
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </li>

                    <li className="relative overflow-hidden lg:flex-1">
                      <div className="border border-gray-200 overflow-hidden border-t-0 rounded-b-md lg:border-0">
                        <a
                          className="group text-left"
                          onClick={(e) => setCurrentstep(3)}
                        >
                          <div
                            className={classnames(
                              "absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 group-focus:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto",
                              {
                                "bg-indigo-600": currentstep === 3,
                              },
                            )}
                          ></div>
                          <div className="px-6 py-5 flex items-start text-sm leading-5 font-medium space-x-4 lg:pl-9">
                            <div className="flex-shrink-0">
                              <div
                                className={classnames(
                                  "w-10 h-10 flex items-center justify-center border-2 border-indigo-600  rounded-full",
                                  {
                                    hidden: currentstep === 3,
                                  },
                                )}
                              >
                                <p className="text-indigo-600">03</p>
                              </div>
                              <div
                                className={classnames(
                                  "w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full",
                                  {
                                    hidden: currentstep != 3,
                                  },
                                )}
                              >
                                <svg
                                  className="w-6 h-6 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="mt-0.5 min-w-0">
                              <h3 className="text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wide">
                                Attachments
                              </h3>
                              <p className="text-sm leading-5 font-normal text-gray-500">
                                Provide needed documents for approval
                              </p>
                            </div>
                          </div>
                        </a>

                        <div className="hidden absolute top-0 left-0 w-3 inset-0 lg:block">
                          <svg
                            className="h-full w-full text-gray-300"
                            viewBox="0 0 12 82"
                            fill="none"
                            preserveAspectRatio="none"
                          >
                            <path
                              d="M0.5 0V31L10.5 41L0.5 51V82"
                              stroke="currentcolor"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </div>
                      </div>
                    </li>
                  </ul>
                </nav>
                <div
                  className={classnames("bg-gray-100", {
                    hidden: currentstep != 1,
                  })}
                >
                  <div className="md:grid md:grid-cols-1 md:gap-6">
                    <div className="col-span-1 px-6 pt-6">
                      <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Employer profile
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-gray-600">
                          This information will be displayed publicly so be
                          careful what you share.
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <FormProvider {...step1methods}>
                          <form onSubmit={step1handleSubmit(onStep1Submit)}>
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="nameen"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Company Name(In English)
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <input
                                      name="nameen"
                                      id="nameen"
                                      ref={step1register}
                                      className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      placeholder="Enter english title of company"
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step1errors.nameen?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="nameae"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Company Name(In Arabic)
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <input
                                      name="nameae"
                                      id="nameae"
                                      ref={step1register}
                                      className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      placeholder="Enter arabic title of company"
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step1errors.nameae?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="mothercompany"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Mother company
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <WrapperSelectController
                                      className=""
                                      defaultValue="0"
                                      control={step1Control}
                                      name="mothercompany"
                                      id="mothercompany"
                                      inputId="mothercompany"
                                      instanceId="mothercompany"
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
                                          className="w-full rounded-none shadow-none "
                                          options={mothercompanies}
                                          styles={selectStyles}
                                        />
                                      )}
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step1errors.mothercompany &&
                                      step1errors.mothercompany?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="companysize"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Company Size
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <input
                                      id="companysize"
                                      name="companysize"
                                      ref={step1register}
                                      className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      placeholder="Enter total company size"
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step1errors.companysize?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="tradelicense"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Trade License Number
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <input
                                      id="tradelicense"
                                      name="tradelicense"
                                      ref={step1register}
                                      className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      placeholder="Enter trade license number"
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step1errors.tradelicense?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="tadelicenseauthority"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Tade License Issuing Authority
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <WrapperSelectController
                                      className=""
                                      defaultValue="0"
                                      control={step1Control}
                                      name="tadelicenseauthority"
                                      id="tadelicenseauthority"
                                      inputId="tadelicenseauthority"
                                      instanceId="tadelicenseauthority"
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
                                          options={tradelicenseauthority}
                                          styles={selectStyles}
                                        />
                                      )}
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step1errors.tadelicenseauthority &&
                                      step1errors.tadelicenseauthority?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="sector"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Sector
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <WrapperSelectController
                                      className=""
                                      defaultValue="0"
                                      control={step1Control}
                                      name="sector"
                                      id="sector"
                                      inputId="sector"
                                      instanceId="sector"
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
                                          options={sectors}
                                          styles={selectStyles}
                                        />
                                      )}
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step1errors.sector &&
                                      step1errors.sector?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="industry"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Industry
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <WrapperSelectController
                                      className=""
                                      defaultValue="0"
                                      control={step1Control}
                                      name="industry"
                                      id="industry"
                                      inputId="industry"
                                      instanceId="industry"
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
                                          options={industry}
                                          styles={selectStyles}
                                        />
                                      )}
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step1errors.industry &&
                                      step1errors.industry?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    City
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <WrapperSelectController
                                      className=""
                                      defaultValue="0"
                                      control={step1Control}
                                      name="city"
                                      id="city"
                                      inputId="city"
                                      instanceId="city"
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
                                          options={cities}
                                          styles={selectStyles}
                                        />
                                      )}
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step1errors.city &&
                                      step1errors.city?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="website"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Website
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <input
                                      id="website"
                                      name="website"
                                      ref={step1register}
                                      className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      placeholder="Enter website address"
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step1errors.website?.message}
                                  </p>
                                </div>

                                <div className="mt-6 col-span-6 z-0">
                                  <label
                                    htmlFor="about"
                                    className="block text-sm leading-5 font-medium text-gray-700"
                                  >
                                    About / Commercial Activities
                                  </label>
                                  <div className="rounded-md shadow-sm">
                                    <Controller
                                      defaultValue=""
                                      className="form-input"
                                      name="about"
                                      as={
                                        <SunEditor
                                          setOptions={{
                                            height: 200,
                                            buttonList: [
                                              ["font", "fontColor", "fontSize"],
                                              [
                                                "bold",
                                                "underline",
                                                "italic",
                                                "strike",
                                              ],
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
                                      control={step1Control}
                                      rules={{ required: true }}
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step1errors.about?.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                              <span className="inline-flex rounded-md shadow-sm">
                                <button
                                  type="submit"
                                  className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                >
                                  Next
                                </button>
                              </span>
                            </div>
                          </form>
                        </FormProvider>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={classnames("bg-gray-100 flex-1 ", {
                    hidden: currentstep != 2,
                  })}
                >
                  <div className="md:grid md:grid-cols-1 md:gap-6">
                    <div className="col-span-1 px-6 pt-6">
                      <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Account Details
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-gray-600">
                          HR Manager account details who shall be point of
                          contact with HRA
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <FormProvider {...step2methods}>
                          <form onSubmit={step2handleSubmit(onStep2Submit)}>
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="fullname"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Full Name
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <input
                                      name="fullname"
                                      id="fullname"
                                      ref={step2register}
                                      className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      placeholder="Enter primary contact full name"
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step2errors.fullname?.message}
                                  </p>
                                </div>
                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="emailaddress"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Email Address
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <input
                                      name="emailaddress"
                                      id="emailaddress"
                                      ref={step2register}
                                      className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      placeholder="Enter email address"
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step2errors.emailaddress?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="mobilenumber"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Mobile Number
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <input
                                      name="mobilenumber"
                                      id="mobilenumber"
                                      ref={step2register}
                                      className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      placeholder="Enter mobile number"
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step2errors.mobilenumber?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="phonenumber"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Phone Number
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <input
                                      name="phonenumber"
                                      id="phonenumber"
                                      ref={step2register}
                                      className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      placeholder="Enter Phone number"
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step2errors.phonenumber?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="username"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    User Name
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <input
                                      name="username"
                                      id="username"
                                      ref={step2register}
                                      className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      placeholder="Enter Username"
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step2errors.username?.message}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3 ">
                                  <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Password
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                                    <input
                                      name="password"
                                      type="password"
                                      id="password"
                                      ref={step2register}
                                      className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                      placeholder="Enter Password"
                                    />
                                  </div>
                                  <p className="text-red-500">
                                    {step2errors.password?.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                              <span className="inline-flex rounded-md shadow-sm">
                                <button
                                  type="submit"
                                  className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                >
                                  Next
                                </button>
                              </span>
                            </div>
                          </form>
                        </FormProvider>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={classnames("bg-gray-100 flex-1 ", {
                    hidden: currentstep != 3,
                  })}
                >
                  <div className="md:grid md:grid-cols-1 md:gap-6">
                    <div className="col-span-1 px-6 pt-6">
                      <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Attachment details
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-gray-600">
                          This information will be displayed publicly so be
                          careful what you share.
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <FormProvider {...step3methods}>
                          <form onSubmit={step3handleSubmit(onStep3Submit)}>
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="">
                                <label className="block text-sm leading-5 font-medium text-gray-700">
                                  Trade License
                                </label>
                                {!isUndefined(watchtradelicensefile) &&
                                  !isEmpty(watchtradelicensefile) && (
                                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                                      {!isUndefined(watchtradelicensefile) &&
                                      !isEmpty(watchtradelicensefile)
                                        ? watchtradelicensefile[0].name
                                        : "Not selected"}
                                      <button
                                        onClick={(e) => {
                                          step3setValue(
                                            "tradelicensefile",
                                            undefined,
                                          );
                                          step3clearErrors("tradelicensefile");
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

                                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                  <div className="text-center">
                                    <svg
                                      className="mx-auto h-12 w-12 text-gray-400"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 48 48"
                                    >
                                      <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <p className="text-sm text-gray-600">
                                      <input
                                        id="tradelicensefile"
                                        name="tradelicensefile"
                                        type="file"
                                        ref={step3register}
                                        className="form-input text-sm py-1 rounded-none"
                                        placeholder="select file"
                                        aria-label="select file"
                                        accept="image/jpeg,image/jpg,image/png,application/pdf"
                                      />
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                      PNG , JPG, JPEG up to 3MB
                                    </p>
                                  </div>
                                </div>
                                <p className="text-red-500">
                                  {step3errors.tradelicensefile?.message}
                                </p>
                              </div>
                              <div className="mt-3">
                                <label className="block text-sm leading-5 font-medium text-gray-700">
                                  Company Logo
                                </label>
                                {!isUndefined(watchcompanylogo) &&
                                  !isEmpty(watchcompanylogo) && (
                                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                                      {!isUndefined(watchcompanylogo) &&
                                      !isEmpty(watchcompanylogo)
                                        ? watchcompanylogo[0].name
                                        : "Not selected"}
                                      <button
                                        onClick={(e) => {
                                          step3setValue(
                                            "companylogo",
                                            undefined,
                                          );
                                          step3clearErrors("companylogo");
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
                                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                  <div className="text-center">
                                    <svg
                                      className="mx-auto h-12 w-12 text-gray-400"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 48 48"
                                    >
                                      <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <p className="text-sm text-gray-600">
                                      <input
                                        id="companylogo"
                                        name="companylogo"
                                        type="file"
                                        ref={step3register}
                                        className="form-input text-sm py-1 rounded-none"
                                        placeholder="select file"
                                        aria-label="select file"
                                        accept="image/jpeg,image/jpg,image/png"
                                      />
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                      PNG , JPG, JPEG up to 1MB
                                    </p>
                                  </div>
                                </div>
                                <p className="text-red-500">
                                  {step3errors.companylogo?.message}
                                </p>
                              </div>
                              <div className="mt-3 flex justify-start items-start">
                                <label className="inline-flex mt-1">
                                  <input
                                    type="checkbox"
                                    className=" h-4 w-4 text-gray-600"
                                    name="isagreed"
                                    id="isagreed"
                                    ref={step3register}
                                  />
                                </label>
                                <p className="mx-2">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Quibusdam cumque magni
                                  quaerat architecto corrupti possimus aperiam
                                  vitae temporibus neque numquam maiores, eius
                                  vero in ullam sed reprehenderit odio?
                                  Voluptatum, perferendis.
                                </p>
                              </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                              <span className="inline-flex rounded-md shadow-sm">
                                <button
                                  type="submit"
                                  disabled={
                                    !watchisagreed ||
                                    !step1formState.isValid ||
                                    !step2formState.isValid ||
                                    !step3formState.isValid
                                  }
                                  className={classnames(
                                    " inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md  bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out",
                                    {
                                      "opacity-25 text-gray-300":
                                        !watchisagreed ||
                                        !step1formState.isValid ||
                                        !step2formState.isValid ||
                                        !step3formState.isValid,
                                    },
                                    {
                                      "opacity-100 text-white":
                                        watchisagreed &&
                                        step1formState.isValid &&
                                        step2formState.isValid &&
                                        step3formState.isValid,
                                    },
                                  )}
                                >
                                  Save
                                </button>
                              </span>
                            </div>
                          </form>
                        </FormProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </React.Fragment>
    </div>
  );
};

export default AddEmployer;
