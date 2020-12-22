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
import Fuse from "fuse.js";
import words from "lodash/words";
import cogoToast from "cogo-toast";
import Message from "@components/Message";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MatchingDTO } from "../lib/commontypes";
import { useSelectStyles } from "../hooks/useHelper";
import Select from "react-select";
import map from "lodash/map";
import parse from "html-react-parser";
import PageTitle from "@components/PageTitle";

const getjobseekerlist = async ({ queryKey }) => {
  const [_key, { searchterm, page, pagesize, indexname }] = queryKey;
  const response = await fetch(
    `/api/getjobseekerlist?query=${searchterm}&page=${page}&pageSize=${pagesize}&index=${indexname}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json " },
    },
  );

  const result = await response.json();
  return result;
};

const getavailablejobseekerlist = async ({ queryKey }) => {
  const [_key, { keyword, currentpage, pagesize }] = queryKey;

  const response = await fetch(
    `/api/getavailablejobseekers?keyword=${keyword}&currentpage=${currentpage}&pagesize=${pagesize}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json " },
    },
  );

  const result = await response.json();
  return result;
};

const getviewedjobseekers = async ({ queryKey }) => {
  const [_key, { keyword, currentpage, pagesize }] = queryKey;

  const response = await fetch(
    `/api/getviewedjobseekers?keyword=${keyword}&currentpage=${currentpage}&pagesize=${pagesize}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json " },
    },
  );

  const result = await response.json();
  return result;
};

const getfavouritejobseekers = async ({ queryKey }) => {
  const [_key, { keyword, currentpage, pagesize }] = queryKey;

  const response = await fetch(
    `/api/getfavouritejobseekers?keyword=${keyword}&currentpage=${currentpage}&pagesize=${pagesize}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json " },
    },
  );

  const result = await response.json();
  return result;
};

const getmatchedjobseekers = async ({ queryKey }) => {
  cp;
  const [_key, { keyword, currentpage, pagesize }] = queryKey;

  const response = await fetch(
    `/api/getmatchedjobseekers?keyword=${keyword}&currentpage=${currentpage}&pagesize=${pagesize}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json " },
    },
  );

  const result = await response.json();
  return result;
};

const getunlistedjobseekers = async ({ queryKey }) => {
  const [_key, { keyword, currentpage, pagesize }] = queryKey;

  const response = await fetch(
    `/api/getunlistedjobseekers?keyword=${keyword}&currentpage=${currentpage}&pagesize=${pagesize}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json " },
    },
  );

  const result = await response.json();
  return result;
};

