// src/components/Header.jsx
import { useState, useEffect } from "react";
import NotificationBell from "./NotificationBell.jsx";

export default function Header({ role: initialRole }) {
  const [role, setRole] = useState(
    !initialRole || initialRole === "any" ? "" : initialRole
  );
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!initialRole || initialRole === "any") {
      const storedRole = localStorage.getItem("role");
      if (storedRole) setRole(storedRole);
    }
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, [initialRole]);

  const logout = () => {
    localStorage.clear();
  };

  const links = [];
  if (role === "agricultor") {
    links.push({ text: "Dashboard",      href: "/agricultor" });
    links.push({ text: "Tienda",         href: "/agricultor/tienda" });
    links.push({ text: "Mis Pedidos",    href: "/agricultor/pedidos" });
    links.push({ text: "Monitoreo IoT",  href: "/agricultor/sensores" });
    links.push({ text: "Reportes IA",    href: "/agricultor/reportes" });
    links.push({ text: "Foro",           href: "/foro" });
    links.push({ text: "Asesoría Técnica", href: "/agricultor/asesoria" });
    links.push({ text: "Subsidios",      href: "/subsidios" });
  } else if (role === "proveedor") {
    links.push({ text: "Dashboard",   href: "/proveedor" });
    links.push({ text: "Pedidos",     href: "/proveedor/pedidos" });
    links.push({ text: "Inventario",  href: "/proveedor/inventario" });
    links.push({ text: "Foro",        href: "/foro" });
  } else if (role === "especialista") {
    links.push({ text: "Consultas Pendientes", href: "/especialista" });
    links.push({ text: "Foro",                  href: "/foro" });
  } else if (role === "administrador") {
    links.push({ text: "Dashboard", href: "/administrador" });
    links.push({ text: "Usuarios",   href: "/administrador/usuarios" });
    links.push({ text: "Auditoría",  href: "/administrador/auditoria" });
    links.push({ text: "Subsidios",  href: "/administrador/subsidios" });
  }

  return (
    <header>
      {/* Logo */}
      <h1>AgroPrecision</h1>

      {/* Enlaces de navegación centrados */}
      {role && (
        <nav>
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.text}
            </a>
          ))}
        </nav>
      )}

      {/* Acciones a la derecha */}
      {role && (
        <div className="header-actions">
          <NotificationBell />
          {userName && <span>Hola, {userName} –</span>}
          <a href="/login" onClick={logout} className="logout">
            Salir
          </a>
        </div>
      )}
    </header>
  );
}
