import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./Pages/HomeLayout.js";
import Landing from "./Pages/Landing.js";
import Create from "./Pages/Create.js";
import Recipe from "./Pages/Recipe.js";

import { loader } from "./Pages/Recipe.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "recipes/:id",
        element: <Recipe />,
        loader: loader,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
