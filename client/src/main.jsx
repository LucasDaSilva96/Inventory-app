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
import Charts from "./pages/Charts.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getAllCategories, getAllItems, getStats } from "./utils/fetchData.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AddNewCategoryForm from "./components/AddNewCategoryForm.jsx";
import EditCategory from "./pages/EditCategory.jsx";
import DeleteCategory from "./pages/DeleteCategory.jsx";
import CreateItem from "./pages/CreateItem.jsx";
import DeleteItem from "./pages/DeleteItem.jsx";
import EditItem from "./pages/EditItem.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: async () => {
          await queryClient.prefetchQuery({
            queryKey: ["items"],
            queryFn: async () => await getAllItems(),
          });
          return null;
        },
      },
      {
        path: "inventory",
        element: <InventoryPage />,
        loader: async () => {
          await queryClient.prefetchQuery({
            queryKey: ["categories"],
            queryFn: async () => await getAllCategories(),
          });

          await queryClient.prefetchQuery({
            queryKey: ["items"],
            queryFn: async () => await getAllItems(),
          });
          return null;
        },
      },
      {
        path: "chart",
        element: <Charts />,
        loader: async () => {
          await queryClient.prefetchQuery({
            queryKey: ["stats"],
            queryFn: async () => await getStats(),
          });
          return null;
        },
      },
      {
        path: "addCategory",
        element: <AddNewCategoryForm />,
      },
      {
        path: "editCategory/:_id",
        element: <EditCategory />,
        loader: async () => {
          await queryClient.prefetchQuery({
            queryKey: ["categories"],
            queryFn: async () => await getAllCategories(),
          });
          return null;
        },
      },
      {
        path: "deleteCategory/:id",
        element: <DeleteCategory />,
        loader: async () => {
          await queryClient.prefetchQuery({
            queryKey: ["categories"],
            queryFn: async () => await getAllCategories(),
          });
          return null;
        },
      },
      {
        path: "createItem",
        element: <CreateItem />,
        loader: async () => {
          await queryClient.prefetchQuery({
            queryKey: ["categories"],
            queryFn: async () => await getAllCategories(),
          });
          return null;
        },
      },
      {
        path: "deleteItem/:id",
        element: <DeleteItem />,
        loader: async () => {
          await queryClient.prefetchQuery({
            queryKey: ["items"],
            queryFn: async () => await getAllItems(),
          });
          return null;
        },
      },
      {
        path: "editItem/:_id",
        element: <EditItem />,
        loader: async () => {
          await queryClient.prefetchQuery({
            queryKey: ["items"],
            queryFn: async () => await getAllItems(),
          });
          return null;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
