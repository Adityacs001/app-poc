/** @jsxRuntime classic */
/** @jsx jsx */

import { sx, jsx } from "theme-ui";
import * as React from "react";
import { useRouter } from "next/router";
import { getLayout } from "@components/Layouts/BlankLayout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import Message from "@components/Message";
import useLocales from "../hooks/useLocales";
import useStore, { languageSelector } from "../store/index";
import classnames from "classnames";
const schema = yup.object().shape({
  username: yup.string().required("username is mandatory"),
  password: yup.string().required("password is mandatory"),
});

type LoginDTO = {
  username: string;
  password: string;
};
const SignIn = () => {
  const router = useRouter();

  const { translations } = useLocales();
  const memoizedlocalestate = useStore(React.useCallback(languageSelector, []));

  const { register, handleSubmit, formState, errors } = useForm<LoginDTO>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ username, password }) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      return router.push("/");
    } else {
      return cogoToast.error(
        <Message title="login" text="invalid credentials" type="error" />,
        {
          position: "bottom-center",
        },
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="bg-white flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div>
            <img className="h-auto w-auto" src="/logo.png" alt="Workflow" />
            <h2 className="mt-2 text-2xl leading-9 font-extrabold text-gray-900">
              {translations.t("signinmessage")}
            </h2>
            <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
              <span className="px-2">Or</span>
              <Link href="/registration">
                <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline hover:underline transition ease-in-out duration-150">
                  {translations.t("registerwithhra")}
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
                    {translations.t("orcontinuewith")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    {translations.t("username")}
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="username"
                      type="text"
                      name="username"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      ref={register}
                    />
                  </div>
                  <p className="text-red-500">{errors.username?.message}</p>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    {translations.t("password")}
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      ref={register}
                    />
                  </div>
                  <p className="text-red-500">{errors.password?.message}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="hidden">
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm leading-5 text-gray-900"
                    >
                      {translations.t("rememberme")}
                    </label>
                  </div>

                  <div className="text-sm leading-5">
                    <Link href="/forgotpassword">
                      <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        {translations.t("forgotpassword")}
                      </a>
                    </Link>
                  </div>
                </div>

                <div>
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      {translations.t("signin")}
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className=" hidden lg:block relative w-0 flex-1 md:flex md:flex-col  md:self-center">
        <ul className="flex items-end justify-end p-3">
          <li>
            <Link
              href={{ pathname: router.pathname, query: { ...router.query } }}
              locale={memoizedlocalestate === "en" ? "ae" : "en"}
            >
              <a
                className={classnames(
                  "uppercase rounded-full font-semibold   text-white bg-indigo-600 hover:bg-indigo-500",
                  {
                    "p-2.5  text-sm ": memoizedlocalestate === "en",
                  },
                  {
                    "px-2 py-1 text-base ": memoizedlocalestate === "ae",
                  },
                )}
              >
                {memoizedlocalestate === "en" ? "ae" : "en"}
              </a>
            </Link>
          </li>
        </ul>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl leading-normal font-bold text-gray-700 space-x-3">
              <span className="text-transparent bg-gradient-to-r bg-clip-text from-indigo-500 to-green-500">
                {translations.t("bannermessage")}
              </span>
              <span>{translations.t("bannermessagesub")}</span>
            </h2>
            <p className="mt-1 text-lg leading-7 text-gray-500 ">
              {translations.t("introcontent1")}
            </p>
            <p className="mt-1 text-sm leading-7 text-gray-500 ">
              {translations.t("introcontent2")}
            </p>
            <div className="ml-3 mt-3 inline-flex">
              <Link href="/addemployer">
                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                  {translations.t("register")}
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

SignIn.getLayout = getLayout;

export default SignIn;
