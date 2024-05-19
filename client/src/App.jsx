import { useSelector } from "react-redux";
import Header from "./components/Header";
import { getTheme } from "./redux/theme";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";

function App() {
  const theme = useSelector(getTheme);
  return (
    <main
      className={`${theme} w-screen h-screen text-foreground bg-background py-1 px-1`}
    >
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          maxWidth: "1600px",
          overflowY: "auto",
          flexWrap: "wrap",
          justifyContent: "space-around",
          maxHeight: "98dvh",
          paddingBottom: "40px",
        }}
      >
        <SideBar />
        <Outlet />
      </div>
    </main>
  );
}

export default App;
