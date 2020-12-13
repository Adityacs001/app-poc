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
import { useQuery, useQueryCache } from "react-query";
import { useSelectStyles } from "../hooks/useHelper";
import { ActiveVacancylistforjourney } from "lib/commontypes";
import words from "lodash/words";
import filter from "lodash/filter";
import cogoToast from "cogo-toast";
import Message from "@components/Message";
import state from "../data/states";

const VacancyTabItem = ({
  setSelectedtab,
  selectedtab,
  taborder,
  label,
  stat,
}) => {
  return (
    <a
      onClick={(e) => setSelectedtab(taborder)}
      className={classnames(
        "flex items-center justify-between whitespace-no-wrap p-2 font-medium text-base leading-5 cursor-pointer",
        {
          "border-b-4   border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700":
            selectedtab === taborder,
        },
        {
          " text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300":
            selectedtab != taborder,
        },
      )}
    >
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
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>

      <span className="inline-block px-1">{label}</span>
      <span
        className={classnames(
          "inline-block  w-5 h-5  rounded-full   text-center ",
          {
            "bg-indigo-600 text-white": selectedtab === taborder,
          },
          {
            "bg-gray-300 text-gray-500": selectedtab !== taborder,
          },
        )}
      >
        {stat}
      </span>
    </a>
  );
};

