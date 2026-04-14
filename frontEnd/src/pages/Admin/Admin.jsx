// frontEnd/src/pages/Admin/Admin.jsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Layout/Header";
import Sidebar from "./Layout/SideBar/Sidebar";
import "./Layout/Layout.css";
import { useUserStore } from "../../stores/userStore";

function Admin() {
  const cargarUsuarioAutenticado = useUserStore((state) => state.cargarUsuarioAutenticado);

  useEffect(() => {
    // 🚀 Al entrar al dashboard, refrescamos permisos reales del backend
    cargarUsuarioAutenticado();
  }, [cargarUsuarioAutenticado]);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admin;