import React, { useState } from "react";
import { useRouter } from "next/router";
import { getLayout } from "@components/Layouts/BlankLayout";
import { Box } from "theme-ui";
import Link from "next/link";
import Footer from "@components/Footer";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import Message from "@components/Message";
import FormInput from "@components/FormInput";
import FormCustom from "@components/FormCustom";
import HRAButton from "@components/HRAButton";

type RegistrationDTO = {
  nameen: string;
  nameae: string;
  mothercompanynameid: number;
  mothercompanyname: string;
  companysize: number;
  tradelicense: string;
  issuingauthorityid: string;
  sectorid: number;
  industryid: number;
  cityid: number;
  website: string;
  phone: string;
  about: string;
  fullname: string;
  emailaddress: string;
  username: string;
  password: string;
  mobilenumber: string;
  phonenumber: string;
  tradelicensefile: string;
  companylogo: string;
};

const entities = [
  {
    id: 1,
    titleen: "Mother 1",
    titleae: "Mother 1",
  },
  {
    id: 2,
    titleen: "Mother 2",
    titleae: "Mother 2",
  },
];

const schema = yup.object().shape({
  nameen: yup.string().required("company name in english is mandatory"),
  nameae: yup.string().required("company name in arabic is mandatory"),
});

const Registration = () => {
  const router = useRouter();
  const [currentstep, setCurrentstep] = useState(1);

  const { register, handleSubmit, formState, errors } = useForm<
    RegistrationDTO
  >({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ nameen, nameae }) => {
    console.log(nameae, nameen);

    const response = await fetch("/api/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({ nameen, nameae }),
    });

    if (response.ok) {
      return router.push("/");
    } else {
      return cogoToast.error(
        <Message title="login" text="invalid input" type="error" />,
        {
          position: "bottom-center",
        },
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-gray-800 pb-32">
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
            <FormCustom onSubmit={handleSubmit(onSubmit)}>
              <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
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
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3 ">
                            <label
                              htmlFor="entityname_en"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Company Name(In English)
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                              <FormInput
                                register={register}
                                name="nameen"
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="Human Resources Authority"
                              />
                            </div>
                            <p className="text-red-500">
                              {errors.nameen?.message}
                            </p>
                          </div>

                          <div className="col-span-6 sm:col-span-3 ">
                            <label
                              htmlFor="entityname_en"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Company Name(In Arabic)
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                              <FormInput
                                name="nameae"
                                register={register}
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="Human Resources Authority Arabic"
                              />
                            </div>
                            <p className="text-red-500">
                              {errors.nameae?.message}
                            </p>
                          </div>
                          <div className="col-span-6 sm:col-span-3 ">
                            <label
                              htmlFor="entityname_en"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Mother Company Name
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                              <input
                                id="entityname_en"
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="Human Resources Authority Arabic"
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
                                Arabic mother company name is prefered!!
                              </span>
                            </p>
                          </div>
                          <div className="col-span-6 sm:col-span-3 ">
                            <label
                              htmlFor="entityname_en"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Company Size
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                              <input
                                id="entityname_en"
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="100"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-3 ">
                            <label
                              htmlFor="entityname_en"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Trade License Number
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                              <input
                                id="entityname_en"
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="C1n83840"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Tade License Issuing Authority
                            </label>
                            <select
                              id="country"
                              className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            >
                              <option>DED</option>
                              <option>Dewa</option>
                              <option>From Sharjha</option>
                            </select>
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Sector
                            </label>
                            <select
                              id="country"
                              className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            >
                              <option>Local Government</option>
                              <option>Semi-Government</option>
                              <option>Federal Goverment</option>
                              <option>Private</option>
                            </select>
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Industry
                            </label>
                            <select
                              id="country"
                              className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            >
                              <option>Agriculture</option>
                              <option>Adminstration</option>
                              <option>Tade</option>
                              <option>Business</option>
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

                          <div className="col-span-6 sm:col-span-3 ">
                            <label
                              htmlFor="entityname_en"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Website
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                              <input
                                id="entityname_en"
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="www.hra.gov.ae"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <label
                            htmlFor="about"
                            className="block text-sm leading-5 font-medium text-gray-700"
                          >
                            About / Commercial Activities
                          </label>
                          <div className="rounded-md shadow-sm">
                            <textarea
                              id="about"
                              rows="5"
                              className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              placeholder="you@example.com"
                            ></textarea>
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Brief description for your profile. URLs are
                            hyperlinked.
                          </p>
                        </div>
                      </div>
                      <p>{JSON.stringify(formState, null, 2)}</p>
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
                        HR Manager account details who shall be point of contact
                        with HRA
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3 ">
                            <label
                              htmlFor="entityname_en"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Full Name
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                              <input
                                id="entityname_en"
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="Human Resources Authority"
                              />
                            </div>
                          </div>

                          <div className="col-span-6 sm:col-span-3 ">
                            <label
                              htmlFor="entityname_en"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Email Address
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                              <input
                                id="entityname_en"
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="Human Resources Authority Arabic"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-3 ">
                            <label
                              htmlFor="entityname_en"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Mobile Number
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                              <input
                                id="entityname_en"
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="Human Resources Authority"
                              />
                            </div>
                          </div>

                          <div className="col-span-6 sm:col-span-3 ">
                            <label
                              htmlFor="entityname_en"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Phone number
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                              <input
                                id="entityname_en"
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="Human Resources Authority Arabic"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-3 ">
                            <label
                              htmlFor="entityname_en"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              UserName
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                              <input
                                id="entityname_en"
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="Human Resources Authority Arabic"
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
                                Use only english letters
                              </span>
                            </p>
                          </div>
                          <div className="col-span-6 sm:col-span-3 ">
                            <label
                              htmlFor="entityname_en"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Password
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                              <input
                                id="entityname_en"
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                placeholder="100"
                              />
                            </div>
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
                              <span className="inline-block px-2">
                                Minimum 8 character long with one special
                                character, one captial letter & one number
                              </span>
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
                            Save
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={classnames("bg-gray-100", {
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
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="">
                          <label className="block text-sm leading-5 font-medium text-gray-700">
                            Trade License
                          </label>
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
                              <p className="mt-1 text-sm text-gray-600">
                                <button className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                                  Upload a file
                                </button>
                                or drag and drop
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <label className="block text-sm leading-5 font-medium text-gray-700">
                            Company Logo
                          </label>
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
                              <p className="mt-1 text-sm text-gray-600">
                                <button className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                                  Upload a file
                                </button>
                                or drag and drop
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <span className="inline-flex rounded-md shadow-sm">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                          >
                            Save
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormCustom>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

Registration.getLayout = getLayout;

export default Registration;
