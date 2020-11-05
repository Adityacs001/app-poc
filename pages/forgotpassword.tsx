import React, { useRef } from "react";
import { useRouter } from "next/router";
import { getLayout } from "@components/Layouts/BlankLayout";
import { Styled } from "theme-ui";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import Message from "@components/Message";

const schema = yup.object().shape({
  emailaddress: yup.string().required("email is mandatory"),
});

type ForgotPasswordDTO = {
  emailaddress: string;
};
const ForgotPassword = () => {
  const router = useRouter();

  const { register, handleSubmit, formState, errors } = useForm<
    ForgotPasswordDTO
  >({
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
      <div className="mx-auto bg-white flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div>
            <img className="h-auto w-auto" src="/logo.png" alt="Workflow" />
            <h2 className="mt-2 text-3xl leading-9 font-extrabold text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
              <span className="px-1">
                Provide your registered email for password reset help
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
                  Email Address
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
                    Submit
                  </button>
                </span>
                <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
                  <span className="px-2">Or </span>
                  <Link href="/SignIn">
                    <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline hover:underline transition ease-in-out duration-150">
                      Return to Login
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
