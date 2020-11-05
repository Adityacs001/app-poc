/** @jsx jsx */
import { useCallback } from "react";
import { motion } from "framer-motion";
import { sx, jsx } from "theme-ui";
import useStore, { languageSelector } from "../store/index";

const NotificationNav = () => {
  const memoizedcounter = useStore(useCallback(languageSelector, []));

  return (
    <>
      <span className="inline-block relative order-1 ml-3 rounded-full sm:order-0 sm:ml-0 bg-gray-50">
        <motion.button
          whileHover={{
            scale: 1.4,
            transition: {
              yoyo: Infinity,
            },
          }}
          className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
          aria-label="Notifications"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </motion.button>
        <span
          className="absolute right-0 h-2 w-2  text-white "
          sx={{ top: "-10px", maxwidth: "0.5rem" }}
        >
          <span
            sx={{ padding: "2px" }}
            className="text-xs  bg-green-500 rounded-full truncate"
          >
            {memoizedcounter}
          </span>
        </span>
      </span>
    </>
  );
};

export default NotificationNav;
