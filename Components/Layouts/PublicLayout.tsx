const PublicLayout = ({ children }) => <div>{children}</div>;

export const getLayout = (page) => <PublicLayout>{page}</PublicLayout>;

export default PublicLayout;
