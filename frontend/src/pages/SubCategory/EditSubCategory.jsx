import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Image as ImageIcon, ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoriesApi } from "../../api/categoryApi.js";
import { useSubCategories } from "../../context/SubCategoryContext";

export default function EditSubCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getSubCategoryById, updateSubCategory } = useSubCategories();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const [status, setStatus] = useState("Active");
  const [showStatus, setShowStatus] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sub, catRes] = await Promise.all([
          getSubCategoryById(id), // ✅ already subCategory object
          getCategoriesApi(),
        ]);

        setName(sub.name);
        setCategoryId(sub.category._id);
        setStatus(sub.status);
        setPreview(sub.image?.url || null);
        setCategories(catRes.data.categories || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load sub category");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate, getSubCategoryById]);

  /* ================= IMAGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 10 * 1024 * 1024) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!name.trim()) return toast.error("Sub category name required");

    const toastId = toast.loading("Updating sub category...");

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", categoryId);
      formData.append("status", status);
      if (image) formData.append("image", image);

      await updateSubCategory(id, formData);

      toast.success("Sub category updated successfully", { id: toastId });

      // 🔥 HARD REFRESH AFTER NAVIGATION (AS YOU REQUESTED EARLIER)
      window.location.href = "/dashboard/subcategory";
    } catch (err) {
      console.error(err);
      toast.error("Failed to update sub category", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg p-6 min-h-[680px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <ArrowLeft
              size={20}
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h2 className="text-[20px] font-semibold">Edit Sub category</h2>
          </div>

          {/* FORM */}
          <div className="flex flex-col gap-10">
            <div className="flex gap-10 items-start">

              <div className="w-[280px]">
                <label className="block text-sm mb-2">Sub category</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-[40px] border rounded-md px-3 text-sm"
                />
              </div>

              <div className="relative w-[260px]">
                <label className="block text-sm mb-2">Category</label>
                <button
                  type="button"
                  onClick={() => setShowCategory(!showCategory)}
                  className="w-full h-[40px] border rounded-md px-3 text-sm
                    flex justify-between items-center bg-white"
                >
                  {categories.find((c) => c._id === categoryId)?.name}
                  <ChevronDown size={18} />
                </button>

                {showCategory && (
                  <div className="absolute z-20 w-full bg-white border rounded-md shadow mt-1">
                    {categories.map((cat) => (
                      <div
                        key={cat._id}
                        onClick={() => {
                          setCategoryId(cat._id);
                          setShowCategory(false);
                        }}
                        className={`px-3 py-2 cursor-pointer text-sm
                          ${
                            categoryId === cat._id
                              ? "bg-gray-200 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                      >
                        {cat.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative w-[200px]">
                <label className="block text-sm mb-2">Status</label>
                <button
                  type="button"
                  onClick={() => setShowStatus(!showStatus)}
                  className="w-full h-[40px] border rounded-md px-3 text-sm
                    flex justify-between items-center bg-white"
                >
                  {status}
                  <ChevronDown size={18} />
                </button>

                {showStatus && (
                  <div className="absolute z-20 w-full bg-white border rounded-md shadow mt-1">
                    {["Active", "Inactive"].map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setStatus(item);
                          setShowStatus(false);
                        }}
                        className={`px-3 py-2 cursor-pointer flex justify-between
                          ${
                            status === item
                              ? "bg-gray-200 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                      >
                        {item}
                        {status === item && <span>✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="flex gap-10 items-end">
              <div>
                <label className="block text-sm mb-2">Upload Image</label>
                <div className="w-[120px] h-[120px] border rounded-md overflow-hidden
                  flex items-center justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </div>
              </div>

              <label className="w-[140px] h-[120px] border-2 border-dashed rounded-md
                flex flex-col items-center justify-center text-xs cursor-pointer">
                <ImageIcon size={26} />
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
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-2 border rounded-full"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-2 bg-[#662671] text-white rounded-full
              hover:bg-[#541f5a] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
