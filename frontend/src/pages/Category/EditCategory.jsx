import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Image as ImageIcon, ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../../context/CategoryContext";

export default function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getCategoryById, updateCategory } = useCategories();

  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("Active");
  const [showStatus, setShowStatus] = useState(false);
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadCategory = async () => {
      try {
        const cat = await getCategoryById(id);
        setCategoryName(cat.name);
        setStatus(cat.status);
        setPreview(cat.image?.url);
      } catch {
        toast.error("Failed to load category");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [id, getCategoryById, navigate]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 10 * 1024 * 1024) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };


  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }
    
  const toastId = toast.loading("Updating category...");
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("status", status);
      if (image) formData.append("image", image);

      await updateCategory(id, formData);
      toast.success("Category updated successfully", {
        id: toastId,
      });
      navigate("/dashboard/category");
    } catch {
      toast.error("Failed to update category", {
        id: toastId,
      })} finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg p-6 min-h-[700px] flex flex-col justify-between">

        <div>
          <div className="flex items-center gap-3 mb-6">
            <ArrowLeft size={20} onClick={() => navigate(-1)} />
            <h2 className="text-[20px] font-semibold">Edit Category</h2>
          </div>

          <div className="flex gap-10 flex-wrap">
            <div className="w-[320px]">
              <label>Category Name</label>
              <input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full h-[42px] border rounded-md px-3"
              />
            </div>

            <div>
              <label>Image</label>
              <div className="w-[120px] h-[120px] border rounded-md">
                {preview && (
                  <img src={preview} className="w-full h-full object-contain" />
                )}
              </div>
            </div>

            <label className="w-[140px] h-[120px] border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer mt-5">
              <ImageIcon size={28} />
              Upload
              <input type="file" hidden onChange={handleImageChange} />
            </label>

            {/* STATUS */}
<div className="relative w-[260px] mt-2">
  <label className="block text-sm text-gray-700 mb-2 text-[20px]">
    Status
  </label>

  <button
    type="button"
    onClick={() => setShowStatus(!showStatus)}
    className="w-full h-[44px] border rounded-xl px-4 text-sm
      flex items-center justify-between bg-white"
  >
    <span className="text-gray-700">{status}</span>
    <ChevronDown size={18} className="text-gray-400" />
  </button>

  {showStatus && (
    <div
      className="absolute z-20 w-full mt-2 bg-white
        border rounded-xl shadow-lg overflow-hidden"
    >
      {["Active", "Inactive"].map((item) => (
        <div
          key={item}
          onClick={() => {
            setStatus(item);
            setShowStatus(false);
          }}
          className={`flex items-center justify-between
            px-4 py-3 text-sm cursor-pointer
            ${
              status === item
                ? "bg-gray-200 font-medium"
                : "hover:bg-gray-100"
            }`}
        >
          <span>{item}</span>

          {/* ✅ TICK SIGN */}
          {status === item && (
            <span className="text-black text-lg">✓</span>
          )}
        </div>
      ))}
    </div>
  )}
</div>

          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={() => navigate(-1)} className="px-10 py-2 border rounded-full">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-10 py-2 bg-[#662671] text-white rounded-full hover:bg-[#541f5a]">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
