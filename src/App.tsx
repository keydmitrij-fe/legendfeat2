import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import TodoListPage from "./pages/TodoList/TodoListPage.tsx";
import ProfilePage from "./pages/Profile/ProfilePage.tsx";
import RootLayout from "./layouts/RootLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <TodoListPage /> },
      { path: "profile", element: <ProfilePage /> },
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
