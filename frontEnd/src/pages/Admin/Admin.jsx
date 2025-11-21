import { Outlet } from 'react-router-dom';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import './Layout/Layout.css';

function Admin() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header />
        <main className="admin-main">
          <Outlet /> {/* Aquí se renderizan las rutas hijas */}
        </main>
      </div>
    </div>
  );
}

export default Admin;