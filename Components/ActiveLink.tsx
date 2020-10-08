import Link from "next/link";
import { useRouter } from "next/router";

const ActiveLink = ({ children, href, className }) => {
  const router = useRouter();
  return (
    <Link href={href} scroll={true}>
      <a
        className={`${
          router.pathname === href
            ? "text-gray-900 bg-gray-200"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        } ${className} group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150`}
      >
        {children}
      </a>
    </Link>
  );
};

export default ActiveLink;
