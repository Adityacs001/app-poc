/** @jsx jsx */
import React, { useRef } from "react";
import { useRouter } from "next/router";
import { getLayout } from "@/components/Layouts/BlankLayout";
import { jsx, Box } from "theme-ui";
import Link from "next/link";

const SignInPage = () => {
  const router = useRouter();
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="bg-white flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div>
            <img className="h-auto w-auto" src="/logo.png" alt="Workflow" />
            <h2 className="mt-2 text-3xl leading-9 font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
              <span className="px-2">Or</span>
              <Link href="/registration">
                <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline hover:underline transition ease-in-out duration-150">
                  Register with HRA
                </a>
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm leading-5">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="email"
                      type="email"
                      ref={emailInput}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="password"
                      type="password"
                      ref={passwordInput}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm leading-5 text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm leading-5">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Sign in
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className=" hidden lg:block relative w-0 flex-1 md:flex md:flex-col  md:self-center">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl leading-normal font-bold text-gray-900 sm:text-4xl">
              Some good message for employers.
            </h2>
            <p className="mt-1 text-xl leading-7 text-gray-500 ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Repellendus repellat laudantium.
            </p>
            <div className="ml-3 mt-3 inline-flex">
              <Link href="/registration">
                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                  Register
                </a>
              </Link>
            </div>
          </div>
        </div>
        <img
          className="mx-auto max-w-2xl"
          src="/images/banner1.svg"
          alt="Employer banner"
        />
      </div>
    </div>
  );
};

SignInPage.getLayout = getLayout;

export default SignInPage;
