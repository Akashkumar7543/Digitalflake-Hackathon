import { useEffect, useState } from "react";
import { ArrowLeft, Image as ImageIcon, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCategoriesApi } from "../../api/categoryApi";
import { useSubCategories } from "../../context/SubCategoryContext";
import toast from "react-hot-toast";

export default function AddSubCategory() {
  const navigate = useNavigate();
  const { addSubCategory } = useSubCategories();

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [showCategory, setShowCategory] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setName("");
    setCategoryId("");
    setShowCategory(false);
    setImage(null);
    setPreview(null);
    setError("");
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        setCategories(res.data.categories || []);
      } catch {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }

    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };


  const handleSave = async () => {
    setError("");

    if (!name.trim()) return  toast.error("Sub Category name required");
    if (!categoryId) return  toast.error("Please select category");
    if (!image) return  toast.error("Image required");
    const toastId = toast.loading("Adding sub category...");
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", categoryId);
      formData.append("status", "Active");
      formData.append("image", image);

      await addSubCategory(formData);
      toast.success("Sub category added successfully", {
        id: toastId,
      });

      setName("");
      setCategoryId("");
      setShowCategory(false);
      setImage(null);
      setPreview(null);
      setError("");

      navigate("/dashboard/subcategory");
      window.location.href = "/dashboard/subcategory";
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add sub category",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg p-6 min-h-[700px] flex flex-col justify-between">

   
        <div>
          <div className="flex items-center gap-3 mb-6">
            <ArrowLeft
              size={20}
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h2 className="text-[20px] font-semibold">Add Sub Category</h2>
          </div>

      
          <div className="flex gap-10 flex-wrap">
            <div className="w-[280px]">
              <label className="block text-sm mb-2">Sub Category</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[40px] border rounded-md px-3 text-sm"
                placeholder="Enter sub category"
              />
            </div>


            <div className="relative w-[260px]">
              <label className="block text-sm mb-2">Category</label>
              <button
                type="button"
                onClick={() => setShowCategory(!showCategory)}
                className="w-full h-[40px] border rounded-md px-3 text-sm
                  flex items-center justify-between bg-white"
              >
                {categoryId
                  ? categories.find((c) => c._id === categoryId)?.name
                  : "Select Category"}
                <ChevronDown size={18} />
              </button>

              {showCategory && (
                <div className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow">
                  {categories.map((cat) => (
                    <div
                      key={cat._id}
                      onClick={() => {
                        setCategoryId(cat._id);
                        setShowCategory(false);
                      }}
                      className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-100
                        ${categoryId === cat._id ? "bg-gray-100 font-medium" : ""}`}
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>


            <div>
              <label className="block text-sm mb-2">Upload Image</label>
              <div className="w-[120px] h-[120px] border rounded-md flex items-center justify-center bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">No image</span>
                )}
              </div>
            </div>


            <div className="flex items-end">
              <label className="w-[140px] h-[120px] border-2 border-dashed rounded-md
                flex flex-col items-center justify-center text-xs cursor-pointer text-gray-500">
                <ImageIcon size={26} className="mb-2" />
                Upload
                <p>Max size 10MB</p>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>


        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-2 border rounded-full text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-8 py-2 bg-[#662671] text-white rounded-full
              hover:bg-[#541f5a] disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
