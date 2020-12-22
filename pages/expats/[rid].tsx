import * as React from "react";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import MainHeader from "@components/MainHeader";
import { useRouter } from "next/router";
import ExpatProfileForm from "@components/ExpatProfileForm";
import NotificationNav from "@components/NotificationNav";
import withSession from "lib/session";
import PageTitle from "@components/PageTitle";

const ExpatProfileedit = ({ user }) => {
  const router = useRouter();
  const { rid } = router.query;

  return (
    <React.Fragment>
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader
            title="Create/Edit Expat Details"
            subtitle=""
            isbordered={false}
          />
        </div>
        <div className="flex justify-between">
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <NotificationNav />
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="px-6 py-3  sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
          <PageTitle
            title="Fill in all mandatory fileds"
            subtitle="All expats need to follow recuritment workflow same as jobseeker, Vacancy report printing will be allowed for Hired candidates only"
            isbordered={false}
          />
        </div>
      </div>
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <ExpatProfileForm
            onFormSubmit={(result) => {}}
            rid={(rid || "") as string}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

ExpatProfileedit.getLayout = getLayout;

export const getServerSideProps = withSession;

export default ExpatProfileedit;
