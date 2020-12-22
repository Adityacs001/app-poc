/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import Head from "next/head";
import classnames from "classnames";
import { Avatar, jsx, sx, Box, Flex, Donut } from "theme-ui";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import { Transition } from "@headlessui/react";
import MainHeader from "@components/MainHeader";
import PageTitle from "@components/PageTitle";
import SubHeader from "@components/SubHeader";
import withSession from "lib/session";
import useStore, { languageSelector } from "../store/index";
import NotificationNav from "@components/NotificationNav";
import { useQuery } from "react-query";
import { fetchdetail } from "lib/fetcher";
import { useRouter } from "next/router";
import useLocales from "../hooks/useLocales";
import Link from "next/link";
import bannerchartdata from "../data/bannerchartdata";
import dynamic from "next/dynamic";
import map from "lodash/map";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const getdashboard = async ({ queryKey }) => {
  const [_key] = queryKey;
  const response = await fetch(`/api/getdashboard`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();

  return result;
};

const Index = ({ user }) => {
  const router = useRouter();
  const { translations } = useLocales();

  const {
    isLoading: dashboardisLoading,
    isError: dashboardisError,
    data: dashboarddata,
    error: dashboarderror,
    refetch: dashboardRefetch,
  } = useQuery(["getdashboard"], getdashboard, {
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  const [isOpen, setIsOpen] = React.useState(false);

  const memoizedlocalestate = useStore(React.useCallback(languageSelector, []));

  const cardvariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
        type: "spring",
        stiffness: 500,
      },
    },
    hover: {
      scale: 1.05,
      textShadow: "0px 0px 8px rgb(255,255,255)",
    },
  };

  const mainchart = {
    series: [
      {
        name: "Posting",
        type: "column",
        data: [13, 0, 10, 10, 5, 2, 0, 11, 0, 0, 0, 145],
      },
      {
        name: "Applications",
        type: "column",
        data: [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      },
      {
        name: "Hired",
        type: "line",
        data: [2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 4],
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },

      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };

  const [bannerchart] = React.useState({
    series: [
      {
        name: "Posting",
        type: "column",
        data: [],
      },
      {
        name: "Applications",
        type: "column",
        data: [],
      },
      {
        name: "Hired",
        type: "line",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "line",
        stacked: false,
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: [1, 1, 4],
      },
      xaxis: {
        categories: [],
        tooltip: {
          fixed: {
            enabled: true,
            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60,
          },
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40,
        },
      },
      yaxis: [
        {
          seriesName: "Posting",
          show: false,
          tickAmount: 7,
          min: 0,
          max: 5000,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#161038",
          },
          labels: {
            style: {
              colors: "#161038",
            },
          },
          title: {
            text: "Total openings in months",
            style: {
              color: "#161038",
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: "Applications",
          show: false,
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#6c6b70",
          },
          labels: {
            style: {
              colors: "#6c6b70",
            },
          },
          title: {
            text: "Total matching done to vacancies in months",
            style: {
              color: "#6c6b70",
            },
          },
        },
        {
          seriesName: "Hired",
          show: false,
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#FAA317",
          },
          labels: {
            style: {
              colors: "#FAA317",
            },
          },
        },
      ],
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
      },
      tooltip: {
        enabled: true,
      },
    },
  });

  React.useEffect(() => {
    if (!!bannerchartdata) {
      if (!!bannerchartdata) {
        bannerchart.series.find(
          (a) => a.name.toLowerCase() == "posting",
        ).data = map(bannerchartdata, (val, index) => val.Posting);

        bannerchart.series.find(
          (a) => a.name.toLowerCase() == "applications",
        ).data = map(bannerchartdata, (val, index) => val.Applications);

        bannerchart.series.find(
          (a) => a.name.toLowerCase() == "hired",
        ).data = map(bannerchartdata, (val, index) => parseInt(val.Hired));

        bannerchart.options.xaxis.categories = map(
          bannerchartdata,
          (val, index) => val.months,
        );
      }
    }
  }, [bannerchartdata]);

  return (
    <React.Fragment>
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader
            title={translations.t("Dashboard")}
            subtitle=""
            isbordered={false}
          />
        </div>
        <div className="">
          <NotificationNav />
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6 lg:px-8 bg-gray-100 ">
        <div className="py-2">
          <PageTitle
            title={translations.t("overview")}
            subtitle={translations.t("overviewsub")}
            isbordered={false}
          ></PageTitle>
        </div>

        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="my-2 py-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {!dashboardisLoading &&
            !!dashboarddata &&
            !!dashboarddata.data &&
            !!dashboarddata.data.mainstats &&
            dashboarddata?.data?.mainstats.map((val, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0px 0px 8px rgb(255,255,255)",
                }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div
                      className={classnames(
                        "flex-shrink-0  rounded-md p-3",
                        {
                          "bg-yellow-500": val.type === 1,
                        },
                        {
                          "bg-indigo-500": val.type === 2,
                        },
                        {
                          "bg-red-500": val.type === 3,
                        },
                        {
                          "bg-green-500": val.type === 4,
                        },
                      )}
                    >
                      {val.type === 1 ? (
                        <svg
                          className="h-6 w-6 text-gray-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          />
                        </svg>
                      ) : val.type === 2 ? (
                        <svg
                          className="h-6 w-6 text-gray-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          ></path>
                        </svg>
                      ) : val.type === 3 ? (
                        <svg
                          className="h-6 w-6 text-gray-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          ></path>
                        </svg>
                      ) : val.type === 4 ? (
                        <svg
                          className="h-6 w-6 text-gray-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-6 w-6 text-gray-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="mx-5 w-0 flex-1">
                      <dl>
                        <dt
                          className={classnames(
                            " leading-5 font-medium text-gray-500 truncate",
                            {
                              "text-sm ": memoizedlocalestate === "en",
                            },
                            {
                              "text-base ": memoizedlocalestate === "ae",
                            },
                          )}
                        >
                          {val.title}
                        </dt>
                        <dd>
                          <div
                            className={classnames(
                              "text-lg leading-7 font-medium text-gray-900",
                              {
                                "font-medium": memoizedlocalestate === "en",
                              },
                              {
                                "font-bold": memoizedlocalestate === "ae",
                              },
                            )}
                          >
                            {val.stats}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm leading-5">
                    <span className="font-medium text-teal-600 hover:text-teal-900 transition ease-in-out duration-150">
                      {val.subtitle}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
      <div className="px-4 py-6 sm:px-6 lg:px-8 ">
        <Flex>
          <Box className="flex flex-col w-1/5   text-center ">
            <PageTitle
              title={translations.t("applicationstats")}
              subtitle={translations.t("applicationstatssub")}
              isbordered={false}
            />

            <div className="py-2">
              <ul>
                {!dashboardisLoading &&
                  !!dashboarddata &&
                  !!dashboarddata.data &&
                  !!dashboarddata.data.journeystats &&
                  dashboarddata?.data?.journeystats.map((val, index) => (
                    <li key={index}>
                      <div className="border-b border-gray-200 py-2 flex flex-col md:flex-row">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                          <svg
                            className={classnames(
                              "h-2 w-2 text-indigo-400",
                              {
                                "mr-1.5": memoizedlocalestate === "en",
                              },
                              {
                                "ml-1.5": memoizedlocalestate === "ae",
                              },
                            )}
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                          {val.stats}
                        </span>
                        <span className="inline-flex px-2 text-sm text-gray-500">
                          {val.title}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="py-2">
              <PageTitle
                title={translations.t("vacancystats")}
                subtitle={translations.t("vacancystatssub")}
                isbordered={false}
              />

              <ul>
                {!dashboardisLoading &&
                  !!dashboarddata &&
                  !!dashboarddata.data &&
                  !!dashboarddata.data.vacancystats &&
                  dashboarddata?.data?.vacancystats.map((val, index) => (
                    <li key={index}>
                      <div className="border-b border-gray-200 py-2 flex flex-col md:flex-row">
                        <span
                          className={classnames(
                            "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 ",
                            {
                              "bg-green-100 text-green-800":
                                val.type === 1 || val.type === 3,
                            },
                            {
                              "bg-red-100 text-red-800":
                                val.type === 2 || val.type === 4,
                            },
                          )}
                        >
                          <svg
                            className={classnames(
                              "h-2 w-2",
                              {
                                "text-green-400":
                                  val.type === 1 || val.type === 3,
                              },
                              {
                                "text-red-400":
                                  val.type === 2 || val.type === 4,
                              },
                              {
                                "mr-1.5": memoizedlocalestate === "en",
                              },
                              {
                                "ml-1.5": memoizedlocalestate === "ae",
                              },
                            )}
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                          {val.stats}
                        </span>
                        <span className="inline-flex px-2 text-sm text-gray-500">
                          {val.title}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Box>
          <Box className="flex flex-col  w-4/5   text-center">
            <SubHeader
              title={translations.t("monthwisejourneybreakup")}
              subtitle={translations.t("monthwisejourneybreakupsub")}
              isbordered={false}
            />
            <Chart
              options={bannerchart.options}
              series={bannerchart.series}
              type="line"
              height={450}
            />
          </Box>
        </Flex>
      </div>
      <div className="px-4 py-8  bg-gray-100">
        <SubHeader
          title={translations.t("suggestedjobseeker")}
          subtitle={translations.t("suggestedjobseekersub")}
          isbordered={false}
        />
        <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">
          {!dashboardisLoading &&
            !!dashboarddata &&
            !!dashboarddata.data &&
            !!dashboarddata.data.jobseekers &&
            dashboarddata?.data?.jobseekers.map((val, index) => (
              <li
                key={index}
                className="relative col-span-1 flex shadow-sm rounded-md"
              >
                <div
                  className={classnames(
                    "flex-shrink-0 flex items-center justify-center w-16 text-gray-700 text-sm leading-5 font-medium border-t border-b",
                    {
                      "rounded-l-md border-l ": memoizedlocalestate === "en",
                    },
                    {
                      "rounded-r-md border-r ": memoizedlocalestate === "ae",
                    },
                  )}
                >
                  {val?.photo == "" ? (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <Avatar src={`data:image/png;base64,${val?.photo}`} />
                  )}
                </div>
                <div
                  className={classnames(
                    "flex-1 flex items-center justify-between border-t  border-b border-gray-200 bg-white  truncate",
                    { "border-r rounded-r-md": memoizedlocalestate === "en" },
                    { "border-l rounded-l-md": memoizedlocalestate === "en" },
                  )}
                >
                  <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                    <span className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">
                      {val.englishname}
                    </span>
                    <p className="text-gray-500 truncate pb-2">
                      {val.jobseekerid}
                    </p>
                    <p className="text-gray-800">
                      {translations.t("experience")} {val.totalexp}{" "}
                      {translations.t("yrs")}
                    </p>
                    <p className="text-gray-500 truncate">{val.educationen}</p>
                  </div>

                  {/* <div className="flex-shrink-0 pr-2">
                    <button
                      id="pinned-project-options-menu-0"
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
                      show={false}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <div className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg">
                        <div
                          className="rounded-md bg-white shadow-xs"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="pinned-project-options-menu-0"
                        >
                          <div className="py-1">
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              View
                            </a>
                          </div>
                          <div className="border-t border-gray-100"></div>
                          <div className="py-1">
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              Removed from pinned
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              Share
                            </a>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div> */}
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="pb-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 bg-gray-50">
          <div className="col-span-1 ">
            <div className="px-4 pt-2">
              <PageTitle
                title={translations.t("recentvacancies")}
                subtitle={translations.t("recentvacanciessub")}
                isbordered={true}
              />
            </div>
            <div className="align-middle inline-block min-w-full border-b border-gray-200 px-2">
              <table className="min-w-full">
                <thead>
                  <tr className="border-t border-gray-200">
                    <th
                      className={classnames(
                        "px-2 py-3 border-b border-gray-200 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider",
                        { "text-left": memoizedlocalestate === "en" },
                        { "text-right": memoizedlocalestate === "ae" },
                      )}
                    >
                      <span className="">{translations.t("jobtitle")}</span>
                    </th>
                    <th
                      className={classnames(
                        "px-2 py-3 border-b border-gray-200 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider",
                        { "text-left": memoizedlocalestate === "en" },
                        { "text-right": memoizedlocalestate === "ae" },
                      )}
                    >
                      {translations.t("status")}
                    </th>
                    <th
                      className={classnames(
                        "px-2 py-3 border-b border-gray-200 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider",
                        { "text-left": memoizedlocalestate === "en" },
                        { "text-right": memoizedlocalestate === "ae" },
                      )}
                    >
                      {" "}
                      {translations.t("openings")}
                    </th>
                    <th
                      className={classnames(
                        "px-2 py-3 border-b border-gray-200 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider",
                        { "text-left": memoizedlocalestate === "en" },
                        { "text-right": memoizedlocalestate === "ae" },
                      )}
                    >
                      {" "}
                      {translations.t("applicants")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {!dashboardisLoading &&
                    !!dashboarddata &&
                    !!dashboarddata.data &&
                    !!dashboarddata.data.vacancies &&
                    dashboarddata?.data?.vacancies.map((val, index) => (
                      <tr key={index}>
                        <td className="px-2 py-3 max-w-0 w-1/2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                          <div className="flex flex-col items-baseline">
                            <span className="truncate">{val.titleen}</span>
                            <span className="inline-block text-gray-500 font-normal">
                              {val.jobcode}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-sm leading-5 text-gray-500 font-medium">
                          <span className="inline-block text-xs leading-5 font-medium">
                            {val.statusen}
                          </span>
                        </td>
                        <td className="px-2 py-3 text-sm leading-5 text-gray-500 font-medium">
                          <span className="inline-block text-xs leading-5 font-medium">
                            {val.openings}
                          </span>
                        </td>
                        <td className="px-2 py-3 text-sm leading-5 text-gray-500 font-medium">
                          <span className="inline-block text-xs leading-5 font-medium">
                            {val.applicants}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-1 bg-white">
            <div className="px-4 pt-2">
              <PageTitle
                title={translations.t("recentapplications")}
                subtitle={translations.t("recentapplicationssub")}
                isbordered={true}
              />
            </div>
            <div className="align-middle inline-block min-w-full border-b border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr className="border-t border-gray-200">
                    <th
                      className={classnames(
                        "px-2 py-3 border-b border-gray-200 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider",
                        { "text-left": memoizedlocalestate === "en" },
                        { "text-right": memoizedlocalestate === "ae" },
                      )}
                    >
                      {" "}
                      <span className="">{translations.t("fullname")}</span>
                    </th>
                    <th
                      className={classnames(
                        "px-2 py-3 border-b border-gray-200 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider",
                        { "text-left": memoizedlocalestate === "en" },
                        { "text-right": memoizedlocalestate === "ae" },
                      )}
                    >
                      {" "}
                      {translations.t("jobtitle")}
                    </th>
                    <th
                      className={classnames(
                        "px-2 py-3 border-b border-gray-200 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider",
                        { "text-left": memoizedlocalestate === "en" },
                        { "text-right": memoizedlocalestate === "ae" },
                      )}
                    >
                      {" "}
                      {translations.t("status")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {!dashboardisLoading &&
                    !!dashboarddata &&
                    !!dashboarddata.data &&
                    !!dashboarddata.data.applications &&
                    dashboarddata?.data?.applications.map((val, index) => (
                      <tr key={index}>
                        <td className="px-2 py-3 max-w-0 w-1/2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                          <div className="flex flex-col items-baseline">
                            <span className="truncate">{val.englishname}</span>
                            <span className="inline-block text-gray-500 font-normal">
                              {val.jobseekerid}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-sm leading-5 text-gray-500 font-medium">
                          <div className="flex flex-col items-baseline">
                            <span className="truncate">{val.titleen}</span>
                            <span className="inline-block text-gray-500 font-normal">
                              {val.jobcode}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-sm leading-5 text-gray-800 font-medium">
                          <span className="inline-block text-xs leading-5 font-medium">
                            {val.statusen}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Index.getLayout = getLayout;

export const getServerSideProps = withSession;

export default Index;
