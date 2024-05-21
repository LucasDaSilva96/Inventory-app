import DarkModeToggle from "./DarkModeToggle";
// import { Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

const navigationArray = [
  {
    to: "/",
    label: "items",
  },
  {
    to: "/inventory",
    label: "categories",
  },
  {
    to: "/chart",
    label: "stats",
  },
];

function Header() {
  return (
    <nav id="navigation__container" className=" drop-shadow-lg">
      <div className="flex items-center gap-4">
        {navigationArray.map((nav) => (
          <NavLink to={nav.to} key={nav.label} end>
            {nav.label.toUpperCase()}
          </NavLink>
        ))}
      </div>
      <DarkModeToggle />
    </nav>
  );
}

export default Header;
