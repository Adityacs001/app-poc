import classnames from "classnames";

const SubHeader = ({ title, subtitle, isbordered }) => (
  <>
    <div
      className={classnames("pb-3 ", {
        "border-b border-gray-200": isbordered,
      })}
    >
      <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
        <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
          {title}
        </h3>
        <p className="ml-2 mt-1 text-sm leading-5 text-gray-500 truncate">
          {subtitle}
        </p>
      </div>
    </div>
  </>
);

export default SubHeader;
