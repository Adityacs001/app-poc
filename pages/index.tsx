import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Flex } from "reflexbox";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <Flex width="100%" maxHeight="64px" flexDirection="column">
        <Header />
        <div className="px-1">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Pinned Projects
          </h2>
          <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <li className="col-span-1 flex shadow-sm rounded-md">
              <div className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm leading-5 font-medium rounded-l-md">
                GA
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                  <a
                    href="#"
                    className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
                  >
                    Graph API
                  </a>
                  <p className="text-gray-500">16 Members</p>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>

            <li className="col-span-1 flex shadow-sm rounded-md">
              <div className="flex-shrink-0 flex items-center justify-center w-16 bg-purple-600 text-white text-sm leading-5 font-medium rounded-l-md">
                CD
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                  <a
                    href="#"
                    className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
                  >
                    Component Design
                  </a>
                  <p className="text-gray-500">12 Members</p>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>

            <li className="col-span-1 flex shadow-sm rounded-md">
              <div className="flex-shrink-0 flex items-center justify-center w-16 bg-orange-500 text-white text-sm leading-5 font-medium rounded-l-md">
                T
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                  <a
                    href="#"
                    className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
                  >
                    Templates
                  </a>
                  <p className="text-gray-500">16 Members</p>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>

            <li className="col-span-1 flex shadow-sm rounded-md">
              <div className="flex-shrink-0 flex items-center justify-center w-16 bg-green-400 text-white text-sm leading-5 font-medium rounded-l-md">
                RC
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                  <a
                    href="#"
                    className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150"
                  >
                    React Components
                  </a>
                  <p className="text-gray-500">8 Members</p>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Flex>
    </>
  );
}
