const MainHeader = ({ title, subtitle }) => (
  <>
    <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
      {title}
    </h1>
    <h3 className="text-gray-400 text-sm leading-6  font-medium  tracking-wide ">
      {subtitle}
    </h3>
  </>
);

export default MainHeader;
