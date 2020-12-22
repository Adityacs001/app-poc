import React from "react";
import { useRouter } from "next/router";
import withSession from "lib/session";
import { getLayout } from "@components/Layouts/PrivateLayout";
import MainHeader from "@components/MainHeader";
import NotificationNav from "@components/NotificationNav";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import Message from "@components/Message";
import classnames from "classnames";
import useLocales from "../hooks/useLocales";
import PageTitle from "@components/PageTitle";

const ChangePasswordPage = (props) => {
  const router = useRouter();
  const { translations } = useLocales();

  const schema = yup.object().shape({
    currentpassword: yup.string().required("Enter your current password"),
    newpassword: yup
      .string()
      .min(8, "minimum 8 characters")
      .matches(
        /^.*(?=.{10,})(?=.*[a-z])(?=.*[A-Z]).*$/,
        "Password can only contain Latin letters.",
      )
      .required("Enter new password"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("newpassword"), null], "Passwords must match")
      .required("Enter confirm password"),
  });

  type ChangePasswordDTO = {
    currentpassword: string;
    newpassword: string;
    confirmpassword: string;
  };

  const changepasswordmethods = useForm<ChangePasswordDTO>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState,
    errors,
    reset,
  } = changepasswordmethods;

  const onChangePasswordSubmit = async ({
    currentpassword,
    newpassword,
    confirmpassword,
  }) => {
    const response = await fetch("/api/changepassword", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({ currentpassword, newpassword, confirmpassword }),
    });

    if (response.ok) {
      cogoToast.error(
        <Message
          title="Change password"
          text="saved successfully"
          type="success"
        />,
        {
          position: "bottom-center",
        },
      );
      return router.push("/logout");
    } else {
      return cogoToast.error(
        <Message
          title="Change password"
          text="Current password didn't matched..."
          type="error"
        />,
        {
          position: "bottom-center",
        },
      );
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      return router.push("/SignIn");
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader
            title={translations.t("changepassword")}
            subtitle=""
            isbordered={false}
          />
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <NotificationNav />
        </div>
      </div>
      <div className="flex-grow bg-gray-100 p-4 ">
        <div className="bg-white shadow sm:rounded-lg max-w-sm mx-auto">
          <div className="px-4 py-5 sm:p-6 ">
            <FormProvider {...changepasswordmethods}>
              <form
                onSubmit={handleSubmit(onChangePasswordSubmit)}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="currentpassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="currentpassword"
                      name="currentpassword"
                      type="password"
                      ref={register}
                      placeholder="Enter your current password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <p className="text-red-500">
                    {errors.currentpassword?.message}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="newpassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="newpassword"
                      name="newpassword"
                      type="password"
                      ref={register}
                      placeholder="Enter your new password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <p className="text-red-500">{errors.newpassword?.message}</p>
                </div>

                <div>
                  <label
                    htmlFor="confirmpassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmpassword"
                      name="confirmpassword"
                      type="password"
                      ref={register}
                      placeholder="Enter your confirm password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <p className="text-red-500">
                    {errors.confirmpassword?.message}
                  </p>
                </div>
                <div>
                  <span className="inline-flex rounded-md shadow-sm justify-between">
                    <button
                      disabled={!formState.isValid}
                      type="submit"
                      className={classnames(
                        " inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md  bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out",
                        {
                          "opacity-25 text-gray-300": !formState.isValid,
                        },
                        {
                          "opacity-100 text-white": formState.isValid,
                        },
                      )}
                    >
                      Save
                    </button>
                    <button
                      className=" inline-flex justify-center py-2 px-4 mx-2 border border-transparent text-sm opacity-100 text-white leading-5 font-medium rounded-md  bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700 transition duration-150 ease-in-out"
                      type="button"
                      onClick={() => reset()}
                    >
                      Clear
                    </button>
                  </span>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
      <div className="p-4  border-t border-gray-200 bg-gray-700">
        <div className="flex justify-start">
          <Link href="/changepassword">
            <a className=" inline-flex items-center cursor-pointer text-gray-500 hover:text-white">
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="inline-block px-1">Suggestions</span>
            </a>
          </Link>
          <Link href="/changepassword">
            <a className="sm:hidden inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg
                className="-ml-0.5 mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Suggestions
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

ChangePasswordPage.getLayout = getLayout;

export const getServerSideProps = withSession;

export default ChangePasswordPage;
