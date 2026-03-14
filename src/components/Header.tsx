import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold text-blue-600">
          TaskFlow
        </NavLink>
        <nav className="flex gap-6">
          {[
            { to: "/", label: "Home" },
            { to: "/tasks", label: "Tasks" },
            { to: "/about", label: "About" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
