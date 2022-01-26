import * as React from "react";
import HRALogo from "../public/images/logo.png";
import type { NextPage } from "next";
import Image from "next/image";
import { verifySchema } from "../schema/verifyschema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cogoToast from "cogo-toast";
import VerifyDTO from "../Model/verifyDTO";
import { useRouter } from "next/router";
import useLocales from "../hooks/useLocales";
import tw, { css } from "twin.macro";
import Link from "next/link";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import { fadeInUp, stagger, routeFade } from "../Animations/globalAnimations";

const Verify: NextPage = () => {
  const router = useRouter();
  const { translations } = useLocales();

  const { register, handleSubmit, formState } = useForm<VerifyDTO>({
    mode: "onChange",
    resolver: yupResolver(verifySchema),
  });
  const errors = formState.errors;

  const onSubmit = async ({ email, token }: VerifyDTO) => {
    const response = await fetch("/api/verifytoken", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({ email, token }),
    });
    if (response.ok) {
      return router.push("/student");
    } else {
      return cogoToast.error("Invalid credentials", {
        position: "top-center",
      });
    }
  };

  return (
    <React.Fragment>
      <motion.div
        variants={routeFade}
        initial="initial"
        animate="animate"
        className="flex flex-col min-h-screen bg-gray-100"
      >
        <Header />
        <main className="flex-1 px-4 mt-12 sm:px-6">
          <div className=" lg:grid lg:grid-cols-1 place-items-center">
            <div className="bg-white">
              <div className="w-auto px-6 py-4 mt-3 sm:w-96">
                <h1>
                  <span className="block mt-1 text-3xl font-semibold tracking-tight">
                    <span className="block text-gray-900">
                      {translations.t("verifyHeader")}
                    </span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  {translations.t("verifymessage")}
                </p>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-5 text-gray-700 ismandatory"
                    >
                      {translations.t("email")}
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        id="email"
                        type="email"
                        placeholder={translations.t("enteremail")}
                        className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                        {...register("email")}
                        autoComplete="off"
                      />
                    </div>
                    <p className="text-red-500">{errors.email?.message}</p>
                  </div>

                  <div>
                    <label
                      htmlFor="token"
                      className="block text-sm font-medium leading-5 text-gray-700 ismandatory"
                    >
                      {translations.t("token")}
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        id="token"
                        type="text"
                        placeholder={translations.t("entertoken")}
                        className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                        {...register("token")}
                      />
                    </div>
                    <p className="text-red-500">{errors.token?.message}</p>
                  </div>
                  <div>
                    <span className="block w-full">
                      <button
                        type="submit"
                        tw="w-full px-6 py-1 mt-3 text-base font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                      >
                        {translations.t("verify")}
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </motion.div>
    </React.Fragment>
  );
};

export default Verify;