const getactivevacancyformatching = async (key: string) => {
  const response = await fetch(`/api/getactivevacancyformatching`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const getallmatchingforvacancy = async (
  key: string,
  rid: string,
  selectedtab: number,
) => {
  const response = await fetch(
    `/api/getallmatchingforvacancy?rid=${rid}&stageid=${selectedtab}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json " },
    },
  );

  const result = await response.json();
  return result;
};

const getjobseekerdetails = async (key: string, rid: string) => {
  const response = await fetch(`/api/getjobseekedetail?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const OfferManager = ({ user }) => {
  const router = useRouter();
  const [selectedtab, setSelectedtab] = React.useState(1);
  const [selectedrow, setSelectedrow] = React.useState();
  const [selectrowindex, setSelectedrowindex] = React.useState(0);
  const queryCache = useQueryCache();

  const [
    selectedvacancy,
    setSelectedvacancy,
  ] = React.useState<ActiveVacancylistforjourney>();
  const [showdetail, setShowdetail] = React.useState(false);
  const [searchterm, setSearchterm] = React.useState();
  const [joruneystats, setJourneystats] = React.useState({});

  const [showdummy, setDummy] = React.useState(true);
  const {
    isLoading: activevacancyisLoading,
    isError: activevacancyisError,
    data: activevacancydata,
    error: activevacancyerror,
    refetch: activeVacancyRefetch,
  } = useQuery(["getactivevacancyformatching"], getactivevacancyformatching, {
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: matchinglistLoading,
    data: matchinglistdata,
    error: matchinglistererror,
    isFetching: matchingisFetching,
    refetch: matchinglistRefetch,
  } = useQuery(
    ["getallmatchingforvacancy", selectedvacancy?.value, selectedtab],
    getallmatchingforvacancy,
    {
      enabled: !!user && !!selectedvacancy,
      refetchOnWindowFocus: false,
    },
  );

  const {
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    data: jobseekerdata,
    error: jobseekererror,
  } = useQuery(
    ["getjobseekerdetails", selectedrow?.resumeid],
    getjobseekerdetails,
    {
      enabled: !!user && !!selectedrow && showdetail,
      refetchOnWindowFocus: false,
    },
  );

  const onStatusUpdate = async (currentrow, actiontype) => {
    const { rid, resumeid, reqid, statusid } = currentrow;
    const response = await fetch("/api/updatejourneystatus", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({
        reqid: reqid,
        resumeid: resumeid,
        reqresumeid: rid,
        reasonid: 0,
        comment: "",
        currentstatus: statusid,
        actiontype: actiontype,
      }),
    });

    if (response.ok) {
      matchinglistRefetch();
      const result = await response.json();
      if (!!result && result.status === 200) setJourneystats(result.data);

      return cogoToast.success(
        <Message
          title="Application status"
          text="Status updated successfully"
          type="success"
        />,
        {
          position: "bottom-center",
        },
      );
    } else {
      return cogoToast.error(
        <Message
          title="Application status"
          text="something went wrong, try sometime again later"
          type="error"
        />,
        {
          position: "bottom-center",
        },
      );
    }
  };

  React.useEffect(() => {
    setSelectedrowindex(0);
    setSelectedrow(undefined);
  }, [selectedtab]);

  // React.useEffect(() => {
  //   if (selectedrow) {
  //     const selectedresume = filter(matchinglistdata?.data, function (o) {
  //       return o.rid === selectedrow;
  //     });

  //   }
  // }, [selectedrow]);

  React.useEffect(() => {
    setJourneystats({
      totalnomination: selectedvacancy?.totalnomination,
      totalinterview: selectedvacancy?.totalinterview,
      totaloffer: selectedvacancy?.totaloffer,
      totalhired: selectedvacancy?.totalhired,
      totalrejected: selectedvacancy?.totalrejected,
    });
  }, [selectedvacancy]);

  return (
    <React.Fragment>
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader title="Applications" subtitle="" isbordered={false} />
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
            title="List of all applications submitted for vacancy"
            subtitle="select one of vacacy to view its application"
            isbordered={false}
          />
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
                value={selectedvacancy}
                onChange={(e) => setSelectedvacancy(e)}
              />

              <div className="hidden relative rounded-md shadow-sm w-full">
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
                  onChange={(e) => setSearchterm(e.target.value)}
                  type="text"
                  name="searchterm"
                  id="searchterm"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300"
                  placeholder="Search any keyword"
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
        {!matchinglistLoading && !!matchinglistdata && (
          <div className="min-w-full px-4 bg-white ">
            <div className="px-3 pt-3">
              <div className="sm:hidden">
                <select
                  aria-label="Selected tab"
                  className="form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
                >
                  {!!state &&
                    state.map((val, index) => (
                      <option key={index} value={val.id}>
                        {val.titleen}
                      </option>
                    ))}
                </select>
              </div>

              <div className="hidden sm:block">
                <nav className="-mb-px flex space-x-8">
                  {!!state &&
                    state.map((val, index) => (
                      <VacancyTabItem
                        key={index}
                        setSelectedtab={setSelectedtab}
                        selectedtab={selectedtab}
                        label={val.titleen}
                        taborder={val.id}
                        stat={
                          val.id === 1
                            ? joruneystats?.totalnomination
                            : val.id === 2
                            ? joruneystats?.totalinterview
                            : val.id === 3
                            ? joruneystats?.totaloffer
                            : val.id === 4
                            ? joruneystats?.totalhired
                            : val.id === 5
                            ? joruneystats?.totalrejected
                            : 0
                        }
                      />
                    ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        <div className="align-middle inline-block min-w-full mt-1">
          <ul className="bg-white">
            {!matchinglistLoading &&
              !!matchinglistdata &&
              matchinglistdata?.data?.map((x, i) => (
                <li key={i}>
                  <div className="block bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out  border-b border-gray-200">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
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
                              src={`data:image/png;base64,${x?.photo}`}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <div className="text-sm leading-5 font-medium text-gray-800 truncate">
                              {x?.englishnameen}
                            </div>
                            <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                              <svg
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                              <span className="truncate">{x?.email}</span>
                            </div>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <div className="text-sm leading-5 text-gray-900">
                                Applied on
                                <span className="px-2"> {x?.appliedon} </span>
                              </div>
                              <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                <svg
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {selectedtab === 1
                                  ? "Nomination"
                                  : selectedtab === 2
                                  ? "Interview"
                                  : selectedtab === 3
                                  ? "Offer"
                                  : selectedtab === 4
                                  ? "Hired"
                                  : selectedtab === 5
                                  ? "Rejected"
                                  : "NA"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="relative flex justify-end items-center">
                          <button
                            onClick={(e) =>
                              selectrowindex == i + 1
                                ? setSelectedrowindex(0)
                                : setSelectedrowindex(i + 1)
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
                            show={selectrowindex === i + 1}
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
                                    setSelectedrowindex(0);
                                    setSelectedrow(x);
                                    setShowdetail(true);
                                  }}
                                  className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer"
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
                                  View Profile
                                </a>

                                <a
                                  onClick={(e) => {
                                    setSelectedrowindex(0);
                                    setSelectedrow(x);
                                    onStatusUpdate(x, 1);
                                  }}
                                  className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer"
                                  role="menuitem"
                                >
                                  <svg
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  Accept
                                </a>

                                {selectedtab !== 5 && (
                                  <a
                                    onClick={(e) => {
                                      setSelectedrowindex(0);
                                      setSelectedrow(x);
                                      onStatusUpdate(x, 2);
                                    }}
                                    className="cursor-pointer group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
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
                                        d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    Reject
                                  </a>
                                )}

                                {selectedtab === 2 && (
                                  <a
                                    onClick={(e) => {
                                      setSelectedrowindex(0);
                                      setSelectedrow(x);
                                    }}
                                    className="cursor-pointer group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
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
                                        d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    Schedule Interview
                                  </a>
                                )}
                              </div>
                            </div>
                          </Transition>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {showdetail && (
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
                          Profile
                        </h2>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            onClick={(e) => {
                              setShowdetail(false);
                              setSelectedrow(undefined);
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
                                    src="/images/aditya.png"
                                    alt="Jobseeker Photo"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-5 sm:flex-1">
                              <div>
                                <div className="flex items-center space-x-2.5 mt-4">
                                  <h3 className="font-bold text-xl leading-7 text-gray-900 sm:text-2xl sm:leading-8">
                                    {jobseekerdata?.data?.englishname}
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
                                    {jobseekerdata?.data?.email}
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
                                    {jobseekerdata?.data?.mobile}
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
                                Cover Letter
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                <p>{jobseekerdata?.data?.coverletter}</p>
                              </dd>
                            </div>
                            <div className="sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Location
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {jobseekerdata?.data?.cityen}
                              </dd>
                            </div>
                            <div className="bg-gray-50  sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Education
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {words(
                                  [jobseekerdata?.data?.qualificationen],
                                  /[^,;]+/g,
                                ).map((kng, index) => (
                                  <span
                                    key={index}
                                    className="my-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800"
                                  >
                                    <svg
                                      className="mr-1.5 h-2 w-2 text-indigo-400"
                                      fill="currentColor"
                                      viewBox="0 0 8 8"
                                    >
                                      <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    {kng}
                                  </span>
                                ))}
                              </dd>
                            </div>
                            <div className="sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Total Experience
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {jobseekerdata?.data?.totalexperience} Yrs
                              </dd>
                            </div>
                            <div className="bg-gray-50 sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Experience
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                <div className="flex justify-between flex-wrap ">
                                  {words(
                                    [jobseekerdata?.data?.experiencae],
                                    /[^,;]+/g,
                                  ).map((kng, index) => (
                                    <span
                                      key={index}
                                      className="m-1 inline-flex items-center px-2 py-0.5 rounded text-sm font-medium leading-4 text-gray-700"
                                    >
                                      {kng}
                                    </span>
                                  ))}
                                </div>
                              </dd>
                            </div>
                            <div className="sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Skills
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {words(
                                  [jobseekerdata?.data?.skillen],
                                  /[^,;]+/g,
                                ).map((kng, index) => (
                                  <span
                                    key={index}
                                    className="m-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-green-100 text-green-800"
                                  >
                                    <svg
                                      className="mr-1.5 h-2 w-2 text-green-400"
                                      fill="currentColor"
                                      viewBox="0 0 8 8"
                                    >
                                      <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    {kng}
                                  </span>
                                ))}
                              </dd>
                            </div>

                            <div className="sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Tools Knowledge
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {words(
                                  [jobseekerdata?.data?.knowledgeen],
                                  /[^,;]+/g,
                                ).map((kng, index) => (
                                  <span
                                    key={index}
                                    className="m-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-yellow-100 text-yellow-800"
                                  >
                                    <svg
                                      className="mr-1.5 h-2 w-2 text-yellow-400"
                                      fill="currentColor"
                                      viewBox="0 0 8 8"
                                    >
                                      <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    {kng}
                                  </span>
                                ))}
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

OfferManager.getLayout = getLayout;
export const getServerSideProps = withSession;

export default OfferManager;
