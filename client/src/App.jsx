import { useSelector } from "react-redux";
import Header from "./components/Header";
import { getTheme } from "./redux/theme";
import { Outlet } from "react-router-dom";

function App() {
  const theme = useSelector(getTheme);
  return (
    <main
      className={`${theme} relative w-screen h-screen text-foreground bg-background`}
    >
      <Header />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Outlet />
      </div>
    </main>
  );
}

export default App;
