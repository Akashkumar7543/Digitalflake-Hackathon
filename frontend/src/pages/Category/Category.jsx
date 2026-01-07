import { useState } from "react";
import { Search, Plus } from "lucide-react";
import CategoryTable from "../../components/CategoryTable";
import DeleteModal from "../../components/DeleteModal";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../context/CategoryContext"; 
import toast from "react-hot-toast";

export default function Category() {
  const navigate = useNavigate();
  const { categories, loading, removeCategory } = useCategories(); 
  
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleDeleteClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategoryId) return;
  
    const toastId = toast.loading("Deleting category...");
  
    try {
      await removeCategory(selectedCategoryId);
  
      toast.success("Category deleted successfully", {
        id: toastId,
      });
  
      setShowDelete(false);
      setSelectedCategoryId(null);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to delete category", {
        id: toastId,
      });
    }
  };
  
  

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

          <h2 className="text-[24px] ml-2">Category</h2>
          
          <div className="relative ml-5">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="h-[36px] w-[540px] pl-9 pr-3 border rounded-md text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard/category/add")}
            className="flex items-center gap-2 bg-[#662671] text-white px-4 h-[36px]
             rounded-md text-sm cursor-pointer
             hover:bg-[#541f5a] transition"
          >
            <Plus size={16} />
            Add New
          </button>
        </div>
      </div>


      <CategoryTable 
        categories={filteredCategories}
        loading={loading}
        onDelete={handleDeleteClick}
      />

      {showDelete && (
        <DeleteModal
          onClose={() => {
            setShowDelete(false);
            setSelectedCategoryId(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}