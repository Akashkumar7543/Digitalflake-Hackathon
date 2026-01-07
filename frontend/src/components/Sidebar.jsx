import { NavLink } from "react-router-dom";
import { Home, Layers, List, Box, ChevronRight } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-[280px] bg-[#F4F4F4] min-h-[calc(100vh-64px)]">
      <nav className="p-4 space-y-2">
        <MenuItem to="/dashboard" icon={<Home size={27} />} label="Home" />
        <MenuItem to="/dashboard/category" icon={<Layers size={27} />} label="Category" />
        <MenuItem to="/dashboard/subcategory" icon={<List size={27} />} label="Subcategory" />
        <MenuItem to="/dashboard/products" icon={<Box size={27} />} label="Products" />
      </nav>
    </div>
  );
}

function MenuItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `relative flex items-center px-5 py-3 rounded-md cursor-pointer
        ${
          isActive
            ? "bg-[#FFF7CC] text-black"
            : "hover:bg-gray-200 text-gray-700"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-4">
            {icon}
            <span className="text-[16px] font-medium">{label}</span>
          </div>

          {isActive && (
            <ChevronRight
              size={22}
              className="absolute right-4 text-black"
            />
          )}
        </>
      )}
    </NavLink>
  );
}
