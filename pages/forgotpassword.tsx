import * as React from "react";
import { useRouter } from "next/router";
import { getLayout } from "@components/Layouts/BlankLayout";
import { Styled } from "theme-ui";
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
  emailaddress: yup.string().required("email is mandatory"),
});

type ForgotPasswordDTO = {
  emailaddress: string;
};
const ForgotPassword = () => {
  const router = useRouter();
  const { translations } = useLocales();
  const memoizedlocalestate = useStore(React.useCallback(languageSelector, []));

  const {
    register,
    handleSubmit,
    formState,
    errors,
  } = useForm<ForgotPasswordDTO>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ emailaddress }) => {
    const response = await fetch("/api/forgotpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({ emailaddress }),
    });

    if (response.ok) {
      cogoToast.error(
        <Message
          title={translations.t("passwordreset")}
          text={translations.t("passwordresetsuccess")}
          type="success"
        />,
        {
          position: "bottom-center",
        },
      );
      return router.push("/SignIn");
    } else {
      return cogoToast.error(
        <Message
          title={translations.t("passwordreset")}
          text={translations.t("passwordresetsuccess")}
          type="success"
        />,
        {
          position: "bottom-center",
        },
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <ul className="flex justify-end px-4 py-4">
        <li>
          <Link
            href={{
              pathname: router.pathname,
              query: { ...router.query },
            }}
            locale={memoizedlocalestate === "en" ? "ae" : "en"}
          >
            <a
              className={classnames(
                "uppercase  rounded-full font-semibold  text-white bg-indigo-600 hover:bg-indigo-500 mx-2",
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
      <div className="min-w-lg  max-h-sm mx-auto  flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full bg-white px-6 py-4">
          <div className=" ">
            <img className="h-auto w-auto" src="/logo.png" alt="Workflow" />
            <h2 className="mt-2 text-3xl leading-9 font-extrabold text-gray-900">
              {translations.t("forgotpassword")}
            </h2>
            <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
              <span className="px-1">
                {translations.t("forgotpasswordsub")}
              </span>
            </p>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="emailaddress"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  {translations.t("emailaddress")}
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="emailaddress"
                    type="text"
                    name="emailaddress"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    ref={register}
                  />
                </div>
                <p className="text-red-500">{errors.emailaddress?.message}</p>
              </div>

              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    disabled={!formState.isValid || formState.isSubmitting}
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    {translations.t("submit")}
                  </button>
                </span>
                <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
                  <span className="px-2"> {translations.t("or")} </span>
                  <Link href="/SignIn">
                    <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline hover:underline transition ease-in-out duration-150">
                      {translations.t("returntologin")}
                    </a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ForgotPassword.getLayout = getLayout;

export default ForgotPassword;
