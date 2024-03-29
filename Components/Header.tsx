/** @jsx jsx */
import { jsx } from "@emotion/react";
const Header = () => (
  <div className="w-full md:flex  md:justify-between bg-gray-900 py-3 px-1">
    <div className="flex-1 min-w-0 w-full">
      <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
        Back End Developer
      </h2>
    </div>
    <div className="mt-4 flex md:mt-0 md:ml-4">
      <span className="shadow-sm rounded-md">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:shadow-outline-gray focus:border-gray-700 active:bg-gray-700 transition duration-150 ease-in-out"
        >
          Edit
        </button>
      </span>
      <span className="ml-3 shadow-sm rounded-md">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-600 active:bg-indigo-600 transition duration-150 ease-in-out"
        >
          Publish
        </button>
      </span>
    </div>
  </div>
);

export default Header;
