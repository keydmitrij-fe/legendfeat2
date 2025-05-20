import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import TodoListPage from "./pages/TodoList/TodoListPage.tsx";
import ProfilePage from "./pages/Profile/ProfilePage.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import Authorization from "./pages/Authorization/Authorization.tsx";
import Registration from "./pages/Registration/Registration.tsx";
import AuthLayout from "./layouts/AuthLayout/AuthLayout.tsx";
import { refreshAccessToken } from "./util/auth.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: refreshAccessToken,
    id: "root",
    children: [
      { index: true, element: <TodoListPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Authorization /> },
      { path: "registration", element: <Registration /> },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
