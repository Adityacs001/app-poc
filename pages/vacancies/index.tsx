/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import Head from "next/head";
import classnames from "classnames";
import { jsx } from "theme-ui";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import { Transition } from "@headlessui/react";
import MainHeader from "@components/MainHeader";
import SubHeader from "@components/SubHeader";
import { useRouter } from "next/router";
import withSession from "lib/session";
import NotificationNav from "@components/NotificationNav";
import { useQuery } from "react-query";
import parse from "html-react-parser";
import unescape from "lodash/unescape";
import cogoToast from "cogo-toast";
import Message from "@components/Message";
import isEmpty from "lodash/isEmpty";
import { CloseVacancyDTO } from "../../lib/commontypes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import jobclosingreason from "../../data/jobclosingreason";

const getvacancylist = async (key: string) => {
  const response = await fetch(`/api/getvacancylist`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const getvacancydetails = async (key: string, rid: string) => {
  const response = await fetch(`/api/getvacancydetails?rid=${rid}`, {
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

const Index = ({ user }) => {
  const router = useRouter();
  const [selectedrow, setSelectedrow] = React.useState(0);
  const [showdetail, setShowdetail] = React.useState(false);
  const [detailrid, setDetailrid] = React.useState();
  const [showclose, setShowclose] = React.useState(false);
  const [closingvacancydetail, setClosingvacancydetail] = React.useState<any>();

  const schema = yup.object().shape({
    reasonid: yup
      .number()
      .min(1, "reason is mandatory")
      .required("reason is mandatory"),
    comment: yup.string().required("comment is mandatory"),
  });

  const {
    register,
    handleSubmit,
    formState,
    errors,
    reset,
  } = useForm<CloseVacancyDTO>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["getvacancylist"],
    getvacancylist,
    {
      enabled: !!user,
      refetchOnWindowFocus: true,
    },
  );

  const {
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    data: vacancydata,
    error: vacancyerror,
  } = useQuery(["getvacancydetails", detailrid], getvacancydetails, {
    enabled: !!user && detailrid != undefined && detailrid != "",
    refetchOnWindowFocus: false,
  });

  const downloadfile = (filedata, filename) => {
    const linkSource = filedata;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = filename;
    downloadLink.click();
  };

  const ondownloadclick = (rid: string) => {
    getjobdescriptionattachment(rid)
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

  const onCloseSubmit = async ({ reasonid, comment }) => {
    const { rid } = closingvacancydetail;
    const response = await fetch("/api/closevacancy", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({ rid, reasonid, comment }),
    });

    if (response.ok) {
      setShowclose(false);
      setDetailrid(undefined);
      setClosingvacancydetail(undefined);
      refetch();
      return cogoToast.success(
        <Message
          title="Vacancy close status"
          text="Status updated successfully"
          type="success"
        />,
        {
          position: "bottom-center",
        },
      );
    } else {
      return cogoToast.error(
        <Message title="login" text="invalid credentials" type="error" />,
        {
          position: "bottom-center",
        },
      );
    }
  };

  return (
    <React.Fragment>
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader title="Vacancies" subtitle="" isbordered={false} />
        </div>
        <div className="flex justify-between">
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <NotificationNav />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 flex justify-between items-center">
        <div className="px-6 py-3  sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
          <MainHeader
            title="List of all Vacancies"
            subtitle="Filter, edit or close vacancies"
            isbordered={false}
          />
        </div>
        <div className="px-6">
          <span className="shadow-sm rounded-md">
            <button
              onClick={(e) =>
                router.push({
                  pathname: `/vacancies/${process.env.NEXT_PUBLIC_RID_NEW}`,
                })
              }
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Add New vacancy
            </button>
          </span>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="">
          <div className="w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="flex justify-between">
              <div className="relative rounded-md shadow-sm w-full">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <svg
                    className="mr-3 h-4 w-4 text-gray-400"
                    x-description="Heroicon name: search"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300"
                  placeholder="Search"
                />
              </div>
              {/* <button className=" relative inline-flex items-center px-4  border border-gray-300 text-sm leading-5 font-medium  text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-indigo-500 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                </svg>
                <span className="ml-2">Option</span>

                <svg
                  className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button> */}
            </div>
          </div>
        </div>
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  <span className="lg:pl-2">Job Title</span>
                </th>

                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>

                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Openings
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  TargetDate
                </th>
                <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {!isLoading &&
                data != null &&
                data != undefined &&
                data?.data.map((x, i) => (
                  <tr key={i}>
                    <td className="px-6 py-3 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      <div className="flex flex-col items-start space-x-3 lg:pl-2">
                        <a
                          href="#"
                          className="truncate hover:text-gray-600 flex justify-between items-baseline"
                        >
                          <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600 hidden"></div>
                          <span className="inline-flex flex-col items-start">
                            {x?.jobtitleen}
                            <span className="text-gray-500 font-normal">
                              {x?.jobcode}
                            </span>
                          </span>
                        </a>
                      </div>
                    </td>

                    <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          {x?.locationen}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          {x?.gradeen}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          {x?.experience}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          {x?.openings}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          {x?.targetdate}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          <span
                            className={classnames(
                              "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 ",
                              {
                                "bg-indigo-100 text-indigo-800":
                                  x?.vacancystatusid === 0,
                                "bg-green-100 text-green-800":
                                  x?.vacancystatusid === 1,
                                "bg-red-100 text-red-800":
                                  x?.vacancystatusid === 2 ||
                                  x?.vacancystatusid === 3,
                              },
                            )}
                          >
                            <svg
                              className={classnames("mr-1.5 h-2 w-2 ", {
                                "text-indigo-400": x?.vacancystatusid === 0,
                                "text-green-400": x?.vacancystatusid === 1,
                                "text-red-400":
                                  x?.vacancystatusid === 2 ||
                                  x?.vacancystatusid === 3,
                              })}
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            {x?.vacancystatusen}
                          </span>
                        </span>
                      </div>
                    </td>

                    <td className="pr-6">
                      <div className="relative flex justify-end items-center">
                        <button
                          onClick={(e) =>
                            selectedrow == i + 1
                              ? setSelectedrow(0)
                              : setSelectedrow(i + 1)
                          }
                          id="project-options-menu-0"
                          type="button"
                          className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
                        >
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        <Transition
                          show={selectedrow === i + 1}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                          className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg"
                        >
                          <div
                            className="z-10 rounded-md bg-white shadow-xs"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="project-options-menu-0"
                          >
                            <div className="py-1">
                              <a
                                onClick={(e) => {
                                  setSelectedrow(0);
                                  setShowdetail(true);
                                  setShowclose(false);
                                  setDetailrid(x?.rid);
                                }}
                                className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                role="menuitem"
                              >
                                <svg
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                View
                              </a>
                              <a
                                onClick={(e) =>
                                  router.push(`/vacancies/${x?.rid}`)
                                }
                                className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                role="menuitem"
                              >
                                <svg
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Edit
                              </a>
                              <a
                                href="#"
                                className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                role="menuitem"
                              >
                                <svg
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                                </svg>
                                Applicants
                              </a>
                              <a
                                href="#"
                                className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                role="menuitem"
                              >
                                <svg
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                                Expats
                              </a>
                            </div>
                            {x?.vacancystatusid != 3 && (
                              <React.Fragment>
                                <div className="border-t border-gray-100"></div>
                                <div className="py-1">
                                  <a
                                    onClick={(e) => {
                                      setSelectedrow(0);
                                      setShowdetail(false);
                                      setShowclose(true);
                                      setDetailrid(x?.rid);
                                      setClosingvacancydetail({
                                        rid: x?.rid,
                                        jobtitle: x?.jobtitleen,
                                        jobcode: x?.jobcode,
                                      });
                                    }}
                                    className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                    role="menuitem"
                                  >
                                    <svg
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    Close
                                  </a>
                                </div>
                              </React.Fragment>
                            )}
                          </div>
                        </Transition>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showdetail && (
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <Transition
              show={showdetail}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            >
              <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
                <Transition
                  show={showdetail}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                  className="w-screen max-w-md"
                >
                  <div className="h-full flex flex-col bg-gray-100 shadow-xl overflow-y-scroll">
                    <header className="space-y-1 py-6 px-4 bg-indigo-700 sm:px-6">
                      <div className="flex items-center justify-between space-x-3">
                        <h2 className="text-lg leading-7 font-medium text-white">
                          {vacancydata?.data?.jobtitleen}
                        </h2>

                        <div className="h-7 flex items-center">
                          <button
                            onClick={(e) => {
                              setShowdetail(false);
                              setDetailrid(undefined);
                            }}
                            aria-label="Close panel"
                            className="text-indigo-200 hover:text-white transition ease-in-out duration-150"
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="">
                        <p className="text-sm leading-5 text-indigo-300 flex items-center">
                          <svg
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {vacancydata?.data?.jobcode}
                        </p>
                        <p>
                          <span className="inline-flex items-center mt-1 py-0.5 rounded-md text-sm font-medium text-white">
                            <svg
                              className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx={4} cy={4} r={3} />
                            </svg>
                            {vacancydata?.data?.sectoren}
                          </span>
                          <span className="inline-flex items-center mt-1 py-0.5 rounded-md text-sm font-medium text-white">
                            <svg
                              className="-ml-0.5 mr-1.5 h-2 w-2 text-orange-400"
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx={4} cy={4} r={3} />
                            </svg>

                            {vacancydata?.data?.departmenten}
                          </span>
                          <span className="inline-flex items-center mt-1  py-0.5 rounded-md text-sm font-medium text-white">
                            <svg
                              className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400"
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx={4} cy={4} r={3} />
                            </svg>

                            {vacancydata?.data?.divisonen}
                          </span>
                        </p>
                      </div>
                    </header>
                    <div className="relative flex-1 py-6 px-4 sm:px-6">
                      <div className="absolute inset-0">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                            <h3 className="hidden text-lg leading-6 font-medium text-gray-900"></h3>
                            <p className="hidden mt-1 max-w-2xl text-sm leading-5 text-gray-500"></p>
                            <div className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                              <p className="inline-block">
                                Created by{" "}
                                <span className="px-1 text-gray-900">
                                  {vacancydata?.data?.createdby}
                                </span>
                                on{" "}
                                <span className="px-1 text-gray-900">
                                  {vacancydata?.data?.createddate}
                                </span>
                              </p>
                              <p className="inline-block mt-2">
                                Modified by
                                <span className="px-1 text-gray-900">
                                  {vacancydata?.data?.modifiedby}
                                </span>
                                on{" "}
                                <span className="px-1 text-gray-900">
                                  {vacancydata?.data?.modifieddate}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div>
                            <dl>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Job Category
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  {vacancydata?.data?.jobcategoryen}
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Job Role
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  {vacancydata?.data?.jobroleen}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Career Level
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  {vacancydata?.data?.careerlevelen}
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Employment
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  {vacancydata?.data?.employmenten}
                                </dd>
                              </div>

                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Grade
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  {vacancydata?.data?.gradeen}
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Target Date
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  {vacancydata?.data?.targetdate}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Total Openings
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  {vacancydata?.data?.openings}
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Salary Range
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  {vacancydata?.data?.salaryrange} AED
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Experience
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  {vacancydata?.data?.experience} Yrs
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Location
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  {vacancydata?.data?.locationen}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Educations
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  <ul className="border border-gray-200 rounded-md">
                                    {vacancydata?.data?.educationsen?.map(
                                      (val, index) => (
                                        <li
                                          key={index}
                                          className="p-2 border-gray-200  border-b-2 flex items-center justify-between text-sm leading-5"
                                        >
                                          <span className="w-full">{val}</span>
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Skills
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  <div className="flex flex-col justify-between">
                                    {vacancydata?.data?.skillsen?.map(
                                      (val, index) => (
                                        <span
                                          key={index}
                                          className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800"
                                        >
                                          <svg
                                            className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
                                            fill="currentColor"
                                            viewBox="0 0 8 8"
                                          >
                                            <circle cx={4} cy={4} r={3} />
                                          </svg>
                                          {val}
                                        </span>
                                      ),
                                    )}
                                  </div>
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Competences
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  <div className="flex flex-col justify-between">
                                    {vacancydata?.data?.abilitiesen?.map(
                                      (val, index) => (
                                        <span
                                          key={index}
                                          className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800"
                                        >
                                          <svg
                                            className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400"
                                            fill="currentColor"
                                            viewBox="0 0 8 8"
                                          >
                                            <circle cx={4} cy={4} r={3} />
                                          </svg>
                                          {val}
                                        </span>
                                      ),
                                    )}
                                  </div>
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Responsbilities
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  <span className="">
                                    {parse(
                                      unescape(
                                        vacancydata?.data?.responsbilities,
                                      ),
                                    )}
                                  </span>
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Job Description
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  <span className="">
                                    {parse(
                                      unescape(vacancydata?.data?.description),
                                    )}
                                  </span>
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                  Attachments
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  <ul className="border border-gray-200 rounded-md">
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                                      <div className="w-0 flex-1 flex items-center">
                                        <svg
                                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                        <span className="ml-2 flex-1 w-0 truncate">
                                          {vacancydata?.data?.attachments}
                                        </span>
                                      </div>
                                      <div className="ml-4 flex-shrink-0">
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            ondownloadclick(
                                              vacancydata?.data?.rid,
                                            );
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
                                      </div>
                                    </li>
                                  </ul>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </section>
            </Transition>
          </div>
        </div>
      )}
      {showclose && (
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <Transition
              show={showclose}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            >
              <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
                <Transition
                  show={showclose}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                  className="w-screen max-w-md"
                >
                  <div className="h-full flex flex-col bg-gray-100 shadow-xl overflow-y-scroll">
                    <header className="space-y-1 py-6 px-4 bg-indigo-700 sm:px-6">
                      <div className="flex items-center justify-between space-x-3">
                        <h2 className="text-lg leading-7 font-medium text-white">
                          Close Vacancy
                        </h2>
                        <div className="h-7 flex items-center">
                          <button
                            onClick={(e) => {
                              setShowclose(false);
                              setDetailrid(undefined);
                              setClosingvacancydetail(undefined);
                            }}
                            aria-label="Close panel"
                            className="text-indigo-200 hover:text-white transition ease-in-out duration-150"
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="hidden">
                        <p className="text-sm leading-5 text-indigo-300">
                          Some additional details
                        </p>
                      </div>
                    </header>
                    <div className="relative flex-1 py-6 px-4 sm:px-6">
                      <div className="absolute inset-0">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                              {closingvacancydetail?.jobtitle}
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                              {closingvacancydetail?.jobcode}
                            </p>
                          </div>
                          <div className="shadow-none rounded-none">
                            <form
                              onSubmit={handleSubmit(onCloseSubmit)}
                              className=""
                            >
                              <div className="px-4 py-5 bg-white ">
                                <div className="grid grid-cols-1">
                                  <div className="col-span-1">
                                    <label
                                      htmlFor="reasonid"
                                      className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                      Closing Reason
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                                      <select
                                        name="reasonid"
                                        id="reasonid"
                                        ref={register}
                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                                      >
                                        <option
                                          value="0"
                                          className="text-gray-500 "
                                        >
                                          --Select--
                                        </option>
                                        {jobclosingreason &&
                                          jobclosingreason.map((val, index) => (
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
                                      {errors.reasonid?.message}
                                    </p>
                                  </div>
                                  <div className="col-span-1 mt-2">
                                    <label
                                      htmlFor="comment"
                                      className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                      Comment
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <textarea
                                        name="comment"
                                        id="comment"
                                        ref={register}
                                        className="inline-flex w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                                        placeholder="Enter Comment"
                                      />
                                    </div>
                                    <p className="text-red-500">
                                      {errors.comment?.message}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="px-4 py-2 bg-gray-50 text-right sm:px-6">
                                <span className="inline-flex  justify-between">
                                  <button
                                    disabled={!formState.isValid}
                                    type="submit"
                                    className={classnames(
                                      " inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md  bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out",
                                      {
                                        "opacity-25 text-gray-300": !formState.isValid,
                                      },
                                      {
                                        "opacity-100 text-white":
                                          formState.isValid,
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
                                        reasonid: 0,
                                        comment: "",
                                      })
                                    }
                                  >
                                    Clear
                                  </button>
                                </span>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </section>
            </Transition>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

Index.getLayout = getLayout;

export const getServerSideProps = withSession;

export default Index;