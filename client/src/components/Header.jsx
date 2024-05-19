import DarkModeToggle from "./DarkModeToggle";
import { Image } from "@nextui-org/react";

function Header() {
  return (
    <nav className="w-screen flex items-center justify-between drop-shadow-lg py-1 px-2">
      {/* <Image width={50} height={50} alt="Fav icon" src="/img/favIcon.png" /> */}
      <DarkModeToggle />
    </nav>
  );
}

export default Header;
