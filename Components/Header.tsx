import Link from "next/link";
import Image from "next/image";
import HRALogo from "../public/images/logo.png";

const Header = () => (
  <header className="text-center bg-white">
    <Link href="/" passHref>
      <div
        className="mx-auto text-center cursor-pointer "
        style={{ width: "12rem" }}
      >
        <Image className="w-full" src={HRALogo} alt="HRA Logo" />
      </div>
    </Link>
  </header>
);

export default Header;
