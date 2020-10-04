import classnames from "classnames";

const MainHeader = ({ title, subtitle, isbordered }) => (
  <>
    <div
      className={classnames("pb-3 ", {
        "border-b border-gray-200": isbordered,
      })}
    >
      <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
        {title}
      </h1>
      <h3 className="text-gray-500 text-sm leading-5  font-medium  tracking-wide ">
        {subtitle}
      </h3>
    </div>
  </>
);

export default MainHeader;
