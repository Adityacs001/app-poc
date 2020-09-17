import Head from "next/head";
import { css } from "@emotion/css";
import tw from "@tailwindcssinjs/macro";
import ButtonStyled from "@/components/ButtonStyled";

export default function Home() {
  return (
    <div
      className={css(
        tw`font-sans grid justify-center items-center h-screen bg-gray-200`,
      )}
    >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={css(tw`bg-gray-50`)}>Check file sdsdsdsd</div>

      <ButtonStyled>@emotion/styled</ButtonStyled>
    </div>
  );
}
