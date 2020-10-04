/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
const DefaultLayout = ({ children }) => {
  return <> {children}</>;
};

export const getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default DefaultLayout;
