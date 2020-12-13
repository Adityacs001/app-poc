import * as React from "react";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import MainHeader from "@components/MainHeader";
import { Router, useRouter } from "next/router";
import NotificationNav from "@components/NotificationNav";
import { useTable, usePagination } from "react-table";
import { Transition } from "@headlessui/react";
import { useQuery } from "react-query";
import withSession from "lib/session";
import unescape from "lodash/unescape";
import parse from "html-react-parser";

const getvacancytemplatelist = async (key: string) => {
  const response = await fetch(`/api/getvacancytemplatelist`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const getvacancytemplatedetails = async (key: string, rid: string) => {
  const response = await fetch(`/api/getvacancytemplatedetails?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <table className="w-full" {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr
              className="border-t border-gray-200"
              {...headerGroup.getHeaderGroupProps()}
            >
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th
                    className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    {...column.getHeaderProps()}
                  >
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>

      <tbody
        className="bg-white divide-y divide-gray-100"
        {...getTableBodyProps()}
      >
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td
                        className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium"
                        {...cell.getCellProps()}
                      >
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

const PositionProfile = ({ user }) => {
  const router = useRouter();
  const [selectedrow, setSelectedrow] = React.useState(0);
  const [showdetail, setShowdetail] = React.useState(false);
  const [detailrid, setDetailrid] = React.useState();

  let vacancytemplates: Array<any> = [];

  const { isLoading, isError, data, error } = useQuery(
    ["getvacancytemplatelist"],
    getvacancytemplatelist,
    {
      enabled: !!user,
      refetchOnWindowFocus: true,
    },
  );

  const {
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    data: templatedata,
    error: templateerror,
  } = useQuery(
    ["getvacancytemplatedetails", detailrid],
    getvacancytemplatedetails,
    {
      enabled: !!user && detailrid != undefined && detailrid != "",
      refetchOnWindowFocus: false,
    },
  );

  //React.useEffect(() => (vacancytemplates = data), [data]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: (originalRow, rowIndex) =>
          router.locale === "en"
            ? originalRow["jobtitleen"]
            : originalRow["jobtitleae"],
      },
      {
        Header: "Grade",
        accessor: (originalRow, rowIndex) =>
          router.locale === "en"
            ? originalRow["gradeen"]
            : originalRow["gradeae"],
      },
      {
        Header: () => null,
        id: "showoptions",
        accessor: "showoptions",
        Cell: ({ row }) => (
          <div className="absolute flex justify-end items-center">
            {!selectedrow && (
              <button
                onClick={(e) => {
                  setSelectedrow(row?.index + 1);
                }}
                id="project-options-menu-0"
                type="button"
                className="pb-10 w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            )}
            {selectedrow === row?.index + 1 && (
              <button
                onClick={(e) => setSelectedrow(0)}
                id={`actionmenu${row?.index + 1}`}
                type="button"
                className="pb-10 w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clipRule="evenodd"
                  />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              </button>
            )}

            <Transition
              show={selectedrow === row?.index + 1}
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
                      setDetailrid(row?.original.rid);
                    }}
                    className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                  >
                    <svg
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    View
                  </a>
                  <a
                    onClick={(e) =>
                      router.push(`vacancytemplate/${row?.original.rid}`)
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
                <div className="border-t border-gray-100"></div>
                <div className="py-1">
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
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Close
                  </a>
                </div>
              </div>
            </Transition>
          </div>
        ),
      },
    ],
    [selectedrow],
  );

  const onFormSubmit = React.useCallback(
    ({ issaved, message }: { issaved: boolean; message: string }) => {
      console.log(issaved, message);
    },
    [],
  );

  return (
    <React.Fragment>
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader
            title="Vacancy Templates"
            subtitle=""
            isbordered={false}
          />
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
            title="List of all Vacancy templates"
            subtitle="Template available and active will be available in posting form"
            isbordered={false}
          />
        </div>
        <div className="px-6">
          <span className="shadow-sm rounded-md">
            <button
              onClick={(e) =>
                router.push({
                  pathname: `/vacancytemplate/${process.env.NEXT_PUBLIC_RID_NEW}`,
                })
              }
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Add New template
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
              <button className=" relative inline-flex items-center px-4  border border-gray-300 text-sm leading-5 font-medium  text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-indigo-500 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
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
              </button>
            </div>
          </div>
        </div>
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          {!isLoading && data != undefined && data != null && (
            <Table columns={columns} data={data.data} />
          )}
        </div>
        {showdetail && (
          <div className="absolute inset-0 overflow-hidden h-screen">
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
                <section className="h-screen fixed inset-y-0 right-0 pl-10 max-w-full flex">
                  <Transition
                    show={showdetail}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                    className="w-screen max-w-xl"
                  >
                    <div className="h-full flex flex-col bg-gray-100 shadow-xl overflow-y-scroll">
                      <header className="space-y-1 py-6 px-4 bg-indigo-700 sm:px-6">
                        <div className="flex items-center justify-between space-x-3">
                          <h2 className="text-lg leading-7 font-medium text-white">
                            {templatedata?.data?.jobtitleen}
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
                        <div className="hidden">
                          <p className="text-sm leading-5 text-indigo-300">
                            Some additional details
                          </p>
                        </div>
                      </header>
                      <div className="relative flex-1 py-6 px-4 sm:px-6">
                        <div className="absolute inset-0">
                          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-2 border-b border-gray-200 sm:px-6">
                              <h3 className="text-lg leading-6 font-medium text-gray-900"></h3>
                              <div className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                                <p className="inline-block">
                                  Created by{" "}
                                  <span className="px-1 text-gray-900">
                                    {templatedata?.data?.createdby}
                                  </span>
                                  on{" "}
                                  <span className="px-1 text-gray-900">
                                    {templatedata?.data?.createddate}
                                  </span>
                                </p>
                                <p className="inline-block mt-2">
                                  Modified by
                                  <span className="px-1 text-gray-900">
                                    {templatedata?.data?.modifiedby}
                                  </span>
                                  on{" "}
                                  <span className="px-1 text-gray-900">
                                    {templatedata?.data?.modifieddate}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div>
                              <dl>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Grade
                                  </dt>
                                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {templatedata?.data?.gradeen}
                                  </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Job Category
                                  </dt>
                                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {templatedata?.data?.jobcategoryen}
                                  </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Job Role
                                  </dt>
                                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {templatedata?.data?.jobroleen}
                                  </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Experience
                                  </dt>
                                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {templatedata?.data?.experience} Yrs
                                  </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Salary Range
                                  </dt>
                                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {templatedata?.data?.salaryrange} AED
                                  </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Educations
                                  </dt>
                                  <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    <ul className="border border-gray-200 rounded-md">
                                      {templatedata?.data?.educationsen?.map(
                                        (val, index) => (
                                          <li
                                            key={index}
                                            className="p-2 border-gray-200  border-b-2 flex items-center justify-between text-sm leading-5"
                                          >
                                            <span className="w-full">
                                              {val}
                                            </span>
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
                                      {templatedata?.data?.skillsen?.map(
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
                                      {templatedata?.data?.abilitiesen?.map(
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
                                          templatedata?.data?.responsbilities,
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
                                        unescape(
                                          templatedata?.data?.description,
                                        ),
                                      )}
                                    </span>
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
      </div>
    </React.Fragment>
  );
};

PositionProfile.getLayout = getLayout;

export const getServerSideProps = withSession;

export default PositionProfile;
