// proyecto/frontEnd/src/App.jsx
import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./routes/public";
import { adminRoutes } from "./routes/admin";
import Admin from "./pages/Admin/Admin";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  const routes = useRoutes([
    // rutas públicas
    ...publicRoutes,

    // grupo admin con hijos
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      ),
      children: adminRoutes,
    },

    // fallback
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
}

export default App;