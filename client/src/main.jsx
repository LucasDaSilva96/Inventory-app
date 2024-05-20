import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InventoryPage from "./pages/Inventory.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "inventory",
        element: <InventoryPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#D4D4D8",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "#17c964",
                secondary: "inherit",
              },
            },

            error: {
              duration: 3000,
              theme: {
                primary: "#f31260",
                secondary: "inherit",
              },
            },
          }}
        />
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
