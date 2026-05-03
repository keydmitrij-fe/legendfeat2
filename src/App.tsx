import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import TodoListPage from "./pages/TodoList/TodoListPage.tsx";
import ProfilePage from "./pages/Profile/ProfilePage.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import Authorization from "./pages/Authorization/Authorization.tsx";
import Registration from "./pages/Registration/Registration.tsx";
import AuthLayout from "./layouts/AuthLayout/AuthLayout.tsx";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage.tsx";
import UsersPage from "./pages/Users/UsersPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardPage from "./pages/Dashboard/Dashboard.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    children: [
      { index: true, element: <TodoListPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "users", element: <UsersPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "users/:userId", element: <UserProfilePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, path: "login", element: <Authorization /> },
      { path: "registration", element: <Registration /> },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
