import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import LogoutModal from "../components/LogoutModal";
import { User } from "lucide-react";

export default function DashboardLayout() {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFFF]">

      <div className="h-[64px] bg-[#662671] flex items-center justify-between px-6">
        <div className="flex items-center gap-2 text-white text-lg font-semibold">
          <span className="border border-white rounded px-2">D</span>
          digitalflake
        </div>

        <button
          onClick={() => setShowLogout(true)}
          className="text-white hover:opacity-80"
        >
          <User size={30} />
        </button>
      </div>

  
      <div className="flex">
        <Sidebar />

   
        <div className="flex-1 p-6 bg-[#FFFFF]">
          <div className="bg-white rounded-lg shadow-xl min-h-[700px] p-6">
            <Outlet />
          </div>
        </div>
      </div>


      {showLogout && (
        <LogoutModal
          onClose={() => setShowLogout(false)}
          onConfirm={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        />
      )}
    </div>
  );
}
