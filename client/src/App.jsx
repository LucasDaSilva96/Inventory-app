import { useSelector } from "react-redux";
import Header from "./components/Header";
import { getTheme } from "./redux/theme";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";

function App() {
  const theme = useSelector(getTheme);
  return (
    <main
      className={`${theme} relative w-screen h-screen text-foreground bg-background py-1 px-1`}
    >
      <Header />
      <div className="flex w-full h-full">
        <SideBar />
        <Outlet />
      </div>
    </main>
  );
}

export default App;
