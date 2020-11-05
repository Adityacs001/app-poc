import * as React from "react";
const DefaultLayout = ({ children }) => {
  return <> {children}</>;
};

export const getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default DefaultLayout;
