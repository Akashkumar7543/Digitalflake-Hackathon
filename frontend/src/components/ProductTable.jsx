import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useProducts } from "../context/ProductContext"; // ✅ Import context

export default function ProductTable({ products, loading }) { // ✅ Receive props from parent
  const navigate = useNavigate();
  const { removeProduct } = useProducts(); // ✅ Use context

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  /* ================= DELETE ================= */
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await removeProduct(deleteId); // ✅ Use context method
      setShowDelete(false);
      setDeleteId(null);
    } catch {
      alert("Failed to delete product");
    }
  };

  /* ================= UI STATES ================= */
  if (loading) {
    return (
      <div className="bg-white p-6 text-center">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white p-6 text-center text-gray-500">
        No products found
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-7 bg-[#FFF8B7] px-4 py-3 text-sm font-medium mb-3">
          <div>Id</div>
          <div>Product name</div>
          <div>Image</div>
          <div>Sub Category</div>
          <div>Category</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* TABLE ROWS */}
        {products.map((item) => (
          <TableRow
            key={item._id}
            id={item.productId}
            name={item.name}
            imageUrl={item.image?.url}
            subCategory={item.subCategory?.name}
            category={item.category?.name}
            status={item.status}
            onEdit={() =>
              navigate(`/dashboard/products/edit/${item._id}`)
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

/* ================= TABLE ROW ================= */

function TableRow({
  id,
  name,
  imageUrl,
  subCategory,
  category,
  status,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-7 items-center px-4 py-3 text-sm bg-[#F2F2F2] mb-2">

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

      <div>{subCategory}</div>

      <div>{category}</div>

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