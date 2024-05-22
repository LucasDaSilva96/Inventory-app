import { useSelector } from "react-redux";
import Header from "./components/Header";
import { getTheme } from "./redux/theme";
import { Outlet } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import GlobalLoader from "./components/GlobalLoader";

function App() {
  const theme = useSelector(getTheme);
  const isFetching = useIsFetching() > 0;

  return (
    <main
      className={`${theme} relative w-screen h-screen text-foreground bg-background`}
    >
      {isFetching && <GlobalLoader />}
      <Header />
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "10px",
        }}
      >
        <Outlet />
      </div>
    </main>
  );
}

export default App;
