import { useState } from "react";
import toast from "react-hot-toast";
import { Search, Plus } from "lucide-react";
import SubCategoryTable from "../../components/SubCategoryTable";
import DeleteModal from "../../components/DeleteModal";
import { useNavigate } from "react-router-dom";

export default function SubCategory() {
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full h-[680px] w-[700px]">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-2 gap-[6px]">
            <span className="w-[12px] h-[12px] border border-black rounded-[3px]"></span>
            <span className="w-[12px] h-[10px] border border-black rounded-sm"></span>
            <span className="w-[12px] h-[10px] border border-black rounded-sm"></span>

            <span className="w-[12px] h-[14px] border border-black rounded-[3px]"></span>
          </div>

          <h2 className="text-[24px] ml-2">Sub Category</h2>
          <div className="relative ml-5">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              className="h-[36px] w-[540px] pl-9 pr-3 border rounded-md text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate("/dashboard/subcategory/add")}
            className="flex items-center gap-2 bg-[#662671] text-white px-4 h-[36px]
             rounded-md text-sm cursor-pointer
             hover:bg-[#541f5a] transition"
          >
            <Plus size={16} />
            Add New
          </button>
        </div>
      </div>


      <SubCategoryTable onDelete={() => setShowDelete(true)} />

      {showDelete && (
        <DeleteModal
          onClose={() => setShowDelete(false)}
          onConfirm={() => {
            toast.success("Sub category deleted successfully");
            setShowDelete(false);
          }}
        />
      )}
    </div>
  );
}
