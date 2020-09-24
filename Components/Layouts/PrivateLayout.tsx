import { getLayout as getSiteLayout } from "./PublicLayout";

const PrivateLayout = ({ children }) => <div>{children}</div>;

export const getLayout = (page) =>
  getSiteLayout(<PrivateLayout>{page}</PrivateLayout>);

export default PrivateLayout;
