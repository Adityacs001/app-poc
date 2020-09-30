import Head from "next/head";
import classNames from "classnames";
import { motion } from "framer-motion";
import MainHeader from "@/components/MainHeader";
import { getLayout } from "@/components/Layouts/PrivateLayout";

const Index = () => {
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
  return (
    <>
      <div className="py-2">
        <MainHeader
          title="Overview"
          subtitle="Some additional details goes here which looks good"
        ></MainHeader>
      </div>

      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", delay: 0.5 }}
        className="my-2 py-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div
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
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-cool-gray-100"
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
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-cool-gray-500 truncate">
                    Total Postings
                  </dt>
                  <dd>
                    <div className="text-lg leading-7 font-medium text-cool-gray-900">
                      2,000
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-cool-gray-50 px-5 py-3">
            <div className="text-sm leading-5">
              <a
                href="#"
                className="font-medium text-teal-600 hover:text-teal-900 transition ease-in-out duration-150"
              >
                View all
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={cardvariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0  bg-indigo-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-cool-gray-100"
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
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-cool-gray-500 truncate">
                    Total Active openings
                  </dt>
                  <dd>
                    <div className="text-lg leading-7 font-medium text-cool-gray-900">
                      500
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-cool-gray-50 px-5 py-3">
            <div className="text-sm leading-5">
              <a
                href="#"
                className="font-medium text-teal-600 hover:text-teal-900 transition ease-in-out duration-150"
              >
                View all
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 500 }}
          whileHover={{
            scale: 1.1,
            textShadow: "0px 0px 8px rgb(255,255,255)",
          }}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0  bg-green-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-cool-gray-100"
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
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-cool-gray-500 truncate">
                    Total Hiring (U.A.E Nationals / Expats)
                  </dt>
                  <dd>
                    <div className="text-lg leading-7 font-medium text-cool-gray-900">
                      100/20
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-cool-gray-50 px-5 py-3">
            <div className="text-sm leading-5">
              <a
                href="#"
                className="font-medium text-teal-600 hover:text-teal-900 transition ease-in-out duration-150"
              >
                View all
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

Index.getLayout = getLayout;

export default Index;
