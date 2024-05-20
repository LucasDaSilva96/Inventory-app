import { Switch } from "@nextui-org/react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getTheme, toggleTheme } from "../redux/theme";

function DarkModeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Switch
      isSelected={theme === "light"}
      style={{
        position: "absolute",
        right: "15px",
        top: "15px",
      }}
      size="lg"
      color="success"
      startContent={<MdOutlineWbSunny />}
      endContent={<BsFillMoonStarsFill />}
      onValueChange={handleTheme}
    />
  );
}

export default DarkModeToggle;
