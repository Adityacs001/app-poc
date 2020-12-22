import * as React from "react";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import MainHeader from "@components/MainHeader";
import { useRouter } from "next/router";
import PositionProfileForm from "@components/PositionProfileForm";
import NotificationNav from "@components/NotificationNav";
import withSession from "lib/session";
import PageTitle from "@components/PageTitle";

const PositionProfileedit = ({ user }) => {
  const router = useRouter();
  const { rid } = router.query;

  const onFormSubmit = React.useCallback(
    ({ issaved, message }: { issaved: boolean; message: string }) => {
      console.log("second call");
      console.log("i m getting logged", issaved, message);
      console.log("third call");
    },
    [],
  );

  return (
    <React.Fragment>
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader title="Create/Edit" subtitle="" isbordered={false} />
        </div>
        <div className="flex justify-between">
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <NotificationNav />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 flex justify-between items-center">
        <div className="px-6 py-3  sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
          <PageTitle
            title="Fill in all mandatory fileds"
            subtitle="10 matching candidates will be automatically added on creating or editing vacancy"
            isbordered={false}
          />
        </div>
        <div className="px-6">
          <span className="shadow-sm rounded-md">
            <button
              onClick={(e) =>
                router.push({
                  pathname: `/vacancies/${process.env.NEXT_PUBLIC_RID_NEW}`,
                })
              }
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Post Vacancy
            </button>
          </span>
        </div>
      </div>
      <PositionProfileForm onFormSubmit={onFormSubmit} rid={rid as string} />
    </React.Fragment>
  );
};

PositionProfileedit.getLayout = getLayout;

export const getServerSideProps = withSession;

export default PositionProfileedit;
