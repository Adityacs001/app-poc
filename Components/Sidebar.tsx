/** @jsx jsx */
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";
import tw from "@tailwindcssinjs/macro";
import styled from "@emotion/styled";

const NavAnchorBase = styled.a(
  tw`flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md 
  hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700  
`,
);
const NavAnchor = styled(NavAnchorBase)(tw`text-indigo-300 `);
const NavAnchorActive = styled(NavAnchorBase)(tw`text-white bg-indigo-900 `);

const NavIcon = styled.svg(tw`
mr-3 h-6 w-6 text-indigo-400 group-focus:text-indigo-300 transition ease-in-out duration-150
`);

const Sidebar = () => (
  <div css={tw`hidden md:flex md:flex-shrink-0`}>
    <div css={tw`flex flex-col w-64`}>
      <div
        css={tw`flex flex-col flex-grow bg-indigo-800 pt-5 pb-4 overflow-y-auto`}
      >
        <div css={tw`flex items-center flex-shrink-0 px-4`}>
          <img
            css={tw`h-8 w-auto`}
            src="https://tailwindui.com/img/logos/workflow-logo-on-brand.svg"
            alt="Workflow"
          />
        </div>
        <div css={tw`mt-5 flex-1 flex flex-col`}>
          <nav css={tw`flex-1 px-2 bg-indigo-800 space-y-1`}>
            <NavAnchorActive href="#name">
              <NavIcon fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </NavIcon>
              Dashboard
            </NavAnchorActive>

            <NavAnchor href="#name">
              <NavIcon fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </NavIcon>
              Users
            </NavAnchor>
          </nav>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;
