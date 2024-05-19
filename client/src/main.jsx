import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ItemsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
