import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronDown, Box } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCategoriesApi } from "../../api/categoryApi";
import { getSubCategoriesApi } from "../../api/subCategory";
import { useProducts } from "../../context/ProductContext";

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const [showCategory, setShowCategory] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);

  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    return () => {
      setName("");
      setCategoryId("");
      setSubCategoryId("");
      setFilteredSubCategories([]);
    };
  }, []);
  

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          getCategoriesApi(),
          getSubCategoriesApi(),
        ]);

        setCategories(catRes.data.categories || []);
        setSubCategories(subRes.data.subCategories || []);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        alert("Failed to load data");
      }
    };

    fetchData();
  }, []);

  /* ================= FILTER SUBCATEGORY ================= */
  useEffect(() => {
    if (!categoryId) {
      setFilteredSubCategories([]);
      setSubCategoryId("");
      return;
    }

    const filtered = subCategories.filter(
      (s) => s.category?._id === categoryId
    );

    setFilteredSubCategories(filtered);
    setSubCategoryId("");
  }, [categoryId, subCategories]);


  const handleSave = async () => {
    if (!name.trim()) return alert("Product name required");
    if (!categoryId) return alert("Category required");
    if (!subCategoryId) return alert("Subcategory required");

    try {
      setLoading(true);

      await addProduct({
        name,
        category: categoryId,
        subCategory: subCategoryId,
        status: "Active",
      });

      navigate("/dashboard/products");
      window.location.href = "/dashboard/products";



    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg p-6 min-h-[700px] flex flex-col justify-between">

        {/* HEADER */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <ArrowLeft size={20} onClick={() => navigate(-1)} className="cursor-pointer" />
            <Box size={20} />
            <h2 className="text-[20px] font-semibold">Add Product</h2>
          </div>

          {/* FORM */}
          <div className="flex gap-8 flex-wrap" ref={dropdownRef}>

            {/* PRODUCT NAME */}
            <div className="w-[300px]">
              <label className="block text-sm mb-2">Product Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[40px] border rounded-md px-3"
                placeholder="Enter product name"
              />
            </div>

            {/* CATEGORY */}
            <div className="relative w-[260px]">
              <label className="block text-sm mb-2">Category</label>
              <button
                onClick={() => {
                  setShowCategory(!showCategory);
                  setShowSubCategory(false);
                }}
                className="w-full h-[40px] border rounded-md px-3 flex justify-between items-center"
              >
                {categoryId
                  ? categories.find((c) => c._id === categoryId)?.name
                  : "Select Category"}
                <ChevronDown size={18} />
              </button>

              {showCategory && (
                <div className="absolute w-full bg-white border mt-1 rounded shadow z-20">
                  {categories.map((cat) => (
                    <div
                      key={cat._id}
                      onClick={() => {
                        setCategoryId(cat._id);
                        setShowCategory(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SUBCATEGORY */}
            <div className="relative w-[260px]">
              <label className="block text-sm mb-2">Subcategory</label>
              <button
                disabled={!categoryId}
                onClick={() => setShowSubCategory(!showSubCategory)}
                className={`w-full h-[40px] border rounded-md px-3 flex justify-between items-center
                  ${!categoryId ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {subCategoryId
                  ? filteredSubCategories.find(
                      (s) => s._id === subCategoryId
                    )?.name
                  : "Select Subcategory"}
                <ChevronDown size={18} />
              </button>

              {showSubCategory && (
                <div className="absolute w-full bg-white border mt-1 rounded shadow z-20">
                  {filteredSubCategories.map((sub) => (
                    <div
                      key={sub._id}
                      onClick={() => {
                        setSubCategoryId(sub._id);
                        setShowSubCategory(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {sub.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-10 py-2 border rounded-full"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-10 py-2 bg-purple-700 text-white rounded-full"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
}
