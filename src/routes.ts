import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";

export const router = createBrowserRouter([
  {
    path: "*",
    Component: AppLayout,
  }
]);
