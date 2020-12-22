import React from "react";
import Link from "next/link";
const Logout = () => (
  <React.Fragment>
    <div className="w-full h-screen bg-indigo-600 ">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">You are loggedout successfully</span>
        </h2>
        <Link href="SignIn">
          <a className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto">
            Click here to Re-login
          </a>
        </Link>
      </div>
    </div>
  </React.Fragment>
);

export default Logout;
