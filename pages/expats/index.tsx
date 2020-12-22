import * as React from "react";
import Head from "next/head";
import classnames from "classnames";
import { jsx } from "theme-ui";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import { Transition } from "@headlessui/react";
import MainHeader from "@components/MainHeader";
import { useRouter } from "next/router";
import withSession from "lib/session";
import NotificationNav from "@components/NotificationNav";
import Select from "react-select";
import { useQuery } from "react-query";
import { useSelectStyles } from "../../hooks/useHelper";
import { OptionsMultiDTO } from "lib/commontypes";
import words from "lodash/words";
import filter from "lodash/filter";
import PageTitle from "@components/PageTitle";

const getactivevacancyformatching = async ({ queryKey }) => {
  const response = await fetch(`/api/getactivevacancyformatching`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const getvacancyexpatlist = async ({ queryKey }) => {
  const [_key, { rid }] = queryKey;
  const response = await fetch(`/api/getvacancyexpatlist?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const getexpatdetails = async ({ queryKey }) => {
  const [_key, { rid }] = queryKey;
  const response = await fetch(`/api/getexpatdetails?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const ExpatManager = ({ user }) => {
  const router = useRouter();
  const [selectedrow, setSelectedrow] = React.useState();
  const [selectrowindex, setSelectedrowindex] = React.useState(0);

  const [
    selectedvacancy,
    setSelectedvacancy,
  ] = React.useState<OptionsMultiDTO>();
  const [showdetail, setShowdetail] = React.useState(false);

  const {
    isLoading: activevacancyisLoading,
    isError: activevacancyisError,
    data: activevacancydata,
    error: activevacancyerror,
  } = useQuery(["getactivevacancyformatching"], getactivevacancyformatching, {
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: expatlistisLoading,
    data: expatlistdata,
    error: expatlistererror,
    isFetching: expatisFetching,
  } = useQuery(
    ["getvacancyexpatlist", { rid: selectedvacancy?.value }],
    getvacancyexpatlist,
    {
      enabled: !!user && !!selectedvacancy,
      refetchOnWindowFocus: false,
    },
  );

  const {
    isLoading: expatdetailisLoading,
    data: expatdetaildata,
    error: expatdetailerror,
    isFetching: expatdetailisFetching,
  } = useQuery(["getexpatdetails", { rid: selectedrow }], getexpatdetails, {
    enabled: !!user && !!selectedvacancy && !!selectedrow && showdetail,
    refetchOnWindowFocus: false,
  });

  // React.useEffect(() => {
  //   if (selectedrow) {
  //     const selectedresume = filter(matchinglistdata?.data, function (o) {
  //       return o.rid === selectedrow;
  //     });

  //   }
  // }, [selectedrow]);

  return (
    <React.Fragment>
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader title="Expat List" subtitle="" isbordered={false} />
        </div>
        <div className="flex justify-between">
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <NotificationNav />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 flex justify-between items-center">
        <div className="px-6 py-3  sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
          <PageTitle
            title="List of all expats added to vacancy"
            subtitle="All application need to be processed as Applications"
            isbordered={false}
          />
        </div>
        <div className="px-6">
          <span className="shadow-sm rounded-md">
            <button
              onClick={(e) =>
                router.push({
                  pathname: `/expats/${process.env.NEXT_PUBLIC_RID_NEW}`,
                })
              }
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Add New Expat
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
              <Select
                className="w-full rounded-none z-10"
                defaultValue={[]}
                isLoading={activevacancyisLoading}
                isClearable={true}
                isSearchable={true}
                id="selectedvacancy"
                inputId="selectedvacancy"
                instanceId="selectedvacancy"
                name="selectedvacancy"
                options={activevacancydata?.data}
                styles={useSelectStyles}
                onChange={(e) => setSelectedvacancy(e)}
              />
            </div>
          </div>
        </div>

        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  <span className="lg:pl-2">Name</span>
                </th>

                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Emirates ID
                </th>

                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Monthly Salary
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Statusdate
                </th>
                <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {!expatlistisLoading &&
                !!expatlistdata &&
                expatlistdata?.data.map((x, i) => (
                  <tr key={i}>
                    <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          {x?.photo == "" ? (
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
                            <img
                              className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                              src={`${x?.photo}`}
                              alt={x?.englishname}
                            />
                          )}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-3 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      <div className="flex flex-col items-start space-x-3 lg:pl-2">
                        <a
                          href="#"
                          className="truncate hover:text-gray-600 flex justify-between items-baseline"
                        >
                          <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600 hidden"></div>
                          <span className="inline-flex flex-col items-start">
                            {x?.englishname}
                            <span className="text-gray-500 font-normal">
                              {x?.expatcode}
                            </span>
                          </span>
                        </a>
                      </div>
                    </td>

                    <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          {x?.emiratesid}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          {x?.gender}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          {x?.experience} Yrs
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          {x?.monthlysalary} AED
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="flex-shrink-0 text-xs leading-5 font-medium">
                          {x?.statusdate}
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
                                  x?.statusid === 0,
                                "bg-green-100 text-green-800":
                                  x?.statusid === 1,
                                "bg-red-100 text-red-800":
                                  x?.statusid === 2 || x?.statusid === 3,
                              },
                            )}
                          >
                            <svg
                              className={classnames("mr-1.5 h-2 w-2 ", {
                                "text-indigo-400": x?.statusid === 0,
                                "text-green-400": x?.statusid === 1,
                                "text-red-400":
                                  x?.statusid === 2 || x?.statusid === 3,
                              })}
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            {x?.statusen}
                          </span>
                        </span>
                      </div>
                    </td>

                    <td className="pr-6">
                      <div className="relative flex justify-end items-center">
                        <button
                          onClick={(e) =>
                            selectedrow == i + 1
                              ? setSelectedrow(undefined)
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
                                  setSelectedrow(x?.rid);
                                  setShowdetail(true);
                                  setSelectedrowindex(0);
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
                                  router.push(`/expats/${x?.rid}`)
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
                            </div>
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
      {showdetail && !expatdetailisFetching && (
        <div className="z-20  fixed inset-0 overflow-hidden">
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
            ></Transition>
            <section
              className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
              aria-labelledby="slide-over-heading"
            >
              <Transition
                show={showdetail}
                className="w-screen max-w-2xl"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                  <div className=" flex-1 flex flex-col py-6 overflow-y-scroll">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          id="Profileheading"
                          className="text-lg font-medium text-gray-900"
                        >
                          Expat Details
                        </h2>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            onClick={(e) => {
                              setShowdetail(false);
                              setSelectedrow(undefined);
                              setSelectedrowindex(0);
                            }}
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <span className="sr-only">Close panel</span>

                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-1">
                      <div className="divide-y divide-gray-200">
                        <div className="pb-2">
                          <div className="bg-indigo-700 h-24 sm:h-20 lg:h-28"></div>
                          <div className="flow-root px-4 space-y-6 sm:-mt-8 sm:flex sm:items-start sm:px-6 sm:space-x-6 lg:-mt-15">
                            <div>
                              <div className="-m-1 flex">
                                <div className="inline-flex rounded-lg overflow-hidden border-4 border-white">
                                  <img
                                    className="flex-shrink-0 h-24 w-24 sm:h-40 sm:w-40 lg:w-48 lg:h-48"
                                    src={`${expatdetaildata?.data?.photo}`}
                                    alt={expatdetaildata?.data?.englishname}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-5 sm:flex-1">
                              <div>
                                <div className="flex items-center space-x-2.5 mt-4">
                                  <h3 className="font-bold text-xl leading-7 text-gray-900 sm:text-2xl sm:leading-8">
                                    {expatdetaildata?.data?.englishname}
                                  </h3>
                                </div>
                                <p className="text-sm leading-5 text-gray-500 flex items-end mt-2">
                                  <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="inline-block">
                                    {expatdetaildata?.data?.expatcode}
                                  </span>
                                </p>
                                <p className="text-sm leading-5 text-gray-500 flex items-end mt-2">
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="inline-block">
                                    {expatdetaildata?.data?.emiratesid}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-5 sm:px-0 sm:py-0">
                          <dl className="space-y-8 sm:space-y-0">
                            <div className="bg-gray-50  sm:flex sm:space-x-6 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Total experience
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                <p>{expatdetaildata?.data?.experience}</p>
                              </dd>
                            </div>
                            <div className="sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Monthly Salary
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {expatdetaildata?.data?.monthlysalary}
                              </dd>
                            </div>
                            <div className="bg-gray-50  sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Status
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {expatdetaildata?.data?.statusen}
                              </dd>
                            </div>
                            <div className="sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Status Date
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {expatdetaildata?.data?.statusdate}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                    <button
                      onClick={(e) => {
                        setShowdetail(false);
                        setSelectedrow(undefined);
                        setSelectedrowindex(0);
                      }}
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition>
            </section>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

ExpatManager.getLayout = getLayout;
export const getServerSideProps = withSession;

export default ExpatManager;
