import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useCategories } from "../context/CategoryContext";

export default function CategoryTable() {
  const navigate = useNavigate();

  const {
    categories,
    loading,
    deleteCategory,
  } = useCategories();

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(deleteId); // 🔥 CONTEXT
      setShowDelete(false);
      setDeleteId(null);
    } catch {
      alert("Failed to delete category");
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 text-center">
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="bg-white p-6 text-center text-gray-500">
        No categories found
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded overflow-hidden">
        {/* HEADER */}
        <div className="grid grid-cols-5 bg-[#FFF8B7] px-4 py-3 text-sm font-medium mb-3">
          <div>Id</div>
          <div>Category name</div>
          <div>Image</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* ROWS */}
        {categories.map((cat) => (
          <TableRow
            key={cat._id}
            id={cat.categoryId}
            name={cat.name}
            imageUrl={cat.image?.url}
            status={cat.status}
            statusColor={
              cat.status === "Active"
                ? "text-green-600"
                : "text-red-500"
            }
            onEdit={() =>
              navigate(`/dashboard/category/edit/${cat._id}`)
            }
            onDelete={() => openDeleteModal(cat._id)}
          />
        ))}
      </div>

      {showDelete && (
        <DeleteModal
          onClose={() => setShowDelete(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}

function TableRow({
  id,
  name,
  imageUrl,
  status,
  statusColor,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-5 items-center px-4 py-3 text-sm mb-2 bg-[#F2F2F2]">
      <div>{id}</div>

      <div className="font-medium">{name}</div>

      <div>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-[40px] h-[40px] object-cover rounded"
          />
        ) : (
          <span className="text-gray-400 text-xs">No image</span>
        )}
      </div>

      <div className={statusColor}>{status}</div>

      <div className="flex gap-4">
        <Pencil
          size={16}
          className="cursor-pointer text-gray-600 hover:text-black"
          onClick={onEdit}
        />
        <Trash
          size={16}
          className="cursor-pointer text-gray-600 hover:text-red-600"
          onClick={onDelete}
        />
      </div>
    </div>
  );
}
