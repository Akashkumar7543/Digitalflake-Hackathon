import { AlertTriangle } from "lucide-react";

export default function LogoutModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[360px] p-6 shadow-xl">
        
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="text-red-500 mb-3" size={28} />
          <h3 className="text-lg font-semibold mb-2">Log Out</h3>
          <p className="text-gray-500 text-sm mb-6">
            Are you sure you want to log out?
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded-full text-gray-500 hover:bg-gray-100"
          >
            Delete
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-[#662671] text-white rounded-full hover:bg-[#541f5a]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
