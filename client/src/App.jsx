import { useSelector } from "react-redux";
import Header from "./components/Header";
import { getTheme } from "./redux/theme";

function App() {
  const theme = useSelector(getTheme);
  return (
    <main
      className={`${theme} w-screen h-screen text-foreground bg-background py-2 px-2`}
    >
      <Header />
      <h1>Hello</h1>
    </main>
  );
}

export default App;
