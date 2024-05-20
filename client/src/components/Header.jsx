import DarkModeToggle from "./DarkModeToggle";
// import { Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav
      id="navigation__container"
      className="w-screen flex items-center gap-4 drop-shadow-lg py-1 px-2"
    >
      <NavLink to="/" end>
        Dashboard
      </NavLink>

      <NavLink to="/inventory" end>
        Inventory
      </NavLink>
      <DarkModeToggle />
    </nav>
  );
}

export default Header;
