import DarkModeToggle from "./DarkModeToggle";
// import { Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav id="navigation__container" className=" drop-shadow-lg">
      <div className="flex items-center gap-4">
        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/inventory" end>
          Inventory
        </NavLink>
      </div>
      <DarkModeToggle />
    </nav>
  );
}

export default Header;
