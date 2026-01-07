import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useSubCategories } from "../context/SubCategoryContext";

export default function SubCategoryTable() {
  const navigate = useNavigate();

  const {
    subCategories,
    loading,
    removeSubCategory,
    fetchSubCategories,
  } = useSubCategories();

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await removeSubCategory(deleteId);
      setShowDelete(false);
      setDeleteId(null);
      fetchSubCategories();
    } catch {
      alert("Failed to delete sub category");
    }
  };

  if (loading) {
    return <div className="bg-white p-6 text-center">Loading...</div>;
  }

  if (!subCategories || subCategories.length === 0) {
    return (
      <div className="bg-white p-6 text-center text-gray-500">
        No sub categories found
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-6 bg-[#FFF8B7] px-4 py-3 text-sm font-medium mb-3">
          <div>Id</div>
          <div>Sub Category name</div>
          <div>Category name</div>
          <div>Image</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* TABLE ROWS */}
        {subCategories.map((item) => (
          <TableRow
            key={item._id}
            id={item.subCategoryId}
            subName={item.name}
            categoryName={item.category?.name}
            imageUrl={item.image?.url}
            status={item.status}
            onEdit={() =>
              navigate(`/dashboard/subcategory/edit/${item._id}`)
            }
            onDelete={() => openDeleteModal(item._id)}
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

/* ================= ROW COMPONENT ================= */
function TableRow({
  id,
  subName,
  categoryName,
  imageUrl,
  status,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-6 items-center px-4 py-3 text-sm bg-[#F2F2F2] mb-2">

      <div>{id}</div>

      <div className="font-medium">{subName}</div>

      <div>{categoryName}</div>

      <div>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={subName}
            className="w-[40px] h-[40px] object-cover rounded"
          />
        ) : (
          <span className="text-gray-400 text-xs">No image</span>
        )}
      </div>

      <div
        className={
          status === "Active"
            ? "text-green-600"
            : "text-red-500"
        }
      >
        {status}
      </div>

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