const getjobseekerdetails = async ({ queryKey }) => {
  const [_key, { rid }] = queryKey;

  const response = await fetch(`/api/getjobseekedetail?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const getactivevacancyformatching = async ({ queryKey }) => {
  const response = await fetch(`/api/getactivevacancyformatching`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const CVManager = ({ user }) => {
  const DefaultPageSize = 20;
  const DefaultPage = 1;
  const indexname = "availablejobseekers";

  const router = useRouter();
  const [selectedrow, setSelectedrow] = React.useState();
  const [showdetail, setShowdetail] = React.useState(false);
  const [selectrowindex, setSelectedrowindex] = React.useState(0);
  const [selectedtab, setSelectedtab] = React.useState(1);
  const [selectedview, setSelectedview] = React.useState(2);
  const [searchterm, setSearchterm] = React.useState("");
  const [page, setPage] = React.useState(DefaultPage);
  const [pagesize, setPagesize] = React.useState(DefaultPageSize);
  const [jsitems, setJSItems] = React.useState([]);
  const [showmatchingform, setMatchingform] = React.useState(false);

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery(
    ["getjobseekerlist", { searchterm, page, pagesize, indexname }],
    getjobseekerlist,
    {
      enabled: !!user && selectedtab === 1 && !showdetail,
      refetchOnWindowFocus: true,
    },
  );

  // const { isLoading, data, isFetching } = useQuery(
  //   ["getavailablejobseekerlist", searchterm, page, pagesize],
  //   getavailablejobseekerlist,
  //   {
  //     enabled:
  //       !!user &&
  //       selectedtab === 1 &&
  //       (selectedrow == undefined || selectedrow == ""),
  //     refetchOnWindowFocus: true,
  //   },
  // );

  const {
    isLoading: isviewedjsloading,
    data: viewedjsata,
    isFetching: isviewedjsfetching,
  } = useQuery(
    [
      "getviewedjobseekers",
      { keyword: searchterm, currentpage: page, pagesize: pagesize },
    ],
    getviewedjobseekers,
    {
      enabled: !!user && selectedtab === 2 && !showdetail,
      refetchOnWindowFocus: true,
    },
  );

  const {
    isLoading: isfavouritejsloading,
    data: favouritejsata,
    isFetching: isfavoruitejsfetching,
  } = useQuery(
    [
      "getfavouritejobseekers",
      { keyword: searchterm, currentpage: page, pagesize: pagesize },
    ],
    getfavouritejobseekers,
    {
      enabled: !!user && selectedtab === 3 && !showdetail,
      refetchOnWindowFocus: true,
    },
  );

  const {
    isLoading: ismatchedjsloading,
    data: matchedjsata,
    isFetching: ismatchedjsfetching,
  } = useQuery(
    [
      "getmatchedjobseekers",
      { keyword: searchterm, currentpage: page, pagesize: pagesize },
    ],
    getmatchedjobseekers,
    {
      enabled: !!user && selectedtab === 4 && !showdetail,
      refetchOnWindowFocus: true,
    },
  );

  const {
    isLoading: isunlistjsloading,
    data: unlistjsdata,
    isFetching: isunlistjsfetching,
  } = useQuery(
    [
      "getunlistedjobseekers",
      { keyword: searchterm, currentpage: page, pagesize: pagesize },
    ],
    getunlistedjobseekers,
    {
      enabled: !!user && selectedtab === 5 && !showdetail,
      refetchOnWindowFocus: true,
    },
  );

  const {
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    data: jobseekerdata,
    error: jobseekererror,
  } = useQuery(
    ["getjobseekerdetails", { rid: selectedrow }],
    getjobseekerdetails,
    {
      enabled: !!user && selectedrow != undefined && selectedrow != "",
      refetchOnWindowFocus: false,
    },
  );

  const {
    isLoading: activevacancyisLoading,
    isError: activevacancyisError,
    data: activevacancydata,
    error: activevacancyerror,
  } = useQuery(["getactivevacancyformatching"], getactivevacancyformatching, {
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  const schema = yup.object().shape({
    selectedvacancies: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        }),
      )
      .nullable()
      .required("select one of vacancies to add candidate to it"),
  });

  const {
    register,
    handleSubmit,
    formState,
    errors,
    reset,
    control,
  } = useForm<MatchingDTO>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onMatchingSubmit = async ({ selectedvacancies }) => {
    const selectedjobseekers: Array<string> = [];

    if (selectedrow != "" && selectedrow != undefined)
      selectedjobseekers.push(selectedrow);

    const response = await fetch("/api/addjobseekertovacancy", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({
        selectedvacancies: map(selectedvacancies, "value"),
        selectedjobseekers,
      }),
    });

    if (response.ok) {
      setSelectedrowindex(0);
      setSelectedrow(undefined);
      setShowdetail(false);
      setMatchingform(false);
      return cogoToast.success(
        <Message
          title="Vacancy matching"
          text="Jobseeker added to vacancy successfully"
          type="success"
        />,
        {
          position: "bottom-center",
        },
      );
    } else {
      return cogoToast.error(
        <Message
          title="Vacancy Matching"
          text="Something went wrong, please try sometime later"
          type="error"
        />,
        {
          position: "bottom-center",
        },
      );
    }
  };

  React.useEffect(() => {
    if (data != undefined && data.data != undefined) {
      setJSItems(data.data.items);
      //setJSItems(data.data);
    }
  }, [isFetching]);

  React.useEffect(() => {
    if (viewedjsata != undefined && viewedjsata.data != undefined) {
      setJSItems(viewedjsata.data.items);
    }
  }, [isviewedjsfetching]);

  React.useEffect(() => {
    if (favouritejsata != undefined && favouritejsata.data != undefined) {
      setJSItems(favouritejsata.data.items);
    }
  }, [isfavoruitejsfetching]);

  React.useEffect(() => {
    if (matchedjsata != undefined && matchedjsata.data != undefined) {
      setJSItems(matchedjsata.data.items);
    }
  }, [ismatchedjsfetching]);

  React.useEffect(() => {
    if (unlistjsdata != undefined && unlistjsdata.data != undefined) {
      setJSItems(unlistjsdata.data.items);
    }
  }, [isunlistjsfetching]);

  // const fuse = new Fuse(jsitems, {
  //   keys: [
  //     { name: "jobseekerid", weight: 1 },
  //     { name: "englishname", weight: 1 },
  //     { name: "cityen", weight: 1 },
  //     "qualificationen",
  //     "experiencen",
  //     "certificationen",
  //     "coverletter",
  //     "cvcontent",
  //     "experiencen",
  //     "skillen",
  //     "knowledgeen",
  //   ],
  //   //useExtendedSearch: true,
  //   //threshold: 0,
  //   includeScore: true,
  //   isCaseSensitive: false,
  //   shouldSort: true,
  //   minMatchCharLength: 3,
  //   ignoreFieldNorm: true,
  //   ignoreLocation: true,
  // });

  // const fuseresults = fuse.search(searchterm);
  // const jobseekerresults = searchterm
  //   ? fuseresults.map((result) => result.item)
  //   : jsitems;

  React.useEffect(() => {
    setJSItems([]);
    setSelectedrowindex(0);
    setSelectedrow(undefined);
  }, [selectedtab]);

  // React.useEffect(() => {
  //   console.log(fuseresults);
  // }, [showdetail]);

  const onAddTofavorite = async (rid) => {
    const response = await fetch("/api/addtofavourite", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({ rid }),
    });

    if (response.ok) {
      setSelectedrowindex(0);
      setSelectedrow(undefined);
      return cogoToast.success(
        <Message
          title="Add to favourite"
          text="Record added to favourite successfully"
          type="success"
        />,
        {
          position: "bottom-center",
        },
      );
    } else {
      return cogoToast.error(
        <Message
          title="Add to favourite"
          text="sommething went wrong , try sometime later"
          type="error"
        />,
        {
          position: "bottom-center",
        },
      );
    }
  };

  const onAddToUnList = async (rid) => {
    const response = await fetch("/api/addtounlisted", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({ rid }),
    });

    if (response.ok) {
      setSelectedrowindex(0);
      setSelectedrow(undefined);
      return cogoToast.success(
        <Message
          title="Add to Unlist"
          text="Record added to unlist successfully"
          type="success"
        />,
        {
          position: "bottom-center",
        },
      );
    } else {
      return cogoToast.error(
        <Message
          title="Add to favourite"
          text="sommething went wrong , try sometime later"
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
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader title="Jobseekers" subtitle="" isbordered={false} />
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
            title="List of all jobseekers"
            subtitle="Filtered unseen, viewed, added , favourite ,unlisted "
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
                  onChange={(e) => setSearchterm(e.target.value)}
                  type="text"
                  name="setSearchterm"
                  id="setSearchterm"
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
        <div className="w-full flex items-end justify-between">
          <div className="px-3 pt-3    ">
            <div className="sm:hidden">
              <select
                aria-label="Selected tab"
                className="form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
              >
                <option value="1">Available</option>

                <option value="2">Viewed</option>

                <option value="3">Favourite</option>

                <option value="4">Matched</option>

                <option value="5">Unlisted</option>
              </select>
            </div>

            <div className="hidden sm:block">
              <nav className="-mb-px flex space-x-8">
                <a
                  onClick={(e) => setSelectedtab(1)}
                  className={classnames(
                    "flex items-center justify-between whitespace-no-wrap p-2 font-medium text-base leading-5 cursor-pointer",
                    {
                      "border-b-4   border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700":
                        selectedtab === 1,
                    },
                    {
                      " text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300":
                        selectedtab != 1,
                    },
                  )}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="inline-block px-1">Available</span>
                </a>

                <a
                  onClick={(e) => setSelectedtab(2)}
                  className={classnames(
                    "flex items-center justify-between whitespace-no-wrap p-2  font-medium text-base leading-5 cursor-pointer",
                    {
                      "border-b-4 border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700":
                        selectedtab === 2,
                    },
                    {
                      "  text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300":
                        selectedtab != 2,
                    },
                  )}
                  aria-current="page"
                >
                  <svg
                    className="w-6 h-6"
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

                  <span className="inline-block px-1">Viewed</span>
                </a>

                <a
                  onClick={(e) => setSelectedtab(3)}
                  className={classnames(
                    "flex items-center justify-between  whitespace-no-wrap p-2  font-medium text-base leading-5 cursor-pointer",
                    {
                      "border-b-4 border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700":
                        selectedtab === 3,
                    },
                    {
                      "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300":
                        selectedtab != 3,
                    },
                  )}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <span className="inline-block px-1">Favourite</span>
                </a>

                <a
                  onClick={(e) => setSelectedtab(4)}
                  className={classnames(
                    "flex items-center justify-between whitespace-no-wrap p-2  font-medium text-base leading-5 cursor-pointer",
                    {
                      "border-b-4 border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700":
                        selectedtab === 4,
                    },
                    {
                      "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300":
                        selectedtab != 4,
                    },
                  )}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path
                      fillRule="evenodd"
                      d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="inline-block px-1">Matched</span>
                </a>
                <a
                  onClick={(e) => setSelectedtab(5)}
                  className={classnames(
                    "flex items-center justify-between whitespace-no-wrap p-2  font-medium text-base leading-5 cursor-pointer",
                    {
                      "border-b-4 border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700":
                        selectedtab === 5,
                    },
                    {
                      "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300":
                        selectedtab != 5,
                    },
                  )}
                >
                  <svg
                    className="w-6 h-6"
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

                  <span className="inline-block px-1">Unlisted</span>
                </a>
              </nav>
            </div>
          </div>
          <ul className="flex justify-between px-4">
            <li>
              <button
                onClick={() => setSelectedview(1)}
                className={classnames(
                  " text-sm leading-5 font-medium  text-gray-500  hover:bg-white focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150",
                  {
                    "text-indigo-500 hover:text-gray-800 ": selectedview === 1,
                  },
                  {
                    "text-gray-500 hover:text-gray-800 ": selectedview !== 1,
                  },
                )}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedview(2)}
                className={classnames(
                  "px-2 text-sm leading-5 font-medium  text-gray-500  hover:bg-white focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150",
                  {
                    "text-indigo-500 hover:text-gray-800 ": selectedview === 2,
                  },
                  {
                    "text-gray-500 hover:text-gray-800 ": selectedview !== 2,
                  },
                )}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
        <div className="align-middle inline-block min-w-full border-b border-gray-200 ">
          {selectedview === 1 && (
            <table className="min-w-full">
              <thead>
                <tr className="border-t border-gray-200">
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Name</span>
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    JobseekerID
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {!isLoading &&
                  !!jsitems &&
                  jsitems.map((x, i) => (
                    <tr key={i}>
                      <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                        <div className="flex items-center">
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
                        </div>
                      </td>

                      <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                        <div className="flex items-center space-x-2">
                          <span className="flex-shrink-0 text-xs leading-5 font-medium">
                            {x?.englishname}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                        <div className="flex items-center space-x-2">
                          <span className="flex-shrink-0 text-xs leading-5 font-medium">
                            {x?.jobseekerid}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                        <div className="flex items-center space-x-2">
                          <span className="flex-shrink-0 text-xs leading-5 font-medium">
                            {x?.totalexperience} Yrs
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
                        <div className="flex items-center space-x-2">
                          <span className="flex-shrink-0 text-xs leading-5 font-medium">
                            {x?.cityen}
                          </span>
                        </div>
                      </td>
                      <td className="pr-6">
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
                                    setSelectedrow(x?.rid);
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
                                  View
                                </a>

                                {selectedtab !== 3 && (
                                  <a
                                    onClick={(e) => {
                                      setSelectedrowindex(0);
                                      setSelectedrow(x?.rid);
                                      onAddTofavorite(x?.rid);
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
                                    Add to Favourite
                                  </a>
                                )}

                                {selectedtab !== 5 && (
                                  <a
                                    onClick={(e) => {
                                      setSelectedrowindex(0);
                                      setSelectedrow(x?.rid);
                                      onAddToUnList(x?.rid);
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
                                    Mark unlisted
                                  </a>
                                )}
                              </div>
                              {false && (
                                <React.Fragment>
                                  <div className="border-t border-gray-100"></div>
                                  <div className="py-1">
                                    <a
                                      onClick={(e) => {
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
                                        <path
                                          clipRule="evenodd"
                                          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1H8a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1V9z"
                                          fillRule="evenodd"
                                        />
                                      </svg>
                                      Add to vacancy
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
          )}

          {selectedview === 2 && (
            <div className="px-4 py-2">
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {!isLoading &&
                  !!jsitems &&
                  jsitems.map((x, i) => (
                    <li
                      key={i}
                      className="col-span-1 bg-white rounded-lg shadow"
                    >
                      <div className="w-full flex items-start justify-between p-3 space-x-6">
                        <div className="flex-1 truncate">
                          <div className="flex items-center justify-between space-x-3">
                            <div className="flex items-baseline justify-between">
                              <h3 className="text-gray-900 text-sm leading-5 font-medium truncate flex flex-col">
                                {}
                                <span className="inline-block">
                                  {x?.englishname}
                                </span>
                                <span className="inline-block text-xs text-gray-400">
                                  {x?.jobseekerid}
                                </span>
                              </h3>
                              <span className="flex-shrink-0 inline-block mx-2 px-2 py-0.5 text-teal-800 text-xs leading-4 font-medium bg-yellow-50 rounded-full">
                                {x?.totalexperience} Yrs
                              </span>
                            </div>
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

                          <p className="mt-1 text-gray-400 text-sm leading-5 truncate">
                            {x?.coverletter}
                          </p>
                          <p className="mt-1 text-gray-500 text-sm leading-5 truncate">
                            {x?.qualificationen}
                          </p>
                          <p className="mt-1 text-gray-700 text-sm leading-5 truncate">
                            {x?.experiencen}
                          </p>
                          <p className="mt-2 flex flex-wrap justify-start">
                            {words([x?.knowledgeen], /[^,;]+/g).map(
                              (kng, index) => (
                                <span
                                  key={index}
                                  className="m-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800"
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
                              ),
                            )}
                          </p>
                          <p className="mt-2  flex flex-wrap justify-start">
                            {words([x?.skillen], /[^,;]+/g).map(
                              (kng, index) => (
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
                              ),
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-gray-200">
                        <div className="-mt-px flex">
                          <div className="w-0 flex-1 flex border-r border-gray-200">
                            <a
                              onClick={(e) => {
                                setSelectedrowindex(0);
                                setSelectedrow(x?.rid);
                                setShowdetail(true);
                              }}
                              className="cursor-pointer relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
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

                              <span className="ml-3">View </span>
                            </a>
                          </div>
                          {selectedtab !== 3 && (
                            <div className="w-0 flex-1 flex border-r border-gray-200">
                              <a
                                onClick={(e) => {
                                  setSelectedrowindex(0);
                                  setSelectedrow(x?.rid);
                                  onAddTofavorite(x?.rid);
                                }}
                                className="cursor-pointer relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
                              >
                                <svg
                                  className="h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-3">Favourite</span>
                              </a>
                            </div>
                          )}
                          {selectedtab !== 5 && (
                            <div className="-ml-px w-0 flex-1 flex">
                              <a
                                onClick={(e) => {
                                  setSelectedrowindex(0);
                                  setSelectedrow(x?.rid);
                                  onAddToUnList(x?.rid);
                                }}
                                className="cursor-pointer relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
                              >
                                <svg
                                  className="h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
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
                                <span className="ml-3">Unlist</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
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
                  <div className=" flex-1 flex flex-col  overflow-y-scroll">
                    <header className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <h2 className="text-lg leading-7 font-medium text-gray-900">
                          Profile
                        </h2>
                        <div className="h-7 flex items-center">
                          <button
                            onClick={(e) => {
                              setShowdetail(false);
                              setSelectedrow(undefined);
                              setMatchingform(false);
                            }}
                            aria-label="Close panel"
                            className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
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
                    </header>
                    <div className="py-1 relative flex-1">
                      <div className="w-full sm:flex-1">
                        <div className="divide-y divide-gray-200">
                          <div className="pb-4">
                            <div className="bg-indigo-700 h-24 sm:h-20 lg:h-28"></div>
                            <div className="-mt-12 flow-root px-4 space-y-6 sm:-mt-8 sm:flex sm:items-end sm:px-6 sm:space-x-6 lg:-mt-15">
                              <div>
                                <div className="-m-1 flex items-start">
                                  <div className="inline-flex rounded-lg overflow-hidden border-4 border-white">
                                    {jobseekerdata?.data?.photo == "" ? (
                                      <svg
                                        className="w-24 h-24"
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
                                        className="flex-shrink-0 h-24 w-24 sm:h-40 sm:w-40 lg:w-48 lg:h-48"
                                        src={`data:image/png;base64,${jobseekerdata?.data?.photo}`}
                                        alt=""
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-5 sm:flex-1">
                                <div>
                                  <div className="flex items-center space-x-2.5 mt-2">
                                    <h3 className="font-bold text-xl leading-7 text-gray-900 sm:text-2xl sm:leading-8">
                                      {jobseekerdata?.data?.englishname}
                                    </h3>
                                  </div>
                                  <p className="text-sm leading-5 text-gray-500 flex items-end">
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
                                  <p className="text-sm leading-5 text-gray-500 flex items-end ">
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
                                <div className="flex flex-wrap">
                                  {!showmatchingform && (
                                    <span className="flex-shrink-0 w-full inline-flex rounded-md shadow-sm sm:flex-1">
                                      <button
                                        onClick={(e) => {
                                          setMatchingform(true);
                                        }}
                                        type="button"
                                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-xs leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                                      >
                                        Add to Vacancy
                                      </button>
                                    </span>
                                  )}
                                  <span className="mt-3 flex-1 w-full inline-flex rounded-md shadow-sm sm:mt-0 sm:ml-3">
                                    <button
                                      onClick={(e) => {
                                        setSelectedrowindex(0);
                                        setSelectedrow(
                                          jobseekerdata?.data?.rid,
                                        );
                                        onAddTofavorite(
                                          jobseekerdata?.data?.rid,
                                        );
                                        setShowdetail(false);
                                        setMatchingform(false);
                                      }}
                                      type="button"
                                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                                    >
                                      Mark favouriate
                                    </button>
                                  </span>

                                  <span className="mt-3 flex-1 w-full inline-flex rounded-md shadow-sm sm:mt-0 sm:ml-3">
                                    <button
                                      onClick={(e) => {
                                        setSelectedrowindex(0);
                                        setSelectedrow(
                                          jobseekerdata?.data?.rid,
                                        );
                                        onAddToUnList(jobseekerdata?.data?.rid);
                                        setShowdetail(false);
                                        setMatchingform(false);
                                      }}
                                      type="button"
                                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                                    >
                                      Unlist
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-5 sm:px-0 sm:py-0">
                            {showmatchingform && (
                              <div className="relative flex-1">
                                <div className="p-1">
                                  <form
                                    onSubmit={handleSubmit(onMatchingSubmit)}
                                    className="px-2"
                                  >
                                    <div className="p-">
                                      <div className="grid grid-cols-1">
                                        <div className="col-span-1">
                                          <label
                                            htmlFor="selectedvacancies"
                                            className="block text-md font-medium leading-5 text-gray-700"
                                          >
                                            Select vacancies
                                          </label>
                                          <div className="mt-1 flex rounded-md shadow-sm">
                                            <Controller
                                              defaultValue={[]}
                                              isMulti
                                              id="selectedvacancies"
                                              inputId="selectedvacancies"
                                              instanceId="selectedvacancies"
                                              name="selectedvacancies"
                                              as={Select}
                                              options={activevacancydata?.data}
                                              control={control}
                                              rules={{ required: true }}
                                              isClearable="true"
                                              className="w-full rounded-none z-50"
                                              styles={useSelectStyles}
                                            />
                                          </div>
                                        </div>
                                        <p className="text-red-500">
                                          {errors.selectedvacancies?.message}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="p-2 text-right sm:px-6">
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
                            )}

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
                                      {kng}ssdsdsd
                                    </span>
                                  ))}
                                </dd>
                              </div>

                              <div className="bg-gray-50 sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
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

                              <div className="sm:flex sm:space-x-6 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                                <dt className="text-sm leading-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                  CV
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                  <span className="">
                                    {parse(
                                      unescape(jobseekerdata?.data?.cvcontent),
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
                  <div className="flex-shrink-0 p-2 flex justify-end">
                    <span className="inline-flex rounded-md shadow-sm justify-between">
                      <button
                        onClick={(e) => {
                          setShowdetail(false);
                          setSelectedrow(undefined);
                          setMatchingform(false);
                        }}
                        type="button"
                        className="mx-2 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Close
                      </button>
                    </span>
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

CVManager.getLayout = getLayout;

export const getServerSideProps = withSession;

export default CVManager;
